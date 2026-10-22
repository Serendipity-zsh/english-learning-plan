(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StudyStore = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';

  const MAX_BYTES = 5 * 1024 * 1024;
  const SKILLS = ['listening', 'speaking', 'reading', 'writing', 'vocabulary', 'review', 'mock'];
  const OLD_KEYS = { leo: 'learning-workspace:leo-english-year-one:v1', nico: 'learning-workspace:nico-english-2026:v1' };
  const OLD_SKILLS = { 听力: 'listening', 口语: 'speaking', 阅读: 'reading', 写作: 'writing', 词汇: 'vocabulary', 语法: 'vocabulary', 语法词汇: 'vocabulary', 基础: 'vocabulary', 复习: 'review', 复盘: 'review', 模考复盘: 'review', 模考: 'mock', 考试: 'mock', 测试: 'mock' };
  const fail = message => { throw new Error(message); };
  const own = (object, name) => Object.prototype.hasOwnProperty.call(object, name);
  const object = (value, label) => {
    if (!value || typeof value !== 'object' || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) fail(`${label}必须是对象`);
    return value;
  };
  const string = (value, label, max = 2000, allowEmpty = true) => {
    if (typeof value !== 'string' || value.length > max || (!allowEmpty && !value.trim())) fail(`${label}格式不正确或长度超限`);
    return value;
  };
  const number = (value, label, min, max, integer = false) => {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) fail(`${label}必须是 ${min}–${max} 之间的${integer ? '整数' : '数字'}`);
    return value;
  };
  const boolean = (value, label) => typeof value === 'boolean' ? value : fail(`${label}必须为是或否`);
  const choice = (value, values, label) => values.includes(value) ? value : fail(`${label}不受支持`);
  const profileOf = profile => choice(profile, ['leo', 'nico'], '学习者');
  const id = (value, label) => {
    string(value, label, 160, false);
    if (!/^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/.test(value) || ['__proto__', 'prototype', 'constructor'].includes(value)) fail(`${label}包含不支持的字符`);
    return value;
  };
  const date = (value, label) => {
    string(value, label, 10, false);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(`${label}应使用 YYYY-MM-DD 格式`);
    const parsed = new Date(`${value}T00:00:00.000Z`);
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) fail(`${label}不是有效日期`);
    return value;
  };
  const iso = (value, label) => {
    string(value, label, 32, false);
    const parsed = new Date(value);
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString() !== value) fail(`${label}不是有效时间`);
    return value;
  };
  const url = value => {
    string(value, '材料链接', 2000, false);
    let parsed;
    try { parsed = new URL(value); } catch { fail('材料链接无效'); }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) fail('材料链接仅支持不含账号密码的 HTTP / HTTPS 地址');
    return parsed.href;
  };
  const list = (value, label, mapper, max = 20000) => {
    if (!Array.isArray(value) || value.length > max) fail(`${label}必须是数组，且不能超过 ${max} 条`);
    const result = value.map((entry, index) => mapper(entry, `${label}第 ${index + 1} 条`, index));
    const ids = result.filter(entry => entry && typeof entry === 'object' && own(entry, 'id')).map(entry => entry.id);
    if (new Set(ids).size !== ids.length) fail(`${label}包含重复编号`);
    return result;
  };
  const dictionary = (value, label, mapper, max = 5000) => {
    object(value, label);
    const entries = Object.entries(value);
    if (entries.length > max) fail(`${label}数量超限`);
    const result = {};
    for (const [name, entry] of entries) result[id(name, `${label}编号`)] = mapper(entry, `${label} ${name}`);
    return result;
  };
  const parse = raw => {
    if (typeof raw !== 'string') return object(raw, '备份');
    if (new TextEncoder().encode(raw).length > MAX_BYTES) fail('备份超过 5 MB，请分开保存记录');
    try { return object(JSON.parse(raw), '备份'); } catch (error) {
      if (error instanceof SyntaxError) fail('备份不是有效的 JSON 文件');
      throw error;
    }
  };
  const sizeCheck = state => {
    if (new TextEncoder().encode(JSON.stringify(state)).length > MAX_BYTES) fail('学习数据超过 5 MB，请先整理记录');
    return state;
  };
  const newId = prefix => `${prefix}-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`}`;
  const emptyLegacy = () => ({ logs: [], scores: [], completedTasks: {}, taskNotes: {}, passedWeeks: [] });

  function dateKey(value = new Date()) {
    if (!(value instanceof Date) || !Number.isFinite(value.getTime())) fail('日期无效');
    return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  }

  function dayOffset(start, value = new Date()) {
    const from = date(start instanceof Date ? dateKey(start) : start, '开始日期');
    const to = date(value instanceof Date ? dateKey(value) : value, '目标日期');
    return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
  }

  function key(profile) { return `english-studio:${profileOf(profile)}:v2`; }

  function create(profile) {
    return {
      version: 2, profile: profileOf(profile),
      settings: { startDate: dateKey(), entryWeek: 1, weeklyMinutes: 750, examType: 'undecided', onboarded: false, baseline: { listening: '', reading: '', writing: '', speaking: '' } },
      completed: {}, drafts: {}, logs: [], scores: [], reviews: [], materials: [], timer: null, legacy: emptyLegacy()
    };
  }

  function log(entry, label) {
    object(entry, label);
    return {
      id: id(entry.id, `${label}编号`), date: date(entry.date, `${label}日期`),
      lessonId: entry.lessonId === '' ? '' : id(entry.lessonId, `${label}课程编号`),
      week: number(entry.week, `${label}学习周`, 0, 52, true), skill: choice(entry.skill, SKILLS, `${label}技能`),
      minutes: number(entry.minutes, `${label}有效分钟`, 0.1, 720), activity: string(entry.activity, `${label}活动`, 240, false),
      evidence: string(entry.evidence, `${label}成果`, 12000), note: string(entry.note, `${label}笔记`, 12000)
    };
  }

  function score(entry, label) {
    object(entry, label);
    return { id: id(entry.id, `${label}编号`), date: date(entry.date, `${label}日期`), type: string(entry.type, `${label}类型`, 100, false),
      total: typeof entry.total === 'number' ? number(entry.total, `${label}成绩`, 0, 10000) : string(entry.total, `${label}成绩`, 100),
      detail: string(entry.detail, `${label}明细`, 4000), note: string(entry.note, `${label}笔记`, 12000), source: string(entry.source, `${label}来源`, 240) };
  }

  function archive(raw) {
    object(raw, '旧版档案');
    for (const name of ['logs', 'scores', 'passedWeeks']) if (own(raw, name) && !Array.isArray(raw[name])) fail(`旧版 ${name} 必须是数组`);
    for (const name of ['completedTasks', 'taskNotes']) if (own(raw, name)) object(raw[name], `旧版 ${name}`);
    const oldLog = (entry, label) => {
      object(entry, label);
      const minutes = typeof entry.minutes === 'string' && entry.minutes.trim() ? Number(entry.minutes) : entry.minutes;
      number(minutes, `${label}有效分钟`, 0.1, 720);
      return { date: date(entry.date, `${label}日期`), skill: string(entry.skill, `${label}技能`, 80), minutes: entry.minutes,
        activity: string(entry.activity ?? '', `${label}活动`, 240), evidence: string(entry.evidence ?? '', `${label}成果`, 12000),
        note: string(entry.note ?? '', `${label}笔记`, 12000), week: number(entry.week ?? 0, `${label}学习周`, 0, 52, true) };
    };
    return {
      logs: list(raw.logs ?? [], '旧版学习记录', oldLog),
      scores: list(raw.scores ?? [], '旧版成绩', (entry, label) => {
        object(entry, label);
        const validated = score({ id: 'archive', source: '', ...entry }, label);
        return { date: validated.date, type: validated.type, total: validated.total, detail: validated.detail, note: validated.note };
      }),
      completedTasks: dictionary(raw.completedTasks ?? {}, '旧版打卡', boolean),
      taskNotes: dictionary(raw.taskNotes ?? {}, '旧版任务笔记', (value, label) => string(value, label, 12000)),
      passedWeeks: list(raw.passedWeeks ?? [], '旧版验收', (value, label) => number(value, label, 1, 52, true), 52)
    };
  }

  function validate(raw, profile) {
    const data = parse(raw);
    if (data.version !== 2) fail('备份版本不受支持；旧版备份请使用旧版导入');
    const learner = profileOf(data.profile);
    if (profile !== undefined && learner !== profileOf(profile)) fail('备份属于另一位学习者，请切换人物后导入');
    object(data.settings, '学习设置');
    object(data.settings.baseline, '基线成绩');
    const state = {
      version: 2, profile: learner,
      settings: { startDate: date(data.settings.startDate, '开始日期'), entryWeek: own(data.settings, 'entryWeek') ? number(data.settings.entryWeek, '起始学习周', 1, 52, true) : 1,
        weeklyMinutes: number(data.settings.weeklyMinutes, '每周学习分钟', 300, 1500, true),
        examType: choice(data.settings.examType, ['undecided', 'academic', 'general'], '考试类型'), onboarded: boolean(data.settings.onboarded, '诊断状态'),
        baseline: Object.fromEntries(['listening', 'reading', 'writing', 'speaking'].map(skill => [skill, string(data.settings.baseline[skill], '基线成绩', 240)])) },
      completed: dictionary(data.completed, '课程成果', (entry, label) => {
        object(entry, label);
        return { at: iso(entry.at, `${label}时间`), minutes: number(entry.minutes, `${label}有效分钟`, 0, 720),
          score: entry.score === null ? null : number(entry.score, `${label}得分`, 0, 100), evidence: string(entry.evidence, `${label}成果`, 12000) };
      }),
      drafts: dictionary(data.drafts, '课程草稿', (entry, label) => {
        object(entry, label);
        return { text: string(entry.text, `${label}文本`, 20000), note: string(entry.note, `${label}笔记`, 12000),
          answers: dictionary(entry.answers, `${label}答案`, (value, name) => number(value, name, 0, 2, true), 100) };
      }),
      logs: list(data.logs, '学习记录', log), scores: list(data.scores, '测评成绩', score),
      reviews: list(data.reviews, '复习卡片', (entry, label) => {
        object(entry, label);
        return { id: id(entry.id, `${label}编号`), due: date(entry.due, `${label}复习日期`), phrase: string(entry.phrase, `${label}表达`, 1000, false),
          meaning: string(entry.meaning, `${label}释义`, 2000), lessonId: entry.lessonId === '' ? '' : id(entry.lessonId, `${label}课程编号`), done: boolean(entry.done, `${label}状态`) };
      }, 10000),
      materials: list(data.materials, '自定义材料', (entry, label) => {
        object(entry, label);
        return { id: id(entry.id, `${label}编号`), name: string(entry.name, `${label}名称`, 200, false), url: url(entry.url), category: string(entry.category, `${label}分类`, 80, false), note: string(entry.note, `${label}说明`, 4000) };
      }, 1000),
      timer: null, legacy: archive(data.legacy)
    };
    if (data.timer !== null) {
      object(data.timer, '专注计时');
      state.timer = { lessonId: id(data.timer.lessonId, '计时课程编号'), startedAt: data.timer.startedAt === null ? null : number(data.timer.startedAt, '计时开始时间', 0, 8640000000000000),
        elapsed: number(data.timer.elapsed, '计时秒数', 0, 43200), mode: choice(data.timer.mode, ['focus'], '计时方式') };
    }
    const lessonOf = (value, label) => {
      const match = value.match(/^(leo|nico)-w(\d{2})-d(\d{2})$/);
      if (!match || match[1] !== learner || Number(match[2]) < 1 || Number(match[2]) > 52 || Number(match[3]) < 1 || Number(match[3]) > 7) fail(`${label}不属于当前人物的有效课程`);
    };
    for (const lessonId of Object.keys(state.completed)) lessonOf(lessonId, '课程成果编号');
    for (const lessonId of Object.keys(state.drafts)) lessonOf(lessonId, '课程草稿编号');
    for (const entry of [...state.logs, ...state.reviews]) if (entry.lessonId) lessonOf(entry.lessonId, '学习记录课程编号');
    if (state.timer) lessonOf(state.timer.lessonId, '计时课程编号');
    return sizeCheck(state);
  }

  function storageOf(storage) {
    const resolved = storage === undefined ? (typeof localStorage === 'undefined' ? null : localStorage) : storage;
    if (!resolved || typeof resolved.getItem !== 'function' || typeof resolved.setItem !== 'function') fail('无法使用浏览器存储，请检查隐私设置');
    return resolved;
  }

  function load(profile, storage) {
    const raw = storageOf(storage).getItem(key(profile));
    if (raw === null) return create(profile);
    try { return validate(raw, profile); } catch (error) { fail(`本地数据无法读取，尚未覆盖原记录：${error.message}`); }
  }

  function save(state, storage) {
    const clean = validate(state);
    try { storageOf(storage).setItem(key(clean.profile), JSON.stringify(clean)); } catch (error) { fail(`保存失败，原记录未被替换：${error.message}`); }
    return clean;
  }

  function legacy(profile, storage) {
    const raw = storageOf(storage).getItem(OLD_KEYS[profileOf(profile)]);
    if (raw === null) return null;
    try { return parse(raw); } catch (error) { fail(`旧版数据无法读取，尚未覆盖原记录：${error.message}`); }
  }

  function importLegacy(raw, profile) {
    profileOf(profile);
    const data = parse(raw);
    if (data.version !== undefined && data.version !== 1) fail('这不是旧版备份，请使用新版备份导入');
    if (own(data, 'profile') && data.profile !== profile) fail('旧版备份的人物标识不匹配');
    if (own(data, 'planId') && data.planId !== OLD_KEYS[profile].slice('learning-workspace:'.length, -3)) fail('旧版备份的人物标识不匹配');
    if (!['logs', 'scores', 'completedTasks', 'taskNotes', 'passedWeeks', 'customMaterials'].some(name => own(data, name))) fail('未找到旧版学习数据');
    for (const name of ['logs', 'scores', 'passedWeeks', 'customMaterials']) if (own(data, name) && !Array.isArray(data[name])) fail(`旧版 ${name} 必须是数组`);
    for (const name of ['completedTasks', 'taskNotes']) if (own(data, name)) object(data[name], `旧版 ${name}`);
    const state = create(profile);
    state.legacy = archive(data);
    state.logs = state.legacy.logs.map((entry, index) => ({ ...entry, id: `legacy-log-${index + 1}`, lessonId: '', minutes: Number(entry.minutes),
      activity: entry.activity || '旧版学习记录', skill: SKILLS.includes(entry.skill) ? entry.skill : OLD_SKILLS[entry.skill] || 'review' }));
    state.scores = state.legacy.scores.map((entry, index) => ({ ...entry, id: `legacy-score-${index + 1}`, source: '旧版学习记录' }));
    state.materials = list(data.customMaterials ?? [], '旧版自定义材料', (entry, label, index) => {
      object(entry, label);
      if (own(entry, 'points') && !Array.isArray(entry.points)) fail(`${label}学习提示必须是数组`);
      const points = list(entry.points ?? [], `${label}学习提示`, (point, name) => string(point, name, 1000), 20);
      return { id: `legacy-material-${index + 1}`, name: string(entry.name, `${label}名称`, 200, false), url: url(entry.url), category: string(entry.category ?? '其他', `${label}分类`, 80, false),
        note: [string(entry.use ?? '', `${label}用途`, 1000), string(entry.phase ?? '', `${label}阶段`, 240), ...points].filter(Boolean).join('\n') };
    }, 1000);
    return validate(state, profile);
  }

  function migrate(profile, storage) {
    const resolved = storageOf(storage);
    if (resolved.getItem(key(profile)) !== null) return load(profile, resolved);
    const old = legacy(profile, resolved);
    if (old === null) return create(profile);
    return save(importLegacy(old, profile), resolved);
  }

  function record(state, entry) {
    const clean = validate(state);
    object(entry, '学习记录');
    const normalized = log({ id: newId('log'), date: dateKey(), lessonId: '', week: 0, evidence: '', note: '', ...entry }, '学习记录');
    return validate({ ...clean, logs: [...clean.logs, normalized] }, clean.profile);
  }

  return Object.freeze({ create, load, save, key, exportData: state => validate(state), importData: (raw, profile) => validate(raw, profileOf(profile)), legacy, migrate, importLegacy, record, dateKey, dayOffset, validate });
});
