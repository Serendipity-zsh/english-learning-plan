'use strict';
const assert = require('node:assert/strict');
const Engine = require('../engine.js');

const budgets = [300, 540, 750, 900, 1500];
for (const total of budgets) {
  for (const mock of [false, true]) {
    const days = Engine.budget(total, mock);
    assert.equal(days.length, 7);
    assert.equal(days.reduce((sum, value) => sum + value, 0), total, '每周分钟必须与预算一致');
    assert.ok(days.every(value => Number.isInteger(value) && value >= 0), '每日预算必须是非负整数');
    if (mock) assert.equal(days[5], 165, '完整模考日必须保留 165 分钟');
  }
  for (const profile of ['leo', 'nico']) {
    const course = { id: profile, weeks: Array.from({ length: 52 }, () => ({})) };
    let annual = 0;
    const ids = new Set();
    for (let week = 1; week <= 52; week++) {
      const lessons = Array.from({ length: 7 }, (_, day) => Engine.lesson(course, week, day, total));
      assert.equal(lessons.reduce((sum, item) => sum + item.minutes, 0), total, `${profile} 第 ${week} 周预算应闭合`);
      for (const item of lessons) {
        assert.ok(item.minutes >= 0 && Number.isInteger(item.minutes));
        ids.add(item.id);
        annual += item.minutes;
      }
      if (Engine.mockWeeks[profile].includes(week)) {
        assert.equal(lessons[5].minutes, 165);
        assert.equal(lessons[5].skill, 'mock');
        assert.equal(lessons[5].isMock, true);
      }
    }
    assert.equal(annual, total * 52, `${profile} 年度分钟必须与全年预算一致`);
    assert.equal(ids.size, 364, '每天课程编号必须唯一');
  }
}
for (const invalid of [299, 1501, 750.5, NaN, Infinity, '750']) assert.throws(() => Engine.budget(invalid), /300–1500/);

const week = { quiz: [{ id: 'zero', answer: 0 }, { id: 'one', answer: 1 }, { id: 'two', answer: 2 }] };
assert.equal(Engine.quizScore(week, {}, [0, 1, 2]), 0, '未答题不得自动记为第 0 项正确');
assert.equal(Engine.quizScore(week, { zero: '' }, [0]), 0);
assert.equal(Engine.quizScore(week, { zero: null }, [0]), 0);
assert.equal(Engine.quizScore(week, { zero: '0' }, [0]), 0, '字符串不得充当已答选择');
assert.equal(Engine.quizScore(week, { zero: 0 }, [0]), 100);
assert.equal(Engine.quizScore(week, { zero: 0, one: 1, two: 1 }, [0, 1, 2]), 67);
assert.equal(Engine.quizScore(week, {}, []), null, '无题目的练习不应制造成绩');
assert.equal(Engine.wordCount(''), 0);
assert.equal(Engine.wordCount('中文内容 123！'), 0);
assert.equal(Engine.wordCount('Hello, world!'), 2);
assert.equal(Engine.wordCount("I'm learning English. It’s a state-of-the-art tool."), 7);
assert.equal(Engine.wordCount('one\ntwo\tthree'), 3);
console.log('StudyEngine: all checks passed');
