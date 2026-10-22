'use strict';
const assert = require('node:assert/strict');
const Store = require('../store.js');

function memoryStorage() {
  const values = new Map();
  return { getItem: key => values.has(key) ? values.get(key) : null, setItem: (key, value) => values.set(key, String(value)) };
}
const storage = memoryStorage();
const leo = Store.create('leo');
leo.settings.baseline.listening = '5';
leo.logs.push({ id: 'one', date: '2026-10-22', lessonId: '', week: 0, skill: 'listening', minutes: 25, activity: '练习', evidence: '', note: '' });
assert.deepEqual(Store.create('leo').logs, [], '新状态不得复用数组');
assert.equal(Store.create('leo').settings.baseline.listening, '', '新状态不得复用设置');
assert.equal(Store.create('leo').settings.entryWeek, 1, '新学习空间从第1周开始');
const beforeEntryWeek = Store.exportData(leo);
delete beforeEntryWeek.settings.entryWeek;
assert.equal(Store.importData(beforeEntryWeek, 'leo').settings.entryWeek, 1, '旧版V2备份缺起始学习周时兼容为1');
for (const week of [0, 53, 1.5, null, undefined, '12', NaN, Infinity]) {
  assert.throws(() => Store.importData({ ...leo, settings: { ...leo.settings, entryWeek: week } }, 'leo'), /1–52/);
}
const laterEntry = Store.importData({ ...Store.create('leo'), settings: { ...leo.settings, entryWeek: 52 } }, 'leo');
assert.equal(laterEntry.settings.entryWeek, 52);
assert.deepEqual(laterEntry.completed, {}, '从后续周开始不得伪造先前课程已完成');
Store.save(leo, storage);
assert.equal(Store.load('nico', storage).logs.length, 0, '人物存储必须隔离');
assert.throws(() => Store.importData(Store.exportData(leo), 'nico'), /另一位/);
assert.throws(() => Store.importData({ ...leo, logs: null }, 'leo'), /数组/);
for (const minutes of [299, 1501, 750.5, Infinity]) {
  assert.throws(() => Store.importData({ ...leo, settings: { ...leo.settings, weeklyMinutes: minutes } }, 'leo'), /300–1500/);
}
assert.throws(() => Store.importData({ ...leo, legacy: { ...leo.legacy, logs: null } }, 'leo'), /数组/);
assert.throws(() => Store.record(leo, { skill: 'reading', minutes: Infinity, activity: '无效' }), /数字/);
assert.throws(() => Store.record(leo, { skill: 'reading', minutes: 721, activity: '过长' }), /720/);
assert.throws(() => Store.record(leo, { skill: 'reading', minutes: -1, activity: '负数' }), /数字/);
const next = Store.record(leo, { skill: 'reading', minutes: 20, activity: '短文练习' });
assert.equal(next.logs.length, 2);
assert.equal(leo.logs.length, 1, 'record 不得更改原始状态');
next.settings.baseline.listening = '9';
assert.equal(leo.settings.baseline.listening, '5');
assert.equal(Store.dayOffset('2026-03-07', '2026-03-10'), 3, '日历天差不能受夏令时影响');
assert.equal(Store.dayOffset('2026-10-22', '2026-10-21'), -1);
assert.equal(Store.dateKey(new Date(2026, 9, 22, 23, 59)), '2026-10-22', '必须使用本地日期');
assert.throws(() => Store.dayOffset('2026-02-30'), /有效日期/);
assert.throws(() => Store.importData({ ...leo, materials: [{ id: 'x', name: '恶意链接', url: 'javascript:alert(1)', category: '阅读', note: '' }] }, 'leo'), /HTTP/);
assert.throws(() => Store.importData({ ...leo, materials: [{ id: 'x', name: '含凭据', url: 'https://user:secret@example.com', category: '阅读', note: '' }] }, 'leo'), /账号密码/);
assert.throws(() => Store.importData(' '.repeat(5 * 1024 * 1024 + 1), 'leo'), /5 MB/);
assert.throws(() => Store.importData({ ...leo, logs: [leo.logs[0], leo.logs[0]] }, 'leo'), /重复编号/);
assert.throws(() => Store.importData({ ...leo, timer: { lessonId: 'bad', startedAt: null, elapsed: 0, mode: 'focus' } }, 'leo'), /有效课程/);
assert.throws(() => Store.importData({ ...leo, timer: { lessonId: 'nico-w01-d01', startedAt: null, elapsed: 0, mode: 'focus' } }, 'leo'), /当前人物/);
assert.throws(() => Store.record(leo, { skill: 'reading', minutes: 5, activity: '串人物', lessonId: 'nico-w01-d01' }), /当前人物/);
assert.doesNotThrow(() => Store.importData({ ...leo, timer: { lessonId: 'leo-w52-d07', startedAt: null, elapsed: 0, mode: 'focus' } }, 'leo'));
const old = { currentWeek: 12, selectedDay: 2, logs: [{ date: '2026-10-21', skill: '口语', minutes: 30, activity: '介绍项目', evidence: '录音', note: '重说', week: 12 }],
  scores: [{ date: '2026-10-21', type: 'IELTS 模考', total: '5.5', detail: 'L 5.5', note: '独立完成' }],
  completedTasks: { 'w12-d2-t0': true }, taskNotes: { 'w12-d2-t0': '完成 1 次录音' }, passedWeeks: [1, 2],
  customMaterials: [{ name: '材料', url: 'https://example.com/lesson', category: '听力', use: '精听', phase: '第一阶段', points: ['先听再读'] }] };
const oldStorage = memoryStorage();
const oldKey = 'learning-workspace:leo-english-year-one:v1';
oldStorage.setItem(oldKey, JSON.stringify(old));
const before = oldStorage.getItem(oldKey);
const migrated = Store.migrate('leo', oldStorage);
assert.equal(migrated.logs[0].skill, 'speaking');
assert.equal(migrated.settings.entryWeek, 1, '旧版迁移的起始学习周默认为1');
assert.equal(migrated.scores[0].total, '5.5');
assert.deepEqual(migrated.completed, {}, '旧打卡不能冒充新版课程完成');
assert.deepEqual(migrated.legacy.completedTasks, old.completedTasks);
assert.deepEqual(migrated.legacy.taskNotes, old.taskNotes);
assert.deepEqual(migrated.legacy.passedWeeks, old.passedWeeks);
assert.deepEqual(migrated.legacy.logs, old.logs);
assert.equal(oldStorage.getItem(oldKey), before, '迁移不能改写旧键');
assert.equal(Store.load('leo', oldStorage).logs.length, 1);
assert.equal(migrated.materials[0].note, '精听\n第一阶段\n先听再读');
const mappedSkills = Store.importLegacy({ ...old, logs: ['语法词汇', '模考复盘'].map(skill => ({ ...old.logs[0], skill })) }, 'leo');
assert.deepEqual(mappedSkills.logs.map(entry => entry.skill), ['vocabulary', 'review']);
assert.deepEqual(mappedSkills.legacy.logs.map(entry => entry.skill), ['语法词汇', '模考复盘'], '旧档案需保留原始技能名称');
assert.throws(() => Store.importLegacy({ ...old, profile: 'nico' }, 'leo'), /不匹配/);
assert.throws(() => Store.importLegacy({ ...old, logs: null }, 'leo'), /数组/);
assert.throws(() => Store.importLegacy({ ...old, taskNotes: null }, 'leo'), /对象/);
assert.throws(() => Store.importLegacy({ nonsense: [] }, 'leo'), /未找到/);
const damaged = memoryStorage();
damaged.setItem(Store.key('leo'), '{broken');
assert.throws(() => Store.load('leo', damaged), /尚未覆盖/);
assert.equal(damaged.getItem(Store.key('leo')), '{broken');
assert.throws(() => Store.save({ ...leo, logs: null }, storage), /数组/);
assert.equal(Store.load('leo', storage).logs.length, 1, '坏数据保存失败不能覆盖旧值');
const dangerous = JSON.parse(JSON.stringify(Store.create('leo')));
dangerous.drafts = JSON.parse('{"__proto__":{"text":"","note":"","answers":{}}}');
assert.throws(() => Store.importData(dangerous, 'leo'), /字符/);
assert.equal({}.text, undefined);
assert.deepEqual(Store.importData(JSON.stringify(Store.exportData(migrated)), 'leo'), migrated);
console.log('StudyStore: all checks passed');
