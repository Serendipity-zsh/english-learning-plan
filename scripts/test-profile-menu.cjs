'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Run the shipped menu handlers, preserving their save-before-switch ordering.
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const from = app.indexOf('  function loadProfile()');
const to = app.indexOf('  function titleBlock', from);
assert.ok(from >= 0 && to > from, 'Profile handlers must be present in app.js');
const handlers = app.slice(from, to);

function harness({ saveFails = false } = {}) {
  const calls = [], saved = {}, nodes = {};
  let focused = null;
  function node(id, data = {}) {
    return nodes[id] = {
      id, dataset: data, attrs: {}, hidden: false, textContent: '',
      setAttribute(key, value) { this.attrs[key] = value; },
      focus() { focused = this; },
      closest(selector) { return selector === '#profile-picker' ? nodes.picker : null; },
      classList: { toggle() {} }
    };
  }
  node('picker'); node('toggle'); node('menu'); node('name'); node('avatar');
  const options = [node('leo', { profile: 'leo' }), node('nico', { profile: 'nico' })];
  const document = {
    querySelector(selector) {
      if (selector === '#profile-menu [aria-checked="true"]') return options.find(el => el.attrs['aria-checked'] === 'true');
      return nodes[({ '#profile-toggle': 'toggle', '#profile-menu': 'menu', '#profile-name': 'name', '#avatar': 'avatar' })[selector]] || null;
    },
    querySelectorAll: selector => selector === '.profile-option' ? options : []
  };
  const box = {
    URL, document, $: document.querySelector,
    window: { COURSES: { leo: { learner: 'Leo' }, nico: { learner: 'Nico' } } },
    location: { href: 'https://example.test/?plan=leo#lesson/1/3' },
    history: { replaceState(_state, _title, url) { calls.push(`url:${url.searchParams.get('plan')}:${url.hash}`); } },
    clearTimeout: () => calls.push('clear-save'),
    S: { migrate(id) { calls.push(`load:${id}`); return saved[id] || { drafts: {}, timer: null }; } },
    toast: message => calls.push(`toast:${message}`),
    recordCall: value => calls.push(value),
    persist(id, state) { if (!saveFails) saved[id] = JSON.parse(JSON.stringify(state)); return !saveFails; }
  };
  vm.createContext(box);
  vm.runInContext(`
    let profile='leo', course=window.COURSES.leo, storageError='', selectedDay=3;
    let page='lesson', state={drafts:{'leo-w01-d03':{text:'Unsaved Leo draft'}},timer:{lessonId:'leo-w01-d03',startedAt:123,elapsed:5}};
    let ui={tab:'practice',graded:{old:true},checks:{old:true},filter:'我的材料',query:'old',historyPage:4,reveal:{old:true}}, saveTimeout=123;
    const recorder={state:'recording',stop(){recordCall('stop:'+profile);this.state='inactive';}};
    function pauseTimer(){recordCall('pause:'+profile);if(state.timer)state.timer.startedAt=null;}
    function commit(){recordCall('save:'+profile);return persist(profile,state);}
    function route(){recordCall('route:'+profile);page='today';}
    ${handlers}
    globalThis.profileTest={
      open:setProfileMenuOpen,switch:switchProfile,key:handleProfileMenuKey,load:loadProfile,
      snapshot:()=>JSON.stringify({profile,selectedDay,ui,page,state})
    };
  `, box, { filename: 'app.js:profile-handlers' });
  options[0].attrs['aria-checked'] = 'true';
  options[1].attrs['aria-checked'] = 'false';
  nodes.menu.hidden = true;
  return {
    ...box.profileTest, calls, nodes, options, saved,
    focused: () => focused,
    snapshot: () => JSON.parse(box.profileTest.snapshot()),
    key(key, target = focused || nodes.toggle) {
      const event = { key, target, prevented: false, preventDefault() { this.prevented = true; } };
      box.profileTest.key(event); return event;
    }
  };
}

{
  const h = harness(); h.open(true, true);
  assert.equal(h.nodes.menu.hidden, false);
  assert.equal(h.nodes.toggle.attrs['aria-expanded'], 'true');
  assert.equal(h.focused(), h.options[0], 'Opening with focus selects the current learner');
  h.switch('leo');
  assert.equal(h.nodes.menu.hidden, true);
  assert.equal(h.focused(), h.nodes.toggle);
  assert.equal(h.snapshot().page, 'lesson', 'Selecting the current learner must preserve the draft page');
  assert.equal(h.snapshot().ui.tab, 'practice');
  assert.equal(h.calls.length, 0, 'Same learner does not save, reload or reset the page');
  h.switch('other');
  assert.equal(h.snapshot().profile, 'leo');
  assert.equal(h.calls.length, 0, 'Unknown learner identifiers must not touch storage');
}
{
  const h = harness(); h.switch('nico');
  assert.deepEqual(h.calls.slice(0, 6), ['pause:leo', 'clear-save', 'save:leo', 'stop:leo', 'url:nico:#today', 'load:nico']);
  assert.ok(h.calls.includes('route:nico'));
  assert.equal(h.saved.leo.drafts['leo-w01-d03'].text, 'Unsaved Leo draft');
  assert.equal(h.saved.leo.timer.startedAt, null, 'The previous learner timer must be paused before saving');
  const next = h.snapshot();
  assert.equal(next.profile, 'nico'); assert.equal(next.selectedDay, null);
  assert.deepEqual(next.ui, { tab: 'learn', graded: {}, checks: {}, filter: '本周', query: '', historyPage: 1, reveal: {} });
  assert.deepEqual(next.state.drafts, {}, 'Leo draft must not become a Nico draft');
  assert.equal(h.nodes.name.textContent, 'Nico 的学习空间');
  assert.equal(h.nodes.avatar.textContent, 'N');
  assert.equal(h.nodes.toggle.attrs['aria-label'], '切换学习空间，当前 Nico');
  assert.deepEqual(h.options.map(el => el.attrs['aria-checked']), ['false', 'true']);
  h.open(true, true); assert.equal(h.focused(), h.options[1], 'Reopening focuses the new current learner');
}
{
  const h = harness({ saveFails: true }); h.open(true); h.switch('nico');
  assert.deepEqual(h.calls, ['pause:leo', 'clear-save', 'save:leo']);
  assert.equal(h.snapshot().profile, 'leo', 'A failed save must prevent switching learners');
  assert.equal(h.snapshot().state.drafts['leo-w01-d03'].text, 'Unsaved Leo draft');
  assert.equal(h.focused(), h.nodes.toggle);
}
{
  const h = harness();
  assert.equal(h.key('ArrowDown', h.nodes.toggle).prevented, true);
  assert.equal(h.focused(), h.options[0]);
  h.key('ArrowDown'); assert.equal(h.focused(), h.options[1]);
  h.key('ArrowDown'); assert.equal(h.focused(), h.options[0], 'ArrowDown wraps around');
  h.key('ArrowUp'); assert.equal(h.focused(), h.options[1], 'ArrowUp wraps around');
  h.key('Home'); assert.equal(h.focused(), h.options[0]);
  h.key('End'); assert.equal(h.focused(), h.options[1]);
  assert.equal(h.key('Escape').prevented, true);
  assert.equal(h.nodes.menu.hidden, true);
  assert.equal(h.nodes.toggle.attrs['aria-expanded'], 'false');
  assert.equal(h.focused(), h.nodes.toggle, 'Escape returns focus to the trigger');
  h.key('ArrowUp', h.nodes.toggle); assert.equal(h.focused(), h.options[1]);
  assert.equal(h.key('Tab').prevented, false, 'Tab should continue the browser focus order');
  assert.equal(h.nodes.menu.hidden, true);
  assert.equal(h.key('Home', h.nodes.toggle).prevented, false, 'A closed menu must not intercept page keys');
  h.open(true);
  assert.equal(h.key('ArrowDown', { closest: () => null }).prevented, false, 'Keys outside the picker are untouched');
}

console.log('Profile menu: save ordering, learner isolation, failed saves, ARIA, keyboard and focus passed');
