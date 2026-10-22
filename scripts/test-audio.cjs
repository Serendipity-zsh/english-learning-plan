'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the shipped handlers without loading the application or requesting a real microphone.
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const from = app.indexOf('  async function toggleRecording()');
const to = app.indexOf('  function downloadJSON', from);
assert.ok(from >= 0 && to > from, 'Audio handlers must be present in app.js');
const handlers = app.slice(from, to);

function harness(options = {}) {
  let resolvePermission, rejectPermission, requests = 0, starts = 0, renders = 0;
  const permission = new Promise((resolve, reject) => {
    resolvePermission = resolve; rejectPermission = reject;
  });
  const tracks = [0, 1].map(() => ({ stopped: false, stop() { this.stopped = true; } }));
  const stream = { getTracks: () => tracks };
  const saved = [], messages = [], modals = [], instances = [];
  const status = { textContent: '' }, button = { textContent: '' };
  class FakeRecorder {
    constructor(source) {
      if (options.constructFails) throw Error('Recorder construction failed');
      assert.equal(source, stream);
      this.state = 'inactive'; this.mimeType = 'audio/webm'; instances.push(this);
    }
    start() {
      if (options.startFails) throw Error('Recorder start failed');
      starts++; this.state = 'recording';
    }
    stop() {
      this.state = 'inactive';
      this.ondataavailable?.({ data: new Blob(['recorded speech'], { type: this.mimeType }) });
      return this.onstop?.();
    }
  }
  // Keep mock controls mounted so context guards, not incidental DOM absence, stop recording.
  const document = { hidden: false, querySelector: selector => {
    if (selector === '#rec-status') return options.noControl ? null : status;
    if (selector === '[data-action="record-audio"]') return button;
    return null;
  } };
  const box = {
    Blob, Date, MediaRecorder: FakeRecorder, window: { MediaRecorder: FakeRecorder }, document,
    navigator: { mediaDevices: { getUserMedia: () => { requests++; return permission; } } },
    $: document.querySelector, S: { dateKey: () => '2026-10-22' },
    audioItem: async (id, clip) => { saved.push({ id, clip }); },
    toast: message => messages.push(message), modal: (...args) => modals.push(args),
    render: () => { renders++; }, esc: String, URL: { createObjectURL: () => 'blob:test' }
  };
  vm.createContext(box);
  vm.runInContext(`
    let activeLesson = {id:'leo-w01-d03'}, profile = 'leo', page = 'lesson';
    let ui = {tab:'practice'}, recorder = null, recordingPending = false;
    ${handlers}
    globalThis.audioTest = {
      start:startRecording, toggle:toggleRecording,
      context(next) {
        if ('page' in next) page=next.page;
        if ('tab' in next) ui.tab=next.tab;
        if ('profile' in next) profile=next.profile;
        if ('lesson' in next) activeLesson=next.lesson;
      },
      snapshot:()=>({pending:recordingPending,state:recorder?.state})
    };
  `, box, { filename: 'app.js:audio-handlers' });
  return {
    ...box.audioTest, tracks, saved, messages, modals, instances, status, button, document,
    allow: () => resolvePermission(stream), deny: error => rejectPermission(error),
    counts: () => ({ requests, starts, renders })
  };
}

async function main() {
  const exits = [
    ['page navigation', { page: 'today' }],
    ['lesson tab change', { tab: 'reflect' }],
    ['learner change', { profile: 'nico' }],
    ['lesson change', { lesson: { id: 'leo-w02-d03' } }]
  ];
  for (const [label, next] of exits) {
    const h = harness(), pending = h.toggle();
    h.context(next); h.allow(); await pending;
    assert.ok(h.tracks.every(track => track.stopped), `${label}: stop every acquired track`);
    assert.equal(h.counts().starts, 0, `${label}: do not start a hidden recorder`);
    assert.equal(h.saved.length, 0, `${label}: do not save a phantom recording`);
    assert.equal(h.snapshot().pending, false, `${label}: release the permission-request guard`);
  }
  for (const label of ['hidden document', 'missing recording control']) {
    const h = harness({ noControl: label === 'missing recording control' }), pending = h.start();
    if (label === 'hidden document') h.document.hidden = true;
    h.allow(); await pending;
    assert.ok(h.tracks.every(track => track.stopped), `${label}: stop acquired tracks`);
    assert.equal(h.counts().starts, 0, `${label}: do not start`);
  }
  {
    const h = harness(), pending = h.toggle();
    const denied = Error('Permission denied'); denied.name = 'NotAllowedError';
    h.deny(denied); await pending;
    assert.equal(h.snapshot().pending, false, 'Permission rejection must unlock retry');
    assert.equal(h.counts().starts, 0);
    assert.equal(h.saved.length, 0);
    assert.ok(h.messages.some(message => message.includes('未获得麦克风权限')));
  }
  {
    const h = harness();
    const first = h.toggle(), second = h.toggle(), third = h.start();
    assert.equal(h.counts().requests, 1, 'Repeated clicks must not request concurrent streams');
    h.allow(); await Promise.all([first, second, third]);
    assert.equal(h.counts().starts, 1);
    assert.equal(h.instances.length, 1, 'Only one recorder may own the stream');
    assert.equal(h.snapshot().pending, false);
    await h.toggle();
    await new Promise(setImmediate);
    assert.ok(h.tracks.every(track => track.stopped), 'Normal stop must release every microphone track');
    assert.equal(h.snapshot().state, 'inactive');
    assert.equal(h.saved.length, 1, 'Normal stop must save exactly one clip');
    assert.equal(h.saved[0].id, 'leo-w01-d03', 'Save the recording under its original lesson');
    assert.ok(h.saved[0].clip.blob.size > 0);
    assert.equal(h.saved[0].clip.blob.type, 'audio/webm');
    assert.ok(h.saved[0].clip.seconds >= 0);
    assert.equal(h.counts().renders, 1);
  }
  for (const failure of ['constructFails', 'startFails']) {
    const h = harness({ [failure]: true }), pending = h.start();
    h.allow(); await pending;
    assert.ok(h.tracks.every(track => track.stopped), `${failure}: release the acquired stream`);
    assert.equal(h.snapshot().pending, false, `${failure}: allow another attempt`);
    assert.equal(h.saved.length, 0, `${failure}: do not save an empty failed clip`);
    assert.ok(h.messages.some(message => message.includes('无法开始录音')));
  }
  console.log('Audio lifecycle: navigation, permissions, concurrency, failures, and stop cleanup passed');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
