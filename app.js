(() => {
  const planChoice = new URLSearchParams(location.search).get('plan');
  const activePlan = planChoice === 'nico' ? window.NICO_LEARNING_PLAN : window.LEARNING_PLAN;
  const planId = activePlan.profile?.id || 'leo-english-year-one';
  const learnerName = activePlan.profile?.learner || 'Leo';
  const targetHours = activePlan.profile?.targetHours || 650;
  const { phases, weeks, materials } = activePlan;
  const storageKey = `learning-workspace:${planId}:v1`;
  const calendarDayIndex = (new Date().getDay() + 6) % 7;
  const defaultState = { currentWeek: 1, selectedDay: calendarDayIndex, completedTasks: {}, taskNotes: {}, passedWeeks: [], logs: [], scores: [], customMaterials: [] };
  let state = loadState();
  let activeFilter = 0;
  let roadmapPage = 1;
  let historyPage = 1;
  let printing = false;
  let materialFilter = '全部';
  const materialCategories = activePlan.materialCategories || ['全部','听力','口语','阅读与语法','考试','影视'];
  const materialTypes = activePlan.materialTypes || ['阅读与语法','听力','听力','口语','阅读与语法','阅读与语法','考试','考试','影视'];
  const scrollPositions = {};
  let currentView = '';
  let timerSeconds = 25 * 60;
  let timerInitial = timerSeconds;
  let timerId = null;
  let expandedTaskKey = '';
  let expandedDayPrefix = '';

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  function setupPlanIdentity() {
    const isNico = planChoice === 'nico';
    const planName = activePlan.profile?.name || '英语进阶计划';
    document.title = planName;
    $('.progress-track').setAttribute('aria-valuemax', targetHours);
    $$('.brand strong, .landing-brand strong').forEach(node => { node.textContent = planName; });
    $$('.brand small, .landing-brand small').forEach(node => { node.textContent = isNico ? 'Nico · English Year One' : 'Leo · English Year One'; });
    if (isNico) {
      $('#landing-title').innerHTML = '把基础，练成<br />稳定的英语能力。';
      $('.landing-copy > p:last-child').textContent = '从 IELTS 5.5 到 6.5+，同时建立能用于会议、汇报、邮件和面试的英语能力。';
      const metrics = $$('.landing-metrics dt');
      metrics[1].textContent = `${targetHours}h`;
      metrics[2].textContent = '6.5+';
      $('.goal-score').textContent = '6.5+';
      $('.goal-caption').innerHTML = 'IELTS<br />target';
      $('#duolingo-card .duolingo-identity small').textContent = '学习计划基线';
      $$('#duolingo-card .duolingo-stats small')[0].textContent = '当前起点';
      $$('#duolingo-card .duolingo-stats small')[1].textContent = '年度目标';
      $('#record-duolingo').closest('article').querySelector('small').textContent = 'Anki 回顾 · 手动记录';
      $('#record-duolingo').nextElementSibling.textContent = '正确率';
    }
    $('#plan-picker').innerHTML = [
      ['leo','Leo 的英语进阶','高 A1 → IELTS 6.5'],
      ['nico','Nico 的能力升级','IELTS 5.5 → 6.5+'],
    ].map(([id,name,detail]) => `<button class="landing-plan-option ${isNico === (id==='nico')?'is-selected':''}" data-plan-choice="${id}" type="button"><strong>${name}</strong><small>${detail}</small></button>`).join('');
    $$('[data-plan-choice]').forEach(button => button.addEventListener('click', () => {
      const next = button.dataset.planChoice;
      if ((next === 'nico') === isNico) return;
      location.href = `${location.pathname}?plan=${next}#home`;
    }));
    $('#stage-strip').innerHTML = phases.map((phase, index) => `<article><span>${String(index+1).padStart(2,'0')}</span><small>${phase.range}</small><strong>${phase.name}</strong><em>${phase.target}</em></article>`).join('');
  }
  setupPlanIdentity();
  const localDate = new Date();
  const today = `${localDate.getFullYear()}-${String(localDate.getMonth()+1).padStart(2,'0')}-${String(localDate.getDate()).padStart(2,'0')}`;
  $('#today-date').textContent = new Intl.DateTimeFormat('zh-CN', { month:'long', day:'numeric', weekday:'long' }).format(new Date());
  $('#log-date').value = today;
  $('#score-date').value = today;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return { ...defaultState, ...saved, customMaterials: Array.isArray(saved.customMaterials) ? saved.customMaterials : [] };
    }
    catch { return { ...defaultState }; }
  }
  function saveState() { localStorage.setItem(storageKey, JSON.stringify(state)); renderDashboard(); renderMaterials(); renderRecords(); }
  function esc(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('is-visible'); clearTimeout(el._timer); el._timer=setTimeout(()=>el.classList.remove('is-visible'),2400); }

  // Lucide icons, ISC/MIT. License retained in ASSET-LICENSES.md.
  const iconPaths = {
    book: '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',
    headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    speech: '<path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/><path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603M17 15a3.5 3.5 0 0 0-.025-4.975"/>'
  };
  function icon(name) { return `<svg class="skill-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.book}</svg>`; }
  function iconFor(text) { return /口语|对话|Voice|跟读|复述/.test(text) ? 'speech' : /听|BBC|VOA|影视/.test(text) ? 'headphones' : 'book'; }
  function paginate(target, page, count, onChange) {
    const pages = Math.max(1, Math.ceil(count / 8));
    const numbers = Array.from({length:pages},(_,i)=>i+1).filter(n=>n===1 || n===pages || Math.abs(n-page)<=1);
    const links = numbers.map((n,i)=>`${i && n-numbers[i-1]>1?'<span class="page-ellipsis">…</span>':''}<button class="page-number" data-page="${n}" ${n===page?'aria-current="page"':''} aria-label="第 ${n} 页">${n}</button>`).join('');
    $$(target).forEach(nav => {
      nav.innerHTML = `<span class="page-range" role="status">${count?`${(page-1)*8+1}–${Math.min(count,page*8)}`:'0'} / ${count} 项</span><div class="page-controls"><button class="secondary-button" data-page="${page-1}" ${page===1?'disabled':''}>上一页</button><div class="page-numbers">${links}</div><span class="compact-page">${page} / ${pages}</span><button class="secondary-button" data-page="${page+1}" ${page===pages?'disabled':''}>下一页</button></div>`;
      nav.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => { const n=Number(button.dataset.page);onChange(n); document.querySelector(`${target.split(',')[0]} [data-page="${n}"][aria-current]`)?.focus({preventScroll:true}); }));
    });
  }

  function formatNumber(value) { return new Intl.NumberFormat('zh-CN').format(Number(value || 0)); }
  function formatSyncTime(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '同步时间未知' : `更新于 ${new Intl.DateTimeFormat('zh-CN', { month:'numeric', day:'numeric', hour:'2-digit', minute:'2-digit' }).format(date)}`;
  }
  async function loadDuolingoProfile() {
    const card = $('#duolingo-card');
    if (activePlan.profile?.duolingo === false) {
      $('#duolingo-title').textContent = `${learnerName} · 计划起点`;
      $('#duolingo-streak').textContent = activePlan.profile.startingLevel;
      $('#duolingo-english-xp').textContent = activePlan.profile.target;
      $('#duolingo-state').textContent = '独立计划';
      $('#duolingo-sync-time').textContent = '学习数据独立保存；建议每周记录 Anki 正确率、模考成绩与输出证据。';
      card.setAttribute('aria-busy', 'false');
      return;
    }
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
    { match:['Anki'], label:'打开 Anki', url:'https://apps.ankiweb.net/' },
    { match:['British Council'], label:'打开 British Council', url:'https://learnenglish.britishcouncil.org/free-resources/listening' },
    { match:['Language Reactor'], label:'打开 Language Reactor', url:'https://www.languagereactor.com/help/basic' },
    { match:['ELSA'], label:'打开 ELSA Speak', url:'https://elsaspeak.com/' },
    { match:['Write & Improve'], label:'打开 Write & Improve', url:'https://writeandimprove.com/' },
    { match:['Toggl'], label:'打开 Toggl Track', url:'https://toggl.com/track/' },
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

  function nicoDailySchedule(week) {
    const scale = week.hours / 12;
    const minutes = value => Math.max(10, Math.round(value * scale / 5) * 5);
    const task = (title, material, value, steps, evidence, resourceText=material, prompt='') => ({ title, material, minutes:minutes(value), steps, evidence, resource:resourceFor(resourceText), prompt });
    const talkPrompt = `你是 Nico 的英语口语教练。当前是第 ${week.week} 周“${week.title}”，重点：${week.focus}。请用英文一次问一个问题，至少追问 5 次；结束后用中文只指出最重要的 3 个表达、语法或发音问题，并让我重说一次。`;
    return [
      {name:'周一',theme:'词块与核心输入',tasks:[task('Anki 词块复习','Anki：复习旧卡并新增 10–15 张',25,['遮住中文主动回忆','每张卡朗读例句','为 5 个词块造工作场景句'],'完成复习；保存 5 个个人例句','Anki'),task('分级精听',week.materials,35,['第一遍盲听确认主题','第二遍看稿标出听不出的词块','第三遍遮稿复述'],'记录首听理解率和 5 个词块','British Council'),task('Sentence Lab',`围绕“${week.title}”拆解 5–10 个长句`,25,['找主语和谓语','标连接词与从句','合上原句做简单英文复述'],'保存至少 5 句拆解笔记','British Council'),task('当日短输出','80–120 字英文短写作',20,['独立写完初稿','检查时态和冠词','使用 3 个本周词块'],'保存初稿与 3 个新词块','Write & Improve')]},
      {name:'周二',theme:'听辨与复述',tasks:[task('Anki 巩固','Anki：昨日新卡与易错卡',20,['优先复习模糊词','朗读完整例句','标记仍不熟的词块'],'回顾准确率达到 80% 或记录错词','Anki'),task('精听与跟读',`${week.materials}：30–90 秒片段`,40,['盲听并记关键词','逐句对照文本','跟读后录一遍复述'],'保存片段名、复述录音与 3 个听辨问题','Language Reactor'),task('口语反应',`主题：${week.title}`,25,['用关键词说 1 分钟','让 ChatGPT 连续追问','根据反馈重说一次'],'完成 5 轮追问并保存反馈','ChatGPT',talkPrompt)]},
      {name:'周三',theme:'结构与口语',tasks:[task('Anki 词块复习','Anki：工作与 IELTS 词块',25,['主动回忆搭配','说出个人例句','复习弱词'],'完成当天复习','Anki'),task('阅读结构',week.focus,30,['限时阅读一个段落或短文','标主旨、细节与连接词','用 3 句英文总结'],'保存主旨和 3 个细节','British Council'),task('ELSA 与连续表达','ELSA 10 分钟 + 主题口述',30,['完成发音练习','按观点—理由—例子—结论表达','回听后标记长停顿'],'保存 1–2 分钟录音','ELSA',talkPrompt)]},
      {name:'周四',theme:'写作与纠错',tasks:[task('Anki 回顾','Anki：本周目标词块',20,['复习旧卡','选 5 个词块造句','标记不稳定卡片'],'至少 5 个词块能主动使用','Anki'),task('写作一稿',`围绕“${week.title}”完成英文写作`,35,['独立完成 120–250 字','先检查任务回应和结构','再检查语言准确度'],'保存一稿','Write & Improve'),task('二次修改',`修改当天写作`,25,['获取反馈但不直接代写','自己重写关键句','总结 3 类重复错误'],'保存一稿、二稿和错误分类','Write & Improve')]},
      {name:'周五',theme:'真实职场迁移',tasks:[task('Anki 收尾','Anki：本周词块回顾',20,['只复习本周卡片','口头说出 10 个例句','标记下周继续卡'],'10 个词块中至少 8 个能调用','Anki'),task('职场英语任务',week.output,40,['按本周任务独立完成','使用背景—行动—结果结构','留下录音、文本或纪要'],'完成并保存本周职场产物','ChatGPT',talkPrompt),task('影视或视频精听','Language Reactor：选择 3–5 分钟相关片段',30,['英文字幕分段理解','提取 5 个自然表达','用表达改写工作句'],'保存片段与 5 个表达','Language Reactor')]},
      {name:'周六',theme:'测试与长任务',tasks:[task('IELTS 或专项测试',week.check,60,['严格计时独立完成','记录正确率或评分','按题型和原因分类错误'],'保存成绩与错误分类','IELTS 官方'),task('深度复述',week.materials,30,['复听或重读本周材料','脱离文本复述 2 分钟','让 ChatGPT 追问'],'保存 2 分钟录音或会话文字','ChatGPT',talkPrompt),task('本周作品整理',week.output,25,['确认文本或录音可打开','补充一句自评','归档到学习记录'],'至少一项完整输出证据','ChatGPT')]},
      {name:'周日',theme:'轻复盘与恢复',tasks:[task('周复盘','本周日志、错题与录音',30,['统计有效学习时长','选出 Top 3 错误','决定下周只优化的 1–2 件事'],'完成周报：时长、证据、错误与下周动作','Toggl'),task('轻度英语输入','BBC 或影视轻输入',20,['只选择感兴趣的短内容','不逐词查词','记录 1 个想再次使用的表达'],'保留 1 个表达；其余时间休息','British Council')]},
    ];
  }

  function dailySchedule(week) {
    if (activePlan.profile?.id === 'nico-english-2026') return nicoDailySchedule(week);
    const weekMaterials = week.materials.split('；');
    const mainMaterial = weekMaterials[0];
    const supportMaterial = weekMaterials[1] || mainMaterial;
    const scale = week.hours / 12.5;
    const minutes = value => Math.max(5, Math.round(value * scale / 5) * 5);
    const task = (title, material, value, steps, evidence, resourceText=material, prompt='') => ({
      title, material, minutes:minutes(value), steps, evidence, resource:resourceFor(resourceText), prompt,
    });
    const speakingPrompt = goal => `你是我的英语口语教练。我正在进行第 ${week.week} 周“${week.title}”训练，计划阶段是${phases.find(p=>p.id===week.phase).name}，重点是：${week.focus}。请先根据我的回答判断实际水平，再调整难度。围绕“${goal}”和我进行英文对话：一次只问一个问题；等我回答后再继续；不要立即打断纠错；对话结束后用中文列出 3 个最重要的错误、给出更自然的表达，并让我重新回答一次。`;
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
    closeLanding();
    if (currentView) scrollPositions[currentView] = window.scrollY;
    $$('.view').forEach(v => v.classList.toggle('is-active', v.id === `view-${name}`));
    $$('[data-view]').forEach(b => b.classList.toggle('is-active', b.dataset.view === name));
    $$('.desktop-nav [data-view], .mobile-nav [data-view]').forEach(b => { if (b.dataset.view === name) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
    if(location.hash !== `#${name}`) history.pushState(null, '', `#${name}`);
    currentView = name;
    window.scrollTo({ top: scrollPositions[name] || 0, behavior: 'instant' });
    const heading = document.querySelector(`#view-${name} h1`);
    heading.setAttribute('tabindex','-1');
    heading.focus({preventScroll:true});
  }
  function closeLanding() {
    const landing = $('#landing-screen');
    landing.hidden = true;
    document.body.classList.remove('is-landing');
  }
  function showLanding(updateHash = false) {
    if (currentView) scrollPositions[currentView] = window.scrollY;
    const landing = $('#landing-screen');
    landing.hidden = false;
    document.body.classList.add('is-landing');
    if (updateHash && location.hash !== '#home') history.pushState(null, '', '#home');
  }
  window.addEventListener('popstate', () => {
    const view = location.hash.slice(1);
    if (['today','roadmap','materials','records'].includes(view)) showView(view);
    else showLanding(false);
  });
  $$('[data-view]').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
  $$('[data-home-link]').forEach(link => link.addEventListener('click', e => { e.preventDefault(); showLanding(true); }));
  $('#enter-learning').addEventListener('click', () => showView('today'));
  const hashView = location.hash.slice(1);

  function renderDashboard() {
    const week = weeks[state.currentWeek - 1];
    const phase = phases.find(p => p.id === week.phase);
    $('#journey-title').textContent = `第 ${week.week} 周 · ${phase.name}`;
    $('#journey-copy').textContent = `已通过 ${state.passedWeeks.length} / 52 周验收。当前阶段：${phase.range}，下一站 ${phase.level}。`;
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
    if (expandedDayPrefix !== keyPrefix) {
      expandedDayPrefix = keyPrefix;
      expandedTaskKey = `${keyPrefix}${firstIncompleteIndex < 0 ? 0 : firstIncompleteIndex}`;
    }
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
    $$('#today-tasks .task-index').forEach((badge, i) => {
      badge.innerHTML = icon(iconFor(day.tasks[i].title));
      badge.setAttribute('aria-label', `任务 ${i+1}`);
    });
    $$('[data-task-key]').forEach(input => input.addEventListener('change', e => {
      const taskKey = e.target.dataset.taskKey;
      state.completedTasks[taskKey] = e.target.checked;
      if (e.target.checked) {
        const taskIndex = Number(taskKey.split('-t').pop());
        expandedTaskKey = taskIndex + 1 < day.tasks.length ? `${keyPrefix}${taskIndex + 1}` : taskKey;
      }
      saveState();
      if(e.target.checked) toast(dayIsComplete(week.week, selectedDay, schedule) ? '今天的任务都完成了！记得留下学习成果。' : '已完成一项，继续下一段练习');
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
    $('#hours-copy').textContent = `${totalHours.toFixed(1)} / ${targetHours} 小时`;
    $('#hours-progress').style.width = `${Math.max(0, Math.min(100, totalHours/targetHours*100))}%`;
    $('.progress-track').setAttribute('aria-valuenow', Math.max(0, Math.min(targetHours, totalHours)));
    $('.progress-track').setAttribute('aria-valuetext', `已学习 ${totalHours.toFixed(1)} 小时，目标 ${targetHours} 小时`);
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
    $('#phase-filters').innerHTML = [{id:0,name:'全部阶段'},...phases].map(p=>`<button class="filter-button ${p.id===activeFilter?'is-active':''}" data-phase="${p.id}" aria-pressed="${p.id===activeFilter}">${esc(p.name)}</button>`).join('');
    $$('#phase-filters .filter-button').forEach(b=>b.addEventListener('click',()=>{ activeFilter=Number(b.dataset.phase); roadmapPage=1; renderRoadmap(); }));
    const filtered = !printing && activeFilter ? weeks.filter(w=>w.phase===activeFilter) : weeks;
    const visible = printing ? weeks : filtered.slice((roadmapPage-1)*8, roadmapPage*8);
    paginate('#roadmap-pagination-top, #roadmap-pagination', roadmapPage, filtered.length, page => { roadmapPage=page; renderRoadmap(); $('#roadmap-pagination-top').scrollIntoView({block:'start'}); });
    $('#roadmap-list').innerHTML = visible.map(w => `<article id="week-${w.week}" class="week-card ${state.passedWeeks.includes(w.week)?'is-passed':''}"><div class="week-number"><small>Week</small><strong>${String(w.week).padStart(2,'0')}</strong></div><div class="week-main"><h3>${esc(w.title)}</h3><p>${esc(w.focus)}</p></div><div class="week-goal"><strong>验收标准</strong><p>${esc(w.check)}</p></div><div class="week-hours"><strong>${w.hours}h</strong><small>建议时长</small><button class="week-pass" data-pass-week="${w.week}">${state.passedWeeks.includes(w.week)?'已通过':'标记通过'}</button></div></article>`).join('');
    $$('[data-pass-week]').forEach(b=>b.addEventListener('click',()=>{ const n=Number(b.dataset.passWeek); state.passedWeeks=state.passedWeeks.includes(n)?state.passedWeeks.filter(x=>x!==n):[...state.passedWeeks,n].sort((a,b)=>a-b); saveState(); renderRoadmap(); }));
    $$('#roadmap-list .week-card').forEach(card => {
      const n = Number(card.id.replace('week-',''));
      card.classList.toggle('is-current-week', n === state.currentWeek);
      const button = document.createElement('button');
      button.className = 'secondary-button';
      button.textContent = n === state.currentWeek ? '继续本周' : '查看每日安排';
      button.addEventListener('click', () => { state.currentWeek=n; saveState(); renderRoadmap(); showView('today'); });
      card.querySelector('.week-hours').append(button);
    });
  }
  $('#week-select').addEventListener('change', e => { state.currentWeek=Number(e.target.value); saveState(); renderRoadmap(); showView('today'); toast(`已切换到第 ${state.currentWeek} 周`); });
  $('#locate-week').addEventListener('click', () => { activeFilter=0; roadmapPage=Math.floor((state.currentWeek-1)/8)+1;renderRoadmap(); const card=$(`#week-${state.currentWeek}`);card.scrollIntoView({block:'center',behavior:'smooth'});card.querySelector('.week-hours button:last-child').focus({preventScroll:true}); });

  function renderMaterials() {
    const query = $('#material-search').value.trim().toLowerCase();
    $('#material-filters').innerHTML = materialCategories.map(c=>`<button class="filter-button" data-material-type="${c}" aria-pressed="${c===materialFilter}">${c}</button>`).join('');
    $$('[data-material-type]').forEach(b=>b.addEventListener('click',()=>{materialFilter=b.dataset.materialType;renderMaterials(); $(`[data-material-type="${materialFilter}"]`).focus({preventScroll:true});}));
    const library = [
      ...materials.map((material,index) => ({ ...material, category: materialTypes[index], custom: false })),
      ...state.customMaterials.map(material => ({ ...material, custom: true })),
    ];
    const visible = library.filter(material => (materialFilter==='全部' || material.category===materialFilter) && [material.name,material.use,material.phase,...material.points].join(' ').toLowerCase().includes(query));
    $('#material-results').textContent = `${materialFilter} · ${visible.length} 项材料${state.customMaterials.length ? ` · 自定义 ${state.customMaterials.length} 项` : ''}`;
    $('#materials-grid').innerHTML = visible.map(material=>`<article class="material-card ${material.custom?'is-custom-material':''}"><span class="material-index">${icon(iconFor(material.name+material.use))}</span><div class="material-card-heading"><h2>${esc(material.name)}</h2>${material.custom?'<span class="tag">我的材料</span>':''}</div><p><strong>${esc(material.use)}</strong><br>${esc(material.phase)}</p><ul>${material.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="material-card-actions"><a href="${esc(material.url)}" target="_blank" rel="noopener noreferrer">打开学习材料 ↗</a>${material.custom?`<button class="text-button material-remove" data-remove-material="${esc(material.id)}">移除</button>`:''}</div></article>`).join('') || '<p class="empty-state">没有匹配的材料，试试平台名称、口语或阅读。</p>';
    $$('[data-remove-material]').forEach(button => button.addEventListener('click', () => {
      const item = state.customMaterials.find(material => material.id === button.dataset.removeMaterial);
      if (!item || !confirm(`移除“${item.name}”吗？这不会影响你的学习记录。`)) return;
      state.customMaterials = state.customMaterials.filter(material => material.id !== item.id);
      saveState();
      toast('已从材料库移除');
    }));
  }
  $('#material-search').addEventListener('input', renderMaterials);
  $('#material-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#material-name').value.trim();
    const use = $('#material-use').value.trim();
    const url = $('#material-url').value.trim();
    let normalizedUrl;
    try {
      const parsed = new URL(url);
      if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('unsupported protocol');
      normalizedUrl = parsed.href;
    } catch {
      $('#material-url').setCustomValidity('请输入以 http:// 或 https:// 开头的有效链接。');
      $('#material-url').reportValidity();
      return;
    }
    $('#material-url').setCustomValidity('');
    const points = $('#material-notes').value.split('\n').map(item => item.trim()).filter(Boolean).slice(0, 5);
    state.customMaterials.unshift({
      id: `material-${Date.now()}`,
      name,
      use,
      phase: $('#material-phase').value.trim() || '全年',
      category: $('#material-category').value,
      url: normalizedUrl,
      points: points.length ? points : ['在学习记录中留下材料名称、有效时长和完成证据'],
    });
    materialFilter = '全部';
    event.target.reset();
    $('#material-phase').value = '全年';
    $('#add-material-panel').open = false;
    saveState();
    toast(`已加入“${name}”`);
  });

  function renderRecords() {
    const total = state.logs.reduce((sum,l)=>sum+Number(l.minutes||0),0);
    const speaking = state.logs.filter(l=>l.skill==='口语').reduce((sum,l)=>sum+Number(l.minutes||0),0);
    const latestIELTS = [...state.scores].reverse().find(s=>s.type==='IELTS 模考');
    const latestDuo = [...state.scores].reverse().find(s=>s.type==='Duolingo');
    $('#record-total-hours').textContent = (total/60).toFixed(1);
    $('#record-speaking-minutes').textContent = speaking;
    $('#record-ielts').textContent = latestIELTS?.total || '—';
    $('#record-duolingo').textContent = latestDuo?.total || '27';
    const allHistory = [
      ...state.logs.map((x,i)=>({...x,kind:'学习',index:i})),
      ...state.scores.map((x,i)=>({...x,kind:'测评',index:i,activity:x.type,minutes:x.total,evidence:x.detail,note:x.note}))
    ].filter(h=>$('#history-filter').value==='all'||h.kind===$('#history-filter').value).sort((a,b)=>b.date.localeCompare(a.date));
    historyPage = Math.min(historyPage, Math.max(1, Math.ceil(allHistory.length/8)));
    const history = allHistory.slice((historyPage-1)*8, historyPage*8);
    paginate('#history-pagination', historyPage, allHistory.length, page => { historyPage=page; renderRecords(); $('#history-list').scrollIntoView({block:'start'}); });
    $('#history-pagination').hidden = !allHistory.length;
    $('#history-list').innerHTML = history.length ? history.map(h=>`<article class="history-item"><small>${esc(h.date)}</small><small>${esc(h.kind)} · ${esc(h.skill||h.type||'')}</small><div><strong>${esc(h.activity)}</strong><small>${esc(h.evidence||'')}${h.note?` · ${esc(h.note)}`:''}</small></div><strong>${esc(h.minutes)}${h.kind==='学习'?' 分钟':''}</strong><button data-delete-kind="${h.kind}" data-delete-index="${h.index}" aria-label="删除记录">×</button></article>`).join('') : '<div class="empty-state">还没有记录。完成第一个 25 分钟学习块后，把材料、时间和结果记在这里。</div>';
    if(!history.length) $('#history-list').innerHTML = `<div class="empty-state illustrated-empty"><img src="assets/plant.svg" width="160" height="120" alt="" aria-hidden="true"><div><h3>${state.logs.length+state.scores.length?'这个分类还没有记录':'让每一次练习，都留下成长的痕迹'}</h3><p>写下学了什么、用了多久、完成了什么，回头就能看见自己的进步。</p><button class="primary-button" id="empty-add-record">记录一次练习</button></div></div>`;
    $('#empty-add-record')?.addEventListener('click',()=>openForm('log-form'));
    $$('[data-delete-kind]').forEach(b=>b.addEventListener('click',()=>{ const collection=b.dataset.deleteKind==='学习'?'logs':'scores'; state[collection].splice(Number(b.dataset.deleteIndex),1); saveState(); toast('记录已删除'); }));
  }
  function openForm(id) { const form=$(`#${id}`);form.closest('details').open=true;form.closest('details').scrollIntoView({block:'start',behavior:'smooth'});form.querySelector('input').focus({preventScroll:true}); }
  $$('[data-open-form]').forEach(b=>b.addEventListener('click',()=>openForm(b.dataset.openForm)));
  $('#history-filter').addEventListener('change',()=>{historyPage=1;renderRecords();});

  function finishEntry(form) { historyPage=1;$('#history-filter').value='all';saveState();form.reset();form.closest('details').open=false;$('.history-section').scrollIntoView({block:'start',behavior:'smooth'}); }
  $('#log-form').addEventListener('submit', e => { e.preventDefault(); state.logs.push({date:$('#log-date').value,skill:$('#log-skill').value,minutes:Number($('#log-minutes').value),activity:$('#log-activity').value.trim(),evidence:$('#log-evidence').value.trim(),note:$('#log-note').value.trim(),week:state.currentWeek}); finishEntry(e.target); $('#log-date').value=today; $('#log-minutes').value=25; toast('学习记录已保存'); });
  $('#score-form').addEventListener('submit', e => { e.preventDefault(); state.scores.push({date:$('#score-date').value,type:$('#score-type').value,total:$('#score-total').value.trim(),detail:$('#score-detail').value.trim(),note:$('#score-note').value.trim()}); finishEntry(e.target); $('#score-date').value=today; toast('测评成绩已保存'); });
  $('#export-button').addEventListener('click',()=>{ const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}); const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`english-learning-backup-${today}.json`;a.click();URL.revokeObjectURL(a.href);toast('备份已导出'); });
  $('#import-input').addEventListener('change',async e=>{ const file=e.target.files?.[0]; if(!file)return; try{ const parsed=JSON.parse(await file.text()); state={...defaultState,...parsed};saveState();renderRoadmap();toast('备份已恢复');}catch{toast('无法读取这个备份文件');} e.target.value=''; });
  $('#clear-data').addEventListener('click',()=>{ if(confirm('确定清空所有本地学习记录和勾选状态吗？请先导出备份。')){state={...defaultState};saveState();renderRoadmap();toast('本地数据已清空');} });
  $('#print-button').addEventListener('click',()=>window.print());
  window.addEventListener('beforeprint', () => { printing=true; renderRoadmap(); });
  window.addEventListener('afterprint', () => { printing=false; renderRoadmap(); });

  function updateTimer(){ const m=Math.floor(timerSeconds/60);const s=timerSeconds%60;$('#timer-display').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }
  $('#timer-toggle').addEventListener('click',()=>{ if(timerId){clearInterval(timerId);timerId=null;$('#timer-toggle').textContent='继续';return;} $('#timer-toggle').textContent='暂停';timerId=setInterval(()=>{timerSeconds=Math.max(0,timerSeconds-1);updateTimer();if(timerSeconds===0){clearInterval(timerId);timerId=null;$('#timer-toggle').textContent='开始';toast('25 分钟专注完成，请记录成果');}},1000); });
  $('#timer-reset').addEventListener('click',()=>{clearInterval(timerId);timerId=null;timerSeconds=timerInitial=25*60;updateTimer();$('#timer-toggle').textContent='开始';});
  $('#timer-log').addEventListener('click',()=>{const used=Math.max(0,Math.round((timerInitial-timerSeconds)/60));if(!used){toast('先开始计时，完成后再记录');return;} state.logs.push({date:today,skill:$('#timer-activity').value.replace('精听','').replace('练习',''),minutes:used,activity:$('#timer-activity').value,evidence:'专注计时器',note:'',week:state.currentWeek});saveState();toast(`已记录 ${used} 分钟`);$('#timer-reset').click();});

  renderDashboard(); renderRoadmap(); renderMaterials(); renderRecords(); loadDuolingoProfile();
  if (['today','roadmap','materials','records'].includes(hashView)) showView(hashView);
  else showLanding(false);
  $('.timer-card h2').insertAdjacentHTML('beforebegin', `<span class="section-symbol">${icon('headphones')}</span>`);
  $('.method-section h2').insertAdjacentHTML('beforebegin', `<span class="section-symbol">${icon('speech')}</span>`);
})();
