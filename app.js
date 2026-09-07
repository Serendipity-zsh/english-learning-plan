(() => {
  const { phases, weeks, materials } = window.LEARNING_PLAN;
  const storageKey = 'english-year-one-v1';
  const calendarDayIndex = (new Date().getDay() + 6) % 7;
  const defaultState = { currentWeek: 1, selectedDay: calendarDayIndex, completedTasks: {}, taskNotes: {}, passedWeeks: [], logs: [], scores: [] };
  let state = loadState();
  let activeFilter = 0;
  let timerSeconds = 25 * 60;
  let timerInitial = timerSeconds;
  let timerId = null;
  let expandedTaskKey = '';

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const today = new Date().toISOString().slice(0, 10);
  $('#today-date').textContent = new Intl.DateTimeFormat('zh-CN', { month:'long', day:'numeric', weekday:'long' }).format(new Date());
  $('#log-date').value = today;
  $('#score-date').value = today;

  function loadState() {
    try { return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || '{}') }; }
    catch { return { ...defaultState }; }
  }
  function saveState() { localStorage.setItem(storageKey, JSON.stringify(state)); renderDashboard(); renderRecords(); }
  function esc(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('is-visible'); clearTimeout(el._timer); el._timer=setTimeout(()=>el.classList.remove('is-visible'),2400); }

  function formatNumber(value) { return new Intl.NumberFormat('zh-CN').format(Number(value || 0)); }
  function formatSyncTime(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '同步时间未知' : `更新于 ${new Intl.DateTimeFormat('zh-CN', { month:'numeric', day:'numeric', hour:'2-digit', minute:'2-digit' }).format(date)}`;
  }
  async function loadDuolingoProfile() {
    const card = $('#duolingo-card');
    try {
      const response = await fetch(`duolingo-data.json?v=${Date.now()}`, { cache:'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const profile = await response.json();
      $('#duolingo-title').textContent = `@${profile.username}`;
      $('#duolingo-streak').textContent = formatNumber(profile.streak);
      $('#duolingo-english-xp').textContent = formatNumber(profile.englishXp);
      $('#duolingo-state').textContent = '已同步';
      $('#duolingo-sync-time').textContent = `${formatSyncTime(profile.syncedAt)} · 非官方公开资料同步 · Duolingo 分数仍需手动记录`;
      card.setAttribute('aria-busy', 'false');
    } catch {
      $('#duolingo-state').textContent = '暂不可用';
      $('#duolingo-state').classList.add('is-error');
      $('#duolingo-sync-time').textContent = '公开资料暂时无法读取；不会影响每日计划和本地打卡。';
      card.setAttribute('aria-busy', 'false');
    }
  }

  const resourceLinks = [
    { match:['Duolingo'], label:'打开 Duolingo', url:'https://www.duolingo.com/' },
    { match:['VOA'], label:'打开 VOA 课程', url:'https://learningenglish.voanews.com/p/5644.html' },
    { match:['BBC','6 Minute English','English for Work','Pronunciation'], label:'打开 BBC Learning English', url:'https://www.bbc.co.uk/learningenglish/' },
    { match:['IELTS 官方','IELTS 口语题','IELTS 样题'], label:'打开 IELTS 官方练习', url:'https://ielts.org/take-a-test/preparation-resources/sample-test-questions' },
    { match:['Cambridge IELTS'], label:'打开 Cambridge IELTS', url:'https://www.cambridge.org/elt/blog/category/exams/ielts/' },
    { match:['Grammar in Use','语法'], label:'打开 Grammar in Use', url:'https://www.cambridge.org/elt/grammarinuse' },
    { match:['Bookworms','分级读物'], label:'打开 Oxford Bookworms', url:'https://elt.oup.com/catalogue/items/global/graded_readers/oxford_bookworms_library/' },
    { match:['Modern Family','The Office','Silicon Valley','影视'], label:'查看影视资料', url:'https://www.imdb.com/' },
    { match:['TED'], label:'打开 TED Talks', url:'https://www.ted.com/talks' },
    { match:['技术文档','GitHub Issue'], label:'打开 GitHub Docs', url:'https://docs.github.com/en' },
    { match:['ChatGPT','写作','复述','录音','模拟','复盘'], label:'打开 ChatGPT 练习', url:'https://chatgpt.com/' },
  ];

  function resourceFor(text) {
    return resourceLinks.find(item => item.match.some(keyword => String(text).includes(keyword))) || resourceLinks.find(item => item.match.includes('ChatGPT'));
  }

  function dailySchedule(week) {
    const weekMaterials = week.materials.split('；');
    const mainMaterial = weekMaterials[0];
    const supportMaterial = weekMaterials[1] || mainMaterial;
    const scale = week.hours / 12.5;
    const minutes = value => Math.max(5, Math.round(value * scale / 5) * 5);
    const task = (title, material, value, steps, evidence, resourceText=material, prompt='') => ({
      title, material, minutes:minutes(value), steps, evidence, resource:resourceFor(resourceText), prompt,
    });
    const speakingPrompt = goal => `你是我的英语口语教练。我目前约为高 A1，正在进行第 ${week.week} 周“${week.title}”训练，重点是：${week.focus}。请围绕“${goal}”和我进行英文对话：一次只问一个问题；等我回答后再继续；不要立即打断纠错；对话结束后用中文列出 3 个最重要的错误、给出更自然的表达，并让我重新回答一次。`;
    return [
      { name:'周一', theme:'进入本周主题', tasks:[
        task('Duolingo 基础练习','Duolingo：完成当前路径课程',20,['完成 1 个新单元或 2 个短课','错题立即重做，不追求刷经验值','抄下 5 个能用于本周主题的句子'],'课程完成；错题已订正；保存 5 个句子'),
        task('主材料首次学习',mainMaterial,35,['先不查词听或读一遍，写下主题','第二遍对照英文文本，标记 5–8 个表达','完成页面自带练习或口头回答 5 个问题'],`写下首次理解率和 ${mainMaterial} 的课程/章节名`),
        task('关键句跟读',`${mainMaterial} 中的 5 个关键句`,15,['每句听 3 遍并标出重音','逐句跟读，再整段影子跟读','录制一次不看文本的复述'],'保存 1 段录音，并写下最难的 2 个发音',mainMaterial),
        task('语法与造句',week.focus,20,['在语法书中查找本周相关章节','完成至少 8 道对应练习','用自己的工作或生活场景造 8 句'],`练习正确率至少 75%；保存 3 个错句`,'Grammar in Use'),
      ] },
      { name:'周二', theme:'阅读和短写作', tasks:[
        task('Duolingo 复习','Duolingo：昨日错题和本周句型',20,['先做昨日错题复习','完成 1–2 个短课','大声读出所有完整句子'],'连续学习完成；记录今天最易错的 1 个句型'),
        task('辅助材料首次学习',supportMaterial,30,['先不查词听或读一遍','按段落写 3–5 个英文关键词','用关键词口头复述主要内容'],`记录具体课程/章节名；复述覆盖至少 70% 主要信息`,supportMaterial),
        task('主题阅读','分级读物或 BBC：选择与本周主题相关的短文',20,['限时阅读，不逐词翻译','写出一句主旨和 3 个细节','选出 5 个可复用表达'],'保存主旨、3 个细节和 5 个表达',week.phase < 3 ? 'Bookworms' : 'BBC'),
        task('短写作',`围绕“${week.title}”写一段英文`,20,['先独立完成 80–150 词初稿','检查时态、主谓一致和冠词','把 3 个本周新表达放入文章'],`保存初稿；达到 80–150 词`, 'ChatGPT'),
      ] },
      { name:'周三', theme:'听力和口语', tasks:[
        task('Duolingo 听说练习','Duolingo：优先完成听力和口语题',20,['完成 1–2 个短课','听力题错后不看答案重听一次','每个口语句子至少说两遍'],'记录听力或口语最常见的 1 个问题'),
        task('精听训练',`${mainMaterial}：选择 60–90 秒片段`,30,['盲听并写下能听到的词','逐句听写，再对照英文文本','遮住文本完整重听并口头总结'],'计算听写正确率；保存 5 个没听出的表达',mainMaterial),
        task('ChatGPT 语音对话',`主题：${week.title}`,25,['复制下方提示词并打开 ChatGPT 语音','连续对话，中途不切换中文','结束后接受集中纠错并重新回答'],'完成至少 10 轮对话；保存反馈或会话文字','ChatGPT',speakingPrompt(week.title)),
        task('口语纠错重说','使用刚才对话中的反馈',15,['选出影响最大的 3 个错误','分别写出正确句子并朗读 3 遍','重新录制 1–2 分钟回答'],'保存纠错前后表达；3 个错误均已重说','ChatGPT'),
      ] },
      { name:'周四', theme:'准确度训练', tasks:[
        task('Duolingo 准确度练习','Duolingo：复习薄弱技能',20,['打开错题或薄弱技能','完成 2 个复习单元','遇到猜对的题也要解释原因'],'正确率达到 80% 或完成二次订正'),
        task('辅助材料第二轮',`${supportMaterial}：复述和测验`,30,['脱离文本完整复述','完成材料自带测验或自拟 8 个问题','只重学答错部分'],`测验至少 75%；保存复述录音`,supportMaterial),
        task('语法专项',week.focus,20,['复习周一的 3 个错句','再完成 10 道同类型题','把正确结构用于 5 个工作句子'],'10 道题正确率至少 80%；保存 5 个工作句','Grammar in Use'),
        task('修改写作','修改周二的英文短文',20,['先让 ChatGPT 只标问题、不代写','按反馈自行修改结构和语言','对照前后版本总结 3 类错误'],'保存初稿与终稿；列出 3 条修改说明','ChatGPT'),
      ] },
      { name:'周五', theme:'迁移到真实表达', tasks:[
        task('Duolingo 本周收尾','Duolingo：完成本周 App 目标',20,['完成剩余路径任务','重做本周标记过的错题','口头复述本周学过的 5 个句子'],'App 周目标完成；5 个句子能脱稿说出'),
        task('本周材料复习',week.materials,30,['快速回看本周所有笔记','从材料中筛选 10 个高价值表达','为每个表达写一个自己的例句'],'保存 10 个表达和 10 个个人例句',week.materials),
        task('主题口语录音',`围绕“${week.title}”脱稿表达`,25,['列 5 个关键词，不写完整稿','录制 2–5 分钟完整表达','回听并标记停顿、语法和发音问题'],'保存录音；长停顿不超过 3 次','ChatGPT',speakingPrompt(`用 2–5 分钟介绍${week.title}，然后回答追问`)),
        task('主动词汇复习','本周 10 个核心表达',15,['遮住释义进行回忆','口头说出 10 个个人例句','把不会的表达加入下周复习清单'],'至少 8/10 能在新句子中正确使用','ChatGPT'),
      ] },
      { name:'周六', theme:'长任务和作品', tasks:[
        task('影视或长材料精听','本周指定影视、BBC 或长材料',45,['选择 5–10 分钟片段，只开英文字幕','分段精听并标出连读、弱读和语块','关闭字幕重看并复述情节或观点'],'首次/复听理解率各记录一次；保存片段名称',week.materials),
        task('跟读与表达库','从长材料提取 10 个自然表达',25,['跟读每个表达所在完整句','写清语境和可替换部分','用自己的工作场景改写 10 句'],'保存 10 个表达；至少 5 个能脱稿说出',week.materials),
        task('本周核心作品',week.output,45,['先按要求独立完成完整版本','用本周验收标准自查','获取反馈后只修改最重要的 3 个问题'],`完成并保存：${week.output}`,'ChatGPT'),
        task('脱稿复述与问答',`复述本周主题“${week.title}”`,35,['用 5 个关键词完成脱稿复述','让 ChatGPT 连续追问至少 5 次','整理不会表达的内容并重新回答'],'保存音频或会话文字；完成 5 个追问','ChatGPT',speakingPrompt(`复述本周学习成果，并接受至少 5 个追问`)),
      ] },
      { name:'周日', theme:'测试和周复盘', tasks:[
        task('本周验收测试',week.check,60,['严格计时并独立完成','对照答案或标准评分','把错误分为知识、听辨、表达和时间问题'],`记录验收结果：${week.check}`,week.materials),
        task('工作英语模拟','站会、会议、项目介绍或面试',30,['选择一种与当前阶段匹配的工作场景','连续完成模拟，中途不切换中文','让对方追问并在最后集中反馈'],'保存录音或文字；至少完成 5 个追问','ChatGPT',speakingPrompt('模拟真实海外公司工作场景')), 
        task('错题与错误复盘','本周笔记、录音和写作版本',30,['统计重复出现的错误','选出最高频的 3 类错误','每类写出原因、正确示例和下周动作'],'形成 3 条可执行的错误清单','ChatGPT'),
        task('记录成绩并安排下周','网站学习记录与第 52 周路线',30,['填写本周有效时长和测试成绩','确认七天任务与证据是否齐全','只选择 1–2 个问题带入下周'],`完成周记录；决定本周是否达到：${week.check}`,'ChatGPT'),
      ] },
    ];
  }

  function dayIsComplete(weekNumber, dayIndex, schedule) {
    return schedule[dayIndex].tasks.every((_, taskIndex) => state.completedTasks[`w${weekNumber}-d${dayIndex}-t${taskIndex}`]);
  }

  function skillForTask(title) {
    if (/听|影视/.test(title)) return '听力精听';
    if (/口语|跟读|复述|语音|录音|模拟/.test(title)) return '口语练习';
    if (/写作|修改/.test(title)) return '写作';
    if (/阅读|材料/.test(title)) return '阅读';
    if (/测试|验收|复盘|成绩/.test(title)) return '模考复盘';
    return '语法词汇';
  }

  function showView(name) {
    $$('.view').forEach(v => v.classList.toggle('is-active', v.id === `view-${name}`));
    $$('[data-view]').forEach(b => b.classList.toggle('is-active', b.dataset.view === name));
    history.replaceState(null, '', `#${name}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  $$('[data-view]').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
  $('[data-view-link]').addEventListener('click', e => { e.preventDefault(); showView('today'); });
  const hashView = location.hash.slice(1); if (['today','roadmap','materials','records'].includes(hashView)) showView(hashView);

  function renderDashboard() {
    const week = weeks[state.currentWeek - 1];
    const phase = phases.find(p => p.id === week.phase);
    const schedule = dailySchedule(week);
    const selectedDay = Math.min(6, Math.max(0, Number(state.selectedDay ?? calendarDayIndex)));
    const day = schedule[selectedDay];
    $('#header-week').textContent = `第 ${week.week} 周`;
    $('#today-title').textContent = selectedDay === calendarDayIndex
      ? `${day.name}，${day.theme}`
      : `${day.name}的${day.theme}`;
    $('#week-summary').textContent = `${phase.name}阶段。本周聚焦${week.focus}。${day.name}的重点是${day.theme}，计划约 ${day.tasks.reduce((sum, item) => sum + item.minutes, 0)} 分钟。`;
    $('#focus-title').textContent = week.title;
    $('#day-switcher').innerHTML = schedule.map((item, dayIndex) => {
      const done = dayIsComplete(week.week, dayIndex, schedule);
      return `<button class="day-button ${dayIndex===selectedDay?'is-active':''} ${done?'is-done':''}" data-day="${dayIndex}" aria-pressed="${dayIndex===selectedDay}"><span>${item.name}</span><small>${dayIndex===calendarDayIndex?'今天':done?'已完成':`${item.tasks.reduce((sum,t)=>sum+t.minutes,0)} 分`}</small></button>`;
    }).join('');
    $$('[data-day]').forEach(button => button.addEventListener('click', () => { state.selectedDay=Number(button.dataset.day); saveState(); }));
    const keyPrefix = `w${week.week}-d${selectedDay}-t`;
    const firstIncompleteIndex = day.tasks.findIndex((_, i) => !state.completedTasks[`${keyPrefix}${i}`]);
    if (!expandedTaskKey.startsWith(keyPrefix)) expandedTaskKey = `${keyPrefix}${firstIncompleteIndex < 0 ? 0 : firstIncompleteIndex}`;
    $('#today-tasks').innerHTML = day.tasks.map((task, i) => {
      const taskKey = `${keyPrefix}${i}`;
      const checked = Boolean(state.completedTasks[taskKey]);
      const note = state.taskNotes?.[taskKey] || '';
      const expanded = expandedTaskKey === taskKey;
      const next = i === firstIncompleteIndex;
      return `<article class="study-task ${checked?'is-done':''} ${expanded?'is-expanded':''} ${next?'is-next':''}" data-task-card="${taskKey}">
        <div class="study-task-head"><span class="task-index">${String(i+1).padStart(2,'0')}</span><div><strong>${esc(task.title)}</strong><small>${esc(task.material)} · ${task.minutes} 分钟${next?' · 下一项':''}</small></div><button class="task-expand" data-expand-task="${taskKey}" aria-expanded="${expanded}">${expanded?'收起':'查看步骤'}</button><label class="task-check"><input type="checkbox" data-task-key="${taskKey}" ${checked?'checked':''}><span>${checked?'已完成':'打卡'}</span></label></div>
        <div class="task-detail" ${expanded?'':'hidden'}>
          <div class="study-task-body"><div><p class="task-label">今天具体怎么学</p><ol>${task.steps.map(step=>`<li>${esc(step)}</li>`).join('')}</ol></div><div class="task-proof"><span>完成标准</span><p>${esc(task.evidence)}</p></div></div>
          ${task.prompt ? `<div class="practice-prompt"><div><span>可复制的口语陪练提示词</span><button data-copy-prompt="${i}">复制提示词</button></div><p>${esc(task.prompt)}</p></div>` : ''}
          <div class="study-task-actions"><a href="${esc(task.resource.url)}" target="_blank" rel="noopener noreferrer">${esc(task.resource.label)} ↗</a><button data-start-task="${i}">使用专注计时器</button></div>
          <label class="task-note"><span>成果或问题记录</span><input data-task-note="${taskKey}" value="${esc(note)}" placeholder="例如：VOA Lesson 3，测验 8/10，过去时仍易错"></label>
        </div>
      </article>`;
    }).join('');
    $$('[data-expand-task]').forEach(button => button.addEventListener('click', () => { expandedTaskKey = expandedTaskKey === button.dataset.expandTask ? '' : button.dataset.expandTask; renderDashboard(); }));
    $$('[data-task-key]').forEach(input => input.addEventListener('change', e => {
      const taskKey = e.target.dataset.taskKey;
      state.completedTasks[taskKey] = e.target.checked;
      if (e.target.checked) {
        const taskIndex = Number(taskKey.split('-t').pop());
        expandedTaskKey = taskIndex + 1 < day.tasks.length ? `${keyPrefix}${taskIndex + 1}` : taskKey;
      }
      saveState();
    }));
    $$('[data-task-note]').forEach(input => input.addEventListener('change', e => { state.taskNotes[e.target.dataset.taskNote]=e.target.value.trim(); localStorage.setItem(storageKey, JSON.stringify(state)); toast('任务成果已保存'); }));
    $$('[data-copy-prompt]').forEach(button => button.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(day.tasks[Number(button.dataset.copyPrompt)].prompt); toast('提示词已复制，可以打开 ChatGPT 语音'); }
      catch { toast('复制失败，请手动选择提示词'); }
    }));
    $$('[data-start-task]').forEach(button => button.addEventListener('click', () => {
      const task = day.tasks[Number(button.dataset.startTask)];
      $('#timer-activity').value = skillForTask(task.title);
      $('#timer-title').scrollIntoView({ behavior:'smooth', block:'center' });
      toast(`已准备：${task.title}`);
    }));
    const selectedCompleted = day.tasks.filter((_, taskIndex) => state.completedTasks[`${keyPrefix}${taskIndex}`]).length;
    const completedDays = schedule.filter((_, dayIndex) => dayIsComplete(week.week, dayIndex, schedule)).length;
    $('#selected-day-target').textContent = `${day.name} · ${day.theme}`;
    $('#selected-day-progress').textContent = `${selectedCompleted} / ${day.tasks.length} 项`;
    const continueButton = $('#continue-task');
    const continueTask = firstIncompleteIndex >= 0 ? day.tasks[firstIncompleteIndex] : null;
    $('#continue-task-title').textContent = continueTask ? continueTask.title : `${day.name}任务已完成`;
    $('#continue-task-meta').textContent = continueTask ? `${continueTask.material} · ${continueTask.minutes} 分钟` : '查看本周重点与验收标准';
    continueButton.dataset.targetTask = continueTask ? `${keyPrefix}${firstIncompleteIndex}` : '';
    $('#today-completed').textContent = `${selectedCompleted}/${day.tasks.length}`;
    $('#checked-days').textContent = `${completedDays}/7`;
    $('#week-detail').innerHTML = `<div class="focus-meta"><span class="tag">${esc(phase.range)}</span><span class="tag">目标 ${esc(phase.level)}</span><span class="tag">建议 ${week.hours} 小时</span></div><h3>${esc(week.focus)}</h3><p><strong>使用材料：</strong>${esc(week.materials)}</p><div class="focus-columns"><div><h4>本周产物</h4><ul><li>${esc(week.output)}</li><li>至少 2 次保留录音或文字证据</li></ul></div><div><h4>通过标准</h4><ul><li>${esc(week.check)}</li><li>完成学习记录和三类高频错误复盘</li></ul></div></div>`;
    const totalMinutes = state.logs.reduce((sum, l) => sum + Number(l.minutes || 0), 0);
    const totalHours = totalMinutes / 60;
    $('#hours-copy').textContent = `${totalHours.toFixed(1)} / 650 小时`;
    $('#hours-progress').style.width = `${Math.min(100, totalHours/650*100)}%`;
    $('#next-milestone').textContent = `下一里程碑 ${phase.level} · ${phase.milestone}`;
  }

  $('#continue-task').addEventListener('click', () => {
    const taskKey = $('#continue-task').dataset.targetTask;
    if (!taskKey) {
      $('#focus-title').scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }
    expandedTaskKey = taskKey;
    renderDashboard();
    document.querySelector(`[data-task-card="${taskKey}"]`)?.scrollIntoView({ behavior:'smooth', block:'center' });
  });

  function renderRoadmap() {
    $('#week-select').innerHTML = weeks.map(w => `<option value="${w.week}" ${w.week===state.currentWeek?'selected':''}>第 ${w.week} 周 · ${esc(w.title)}</option>`).join('');
    $('#phase-filters').innerHTML = [{id:0,name:'全部阶段'},...phases].map(p=>`<button class="filter-button ${p.id===activeFilter?'is-active':''}" data-phase="${p.id}">${esc(p.name)}</button>`).join('');
    $$('.filter-button').forEach(b=>b.addEventListener('click',()=>{ activeFilter=Number(b.dataset.phase); renderRoadmap(); }));
    const visible = activeFilter ? weeks.filter(w=>w.phase===activeFilter) : weeks;
    $('#roadmap-list').innerHTML = visible.map(w => `<article id="week-${w.week}" class="week-card ${state.passedWeeks.includes(w.week)?'is-passed':''}"><div class="week-number"><small>Week</small><strong>${String(w.week).padStart(2,'0')}</strong></div><div class="week-main"><h3>${esc(w.title)}</h3><p>${esc(w.focus)}</p></div><div class="week-goal"><strong>验收标准</strong><p>${esc(w.check)}</p></div><div class="week-hours"><strong>${w.hours}h</strong><small>建议时长</small><button class="week-pass" data-pass-week="${w.week}">${state.passedWeeks.includes(w.week)?'已通过':'标记通过'}</button></div></article>`).join('');
    $$('[data-pass-week]').forEach(b=>b.addEventListener('click',()=>{ const n=Number(b.dataset.passWeek); state.passedWeeks=state.passedWeeks.includes(n)?state.passedWeeks.filter(x=>x!==n):[...state.passedWeeks,n].sort((a,b)=>a-b); saveState(); renderRoadmap(); }));
  }
  $('#week-select').addEventListener('change', e => { state.currentWeek=Number(e.target.value); saveState(); renderRoadmap(); showView('today'); toast(`已切换到第 ${state.currentWeek} 周`); });

  function renderMaterials() {
    $('#materials-grid').innerHTML = materials.map((m,i)=>`<article class="material-card"><span class="material-index">${String(i+1).padStart(2,'0')}</span><h2>${esc(m.name)}</h2><p><strong>${esc(m.use)}</strong><br>${esc(m.phase)}</p><ul>${m.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">打开学习材料 ↗</a></article>`).join('');
  }

  function renderRecords() {
    const total = state.logs.reduce((sum,l)=>sum+Number(l.minutes||0),0);
    const speaking = state.logs.filter(l=>l.skill==='口语').reduce((sum,l)=>sum+Number(l.minutes||0),0);
    const latestIELTS = [...state.scores].reverse().find(s=>s.type==='IELTS 模考');
    const latestDuo = [...state.scores].reverse().find(s=>s.type==='Duolingo');
    $('#record-total-hours').textContent = (total/60).toFixed(1);
    $('#record-speaking-minutes').textContent = speaking;
    $('#record-ielts').textContent = latestIELTS?.total || '—';
    $('#record-duolingo').textContent = latestDuo?.total || '27';
    const history = [
      ...state.logs.map((x,i)=>({...x,kind:'学习',index:i})),
      ...state.scores.map((x,i)=>({...x,kind:'测评',index:i,activity:x.type,minutes:x.total,evidence:x.detail,note:x.note}))
    ].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,20);
    $('#history-list').innerHTML = history.length ? history.map(h=>`<article class="history-item"><small>${esc(h.date)}</small><small>${esc(h.kind)} · ${esc(h.skill||h.type||'')}</small><div><strong>${esc(h.activity)}</strong><small>${esc(h.evidence||'')}${h.note?` · ${esc(h.note)}`:''}</small></div><strong>${esc(h.minutes)}${h.kind==='学习'?' 分钟':''}</strong><button data-delete-kind="${h.kind}" data-delete-index="${h.index}" aria-label="删除记录">×</button></article>`).join('') : '<div class="empty-state">还没有记录。完成第一个 25 分钟学习块后，把材料、时间和结果记在这里。</div>';
    $$('[data-delete-kind]').forEach(b=>b.addEventListener('click',()=>{ const collection=b.dataset.deleteKind==='学习'?'logs':'scores'; state[collection].splice(Number(b.dataset.deleteIndex),1); saveState(); toast('记录已删除'); }));
  }

  $('#log-form').addEventListener('submit', e => { e.preventDefault(); state.logs.push({date:$('#log-date').value,skill:$('#log-skill').value,minutes:Number($('#log-minutes').value),activity:$('#log-activity').value.trim(),evidence:$('#log-evidence').value.trim(),note:$('#log-note').value.trim(),week:state.currentWeek}); saveState(); e.target.reset(); $('#log-date').value=today; $('#log-minutes').value=25; toast('学习记录已保存'); });
  $('#score-form').addEventListener('submit', e => { e.preventDefault(); state.scores.push({date:$('#score-date').value,type:$('#score-type').value,total:$('#score-total').value.trim(),detail:$('#score-detail').value.trim(),note:$('#score-note').value.trim()}); saveState(); e.target.reset(); $('#score-date').value=today; toast('测评成绩已保存'); });
  $('#export-button').addEventListener('click',()=>{ const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`english-learning-backup-${today}.json`;a.click();URL.revokeObjectURL(a.href);toast('备份已导出'); });
  $('#import-input').addEventListener('change',async e=>{ const file=e.target.files?.[0]; if(!file)return; try{ const parsed=JSON.parse(await file.text()); state={...defaultState,...parsed};saveState();renderRoadmap();toast('备份已恢复');}catch{toast('无法读取这个备份文件');} e.target.value=''; });
  $('#clear-data').addEventListener('click',()=>{ if(confirm('确定清空所有本地学习记录和勾选状态吗？请先导出备份。')){state={...defaultState};saveState();renderRoadmap();toast('本地数据已清空');} });
  $('#print-button').addEventListener('click',()=>window.print());

  function updateTimer(){ const m=Math.floor(timerSeconds/60);const s=timerSeconds%60;$('#timer-display').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
  $('#timer-toggle').addEventListener('click',()=>{ if(timerId){clearInterval(timerId);timerId=null;$('#timer-toggle').textContent='继续';return;} $('#timer-toggle').textContent='暂停';timerId=setInterval(()=>{timerSeconds=Math.max(0,timerSeconds-1);updateTimer();if(timerSeconds===0){clearInterval(timerId);timerId=null;$('#timer-toggle').textContent='开始';toast('25 分钟专注完成，请记录成果');}},1000); });
  $('#timer-reset').addEventListener('click',()=>{clearInterval(timerId);timerId=null;timerSeconds=timerInitial=25*60;updateTimer();$('#timer-toggle').textContent='开始';});
  $('#timer-log').addEventListener('click',()=>{const used=Math.max(0,Math.round((timerInitial-timerSeconds)/60));if(!used){toast('先开始计时，完成后再记录');return;} state.logs.push({date:today,skill:$('#timer-activity').value.replace('精听','').replace('练习',''),minutes:used,activity:$('#timer-activity').value,evidence:'专注计时器',note:'',week:state.currentWeek});saveState();toast(`已记录 ${used} 分钟`);$('#timer-reset').click();});

  renderDashboard(); renderRoadmap(); renderMaterials(); renderRecords(); loadDuolingoProfile();
})();
