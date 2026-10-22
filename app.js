(() => {
  'use strict';
  const S = window.StudyStore, E = window.StudyEngine;
  const resources = [...window.STUDY_RESOURCES,...window.AUTHENTIC_RESOURCES];
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const uid = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  const copy = value => JSON.parse(JSON.stringify(value));
  const skillNames = {listening:'听力',speaking:'口语',reading:'阅读',writing:'写作',vocabulary:'语法词块',review:'复习',mock:'模考'};
  const nav = [['today','今天','☀'],['route','学习路线','⌁'],['library','材料库','▤'],['review','复习','↻'],['growth','成长记录','◷']];
  let profile = new URLSearchParams(location.search).get('plan') === 'nico' ? 'nico' : 'leo';
  let course, state, storageError = '', page = 'today', activeLesson = null, selectedDay = null;
  let ui = {tab:'learn',graded:{},checks:{},filter:'本周',query:'',historyPage:1,reveal:{}};
  let saveTimeout, toastTimeout, recorder = null, recordingPending = false;
  const iconPaths = {
    book:'<path d="M12 5v16"/><path d="M22 17V5a2 2 0 0 0-2-2h-4a5 5 0 0 0-4 2 5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4a5 5 0 0 1 4 2 5 5 0 0 1 4-2h4a2 2 0 0 0 2-2Z"/>',
    headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    speech:'<path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/><path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603M17 15a3.5 3.5 0 0 0-.025-4.975"/>'
  };
  const icon = name => `<svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.book}</svg>`;
  const fmtMinutes = minutes => minutes >= 60 ? `${Math.floor(minutes / 60)}小时${minutes % 60 ? `${minutes % 60}分` : ''}` : `${minutes}分钟`;
  const dateText = date => new Intl.DateTimeFormat('zh-CN',{month:'long',day:'numeric',weekday:'long'}).format(date || new Date());
  function addDays(date, count) { const d = new Date(`${date}T12:00:00`); d.setDate(d.getDate()+count); return S.dateKey(d); }
  function calendarOffset() { return Math.max(0,Math.min(363,S.dayOffset(state.settings.startDate))); }
  function currentWeek() { return Math.floor(calendarOffset()/7)+1; }
  function getLesson(week, day) { return E.lesson(course,week,day,state.settings.weeklyMinutes); }
  function nextLesson(lesson) { const offset=(lesson.week-1)*7+lesson.day+1;return offset<364?getLesson(Math.floor(offset/7)+1,offset%7):null; }
  function draftFor(lesson) { return state.drafts[lesson.id] || {text:'',note:'',answers:{}}; }
  function lessonUrl(lesson) { return `#lesson/${lesson.week}/${lesson.day+1}`; }
  function dueReviews() { return state.reviews.filter(r=>!r.done&&r.due<=S.dateKey()); }
  function toast(message) { $('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('#toast').classList.remove('show'),3500); }
  function commit(next=state) {
    if(storageError){toast('请先恢复或导出受损数据，再保存新的练习');return false;}
    try { state=S.save(next);return true; } catch(error) { toast(error.message);return false; }
  }
  function persistDraft(lesson, field, value) {
    const draft={...draftFor(lesson),[field]:value};state.drafts[lesson.id]=draft;
    clearTimeout(saveTimeout);saveTimeout=setTimeout(()=>{if(commit()){const status=$('#draft-status');if(status)status.textContent='已保存到本机';}},450);
  }
  function loadProfile() {
    course=window.COURSES?.[profile];if(!course)throw Error('课程文件尚未加载，请刷新页面');
    storageError='';try{state=S.migrate(profile);}catch(error){storageError=error.message;state=S.create(profile);}
    if(state.timer?.startedAt){state.timer.startedAt=null;commit();}
    $('#profile-name').textContent=`${course.learner} 的学习空间`;
    $('#profile-toggle').setAttribute('aria-label',`切换学习空间，当前 ${course.learner}`);
    $('#avatar').textContent=course.learner[0];$('#avatar').classList.toggle('profile-leo',profile==='leo');
    document.querySelectorAll('.profile-option').forEach(el=>el.setAttribute('aria-checked',String(el.dataset.profile===profile)));
    document.title=`${course.learner} · 慢慢会说`;
  }
  function setProfileMenuOpen(open, focus=false) {
    $('#profile-menu').hidden=!open;
    $('#profile-toggle').setAttribute('aria-expanded',String(open));
    if(focus)(open?$('#profile-menu [aria-checked="true"]'):$('#profile-toggle')).focus();
  }
  function switchProfile(nextProfile) {
    if(!['leo','nico'].includes(nextProfile))return;
    setProfileMenuOpen(false);
    if(nextProfile===profile){$('#profile-toggle').focus();return;}
    pauseTimer();clearTimeout(saveTimeout);
    if(!commit()){ $('#profile-toggle').focus();return; }
    if(recorder?.state==='recording')recorder.stop();
    profile=nextProfile;selectedDay=null;
    ui={tab:'learn',graded:{},checks:{},filter:'本周',query:'',historyPage:1,reveal:{}};
    const url=new URL(location.href);url.searchParams.set('plan',profile);url.hash='today';history.replaceState(null,'',url);
    loadProfile();route();toast(`已切换到 ${course.learner} 的学习空间`);
  }
  function handleProfileMenuKey(event) {
    if(!event.target.closest('#profile-picker'))return;
    const options=[...document.querySelectorAll('.profile-option')],isTrigger=event.target===$('#profile-toggle');
    if(isTrigger&&['ArrowDown','ArrowUp'].includes(event.key)){
      event.preventDefault();setProfileMenuOpen(true);options[event.key==='ArrowDown'?0:options.length-1].focus();return;
    }
    if($('#profile-menu').hidden)return;
    if(event.key==='Escape'){event.preventDefault();setProfileMenuOpen(false,true);return;}
    if(event.key==='Tab'){setProfileMenuOpen(false);return;}
    if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
    event.preventDefault();const index=options.indexOf(event.target);
    options[event.key==='Home'?0:event.key==='End'?options.length-1:(index+(event.key==='ArrowDown'?1:options.length-1))%options.length].focus();
  }
  function titleBlock(title, description='',actions='') {return `<div class="page-top"><div><h1>${esc(title)}</h1>${description?`<p class="muted">${esc(description)}</p>`:''}</div>${actions?`<div class="page-actions">${actions}</div>`:''}</div>`;}
  function renderNav() {
    const current=page==='lesson'||page==='complete'?'today':page;
    const html=nav.map(([id,label,symbol])=>`<a class="nav-item ${current===id?'active':''}" href="#${id}" ${current===id?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${symbol}</span><span>${label}</span></a>`).join('');
    $('#main-nav').innerHTML=html;$('#mobile-nav').innerHTML=html;
    $('#page-label').textContent=page==='settings'?'学习偏好':page==='lesson'?'我的学习 / 专注练习':(nav.find(n=>n[0]===page)?.[1]||'我的学习');
  }
  function render() {
    if(recorder?.state==='recording'&&(page!=='lesson'||ui.tab!=='practice'))recorder.stop();
    renderNav();
    const views={today:renderToday,route:renderRoute,library:renderLibrary,review:renderReview,growth:renderGrowth,settings:renderSettings,lesson:renderLesson,complete:renderComplete};
    $('#content').innerHTML=(storageError?`<div class="notice error"><p>${esc(storageError)}</p><button class="btn secondary small" data-action="raw-export">导出原始数据</button><a href="#settings">恢复备份</a></div>`:'')+(views[page]||renderToday)();
    if(activeLesson)document.querySelectorAll('[name="reflection-check"]').forEach(el=>{el.checked=Boolean(ui.checks[activeLesson.id]?.[el.value]);});
    renderTimer();
    if(page==='lesson'&&activeLesson)loadAudio(activeLesson.id);
    if(page==='today')loadDuolingo();
  }
  function route() {
    setProfileMenuOpen(false);
    if(location.hash==='#content'){$('#content').focus();return;}
    pauseTimer();
    clearTimeout(saveTimeout);if(state&&!storageError)commit();
    if(recorder?.state==='recording')recorder.stop();
    window.speechSynthesis?.cancel();
    const [name,w,d]=location.hash.slice(1).split('/');
    const old={roadmap:'route',materials:'library',records:'growth',home:'today'};
    page=old[name]||name||'today';
    if(page==='lesson'||page==='complete') {
      const week=Number(w),day=Number(d)-1;
      if(Number.isInteger(week)&&week>=1&&week<=52&&Number.isInteger(day)&&day>=0&&day<7)activeLesson=getLesson(week,day);
      else {page='today';activeLesson=null;}
      ui.tab='learn';
    } else activeLesson=null;
    render();window.scrollTo({top:0,behavior:'instant'});$('#content').focus({preventScroll:true});
  }
  function dayPath(week, chosenDay) {
    return `<div class="day-path">${Array.from({length:7},(_,d)=>{const lesson=getLesson(week,d),done=state.completed[lesson.id],date=addDays(state.settings.startDate,(week-1)*7+d);return `<a class="day-node ${done?'done':''} ${d===chosenDay?'current':''}" href="${lessonUrl(lesson)}" aria-label="第${week}周学习日${d+1}，${esc(lesson.title)}${done?'，已完成':''}" ${d===chosenDay?'aria-current="step"':''}><span class="day-bubble">${done?'✓':d+1}</span><strong>${esc(E.dayNames[d].replace('与小测','').replace('与迁移',''))}</strong><span class="day-date">${date.slice(5).replace('-','/')}</span></a>`;}).join('')}</div>`;
  }
  function lessonResources(lesson) {
    const mapped=window.AUTHENTIC_WEEK_MAP[profile][lesson.week];
    const ids=[...new Set([...mapped,...lesson.content.resourceIds])].filter(id=>!['ielts-academic','ielts-general'].includes(id)||state.settings.examType==='undecided'||id.endsWith(state.settings.examType));
    return ids.map(id=>resources.find(r=>r.id===id)).filter(Boolean);
  }
  function resourceLinks(lesson) {return lessonResources(lesson).slice(0,3).map(r=>`<a class="inline-resource" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"><strong>${esc(r.name)} ↗</strong><small>${esc(r.note)}</small><small>${esc(r.cost)} · 外部原站</small></a>`).join('');}
  function blocks(lesson) {
    if(lesson.isMock)return [['听力与口语',45,'使用未练过的同一套材料；口语另约可靠评分者。'],['阅读',60,'严格计时，不查词，不提前核对答案。'],['写作 Task 1 + Task 2',60,'20分钟＋40分钟；按已选考试类型完成。']];
    if(lesson.day===6){const a=Math.min(15,lesson.minutes);const b=Math.floor((lesson.minutes-a)/2);return [['错句主动回忆',a,'先回忆，再翻看释义。'],['本周复习小测',b,'已学题复测，不是独立能力认证。'],['复盘与下周调整',lesson.minutes-a-b,'写下一个进步、一个问题和下一步。']];}
    const core=Math.min(25,lesson.minutes),extra=lesson.minutes-core,input=Math.floor(extra*.55);
    return [[`站内微课 · ${lesson.title}`,core,'原创文本、词块、针对性练习和答案解析。'],['真实材料巩固',input,`${lessonResources(lesson)[0]?.name||'本周指定资源'}；完成原站练习并记下成绩。`],['迁移输出与重做',extra-input,'按照本课产物要求输出，纠错后再做一遍；允许分段完成。']].filter(b=>b[1]>0);
  }
  function renderToday() {
    const offset=calendarOffset(),week=Math.floor(offset/7)+1,day=selectedDay??offset%7,lesson=getLesson(week,day),phase=course.phases.find(p=>p.id===lesson.content.phase);
    const weekDone=Array.from({length:7},(_,i)=>state.completed[E.lessonId(profile,week,i)]).filter(Boolean).length;
    const weekStart=addDays(state.settings.startDate,(week-1)*7),weekEnd=addDays(weekStart,6);
    const weekLogs=state.logs.filter(l=>l.date>=weekStart&&l.date<=weekEnd),weekMinutes=weekLogs.reduce((n,l)=>n+l.minutes,0),total=state.logs.reduce((n,l)=>n+l.minutes,0),done=Boolean(state.completed[lesson.id]);
    const todayLogs=state.logs.filter(l=>l.date===S.dateKey());
    const entryOffset=((state.settings.entryWeek||1)-1)*7;
    const missed=Array.from({length:Math.max(0,offset-entryOffset)},(_,i)=>{const n=entryOffset+i;return getLesson(Math.floor(n/7)+1,n%7);}).filter(l=>!state.completed[l.id]);
    return `<div class="page-top"><div><div class="date-line"><span class="date-dot"></span>${dateText()}</div><h1>${course.learner}，给英语一点时间。</h1><p class="muted">今天不必学会所有。把这一点，练到能用。</p></div><span class="pill gray">第 ${week} 周 / 52 周</span></div>
      ${!state.settings.onboarded?`<div class="notice"><p><strong>先找到适合你的起点。</strong> 原计划起点尚未重测。设定时间、考试类型和四项基线，让这张学习桌更适合你。</p><button class="btn secondary small" data-action="settings">设置我的计划</button></div>`:''}
      ${S.dayOffset(state.settings.startDate)<0?`<div class="notice"><p>计划将在 ${esc(state.settings.startDate)} 开始，现在可以先预习。</p></div>`:''}
      ${missed.length?`<div class="notice"><p>还有 ${missed.length} 个学习日可补练。不必赶着追日历，可以从上次没完成的地方继续。</p><a class="btn secondary small" href="${lessonUrl(missed[0])}">继续未完成的练习</a></div>`:''}
      <div class="dashboard"><div class="dashboard-main"><section class="today-hero"><span class="hero-stamp" aria-hidden="true">A little, every day.</span><div class="hero-content"><span class="pill blue">${esc(phase.title)} · ${esc(lesson.content.level)}</span><h2>${esc(lesson.content.title)}</h2><p>${esc(lesson.content.canDo)}</p><div class="hero-meta"><span>${icon('headphones')} 学习日 ${day+1} · ${esc(lesson.title)}</span><span>核心 ${Math.min(25,lesson.minutes)} 分钟</span></div><a class="btn primary" href="${lessonUrl(lesson)}">${done?'回看这次练习':'开始今天的练习'} <span aria-hidden="true">↗</span></a></div><img class="hero-illustration" src="assets/reading.svg" alt="" width="220" height="205"></section>
      <section class="paper week-path"><div class="section-line"><h2>这一周，一点点前进</h2><span class="muted small">${weekDone} / 7 天</span></div>${dayPath(week,day)}<p class="hint">同一主题分七天练习：理解 → 准确 → 表达 → 写作 → 迁移 → 原声材料 → 复习。</p></section>
      <section><div class="section-line"><h2>今天怎么学</h2><span class="small muted">总预算 ${fmtMinutes(lesson.minutes)} · 可分段完成</span></div><div class="today-agenda">${blocks(lesson).map(([title,minutes,detail],i)=>`<div class="agenda-row"><span class="agenda-icon">${icon(['headphones','book','speech'][i])}</span><div><strong>${esc(title)}</strong><p>${esc(detail)}</p></div><span>${minutes} 分钟</span></div>`).join('')}</div></section>
      ${todayLogs.length?`<section class="paper panel-pad" style="margin-top:22px"><h3>今天已经留下的成果</h3>${todayLogs.slice(-3).reverse().map(l=>`<div class="recent-row"><span class="pill gray">${esc(skillNames[l.skill])}</span><p>${esc(l.activity)}</p><span>${l.minutes} 分</span></div>`).join('')}</section>`:''}</div>
      <aside class="rail"><section class="paper rail-card week-goal"><span class="pill">本周学会</span><h3 style="margin-top:15px">${esc(lesson.content.canDo)}</h3><ul>${lesson.content.speaking.checklist.slice(0,3).map(c=>`<li>${esc(c)}</li>`).join('')}</ul><a class="quiet" href="#route">看看完整路线 ↗</a></section>
      <section class="paper rail-card"><h3>把时间，变成投入</h3><div class="stat-line"><strong>${(weekMinutes/60).toFixed(1)}</strong><small>/ ${(state.settings.weeklyMinutes/60).toFixed(1)} 小时 · 本周</small></div><div class="mini-line"><span>本周实际记录</span><span>${Math.round(weekMinutes/state.settings.weeklyMinutes*100)}%</span></div><progress max="${state.settings.weeklyMinutes}" value="${Math.min(weekMinutes,state.settings.weeklyMinutes)}" aria-label="本周实际记录时长"></progress><p class="rail-caption">全年投入预算 ${state.settings.weeklyMinutes*52/60} 小时，已记录 ${(total/60).toFixed(1)} 小时。时长不代表语言等级。</p></section>
      <section class="paper rail-card review-preview"><h3>有些表达，值得再见一次</h3><p>${dueReviews().length?`今天有 ${dueReviews().length} 条表达等你回忆。先自己说，再看答案。`:'遇到想真正会用的词块，点“加入复习”。我们会在后续几天提醒你。'}</p><a class="btn secondary small" href="#review">${dueReviews().length?'开始复习':'打开复习本'}</a></section>
      ${profile==='leo'?'<section class="paper rail-card" id="duolingo-summary"><h3>Duolingo 公开进度</h3><p class="hint">正在读取…</p></section>':''}</aside></div>`;
  }

  function renderRoute() {
    const cw=currentWeek(),phase=course.phases.find(p=>cw>=p.from&&cw<=p.to);
    return titleBlock('有方向，也有自己的节奏。','52个主题，每周七种练法。随时预览、补学或回头复习，课程不会强制锁定。')+`<section class="phase-intro"><div><span class="pill">当前路线 · ${course.learner}</span><h2 style="margin-top:12px">${esc(phase.title)}，第 ${cw} 周</h2><p>${esc(phase.goal)}</p><p>年度投入预算 ${state.settings.weeklyMinutes*52/60} 小时；每周 ${fmtMinutes(state.settings.weeklyMinutes)}。按实际测评调整，不以日历自动认定升级。</p></div><img src="assets/plant.svg" alt="" width="155" height="120"></section>`+
      course.phases.map(p=>`<details class="phase-group" ${p.id===phase.id?'open':''}><summary>${esc(p.title)} <span>第${p.from}–${p.to}周 · ${esc(p.level)}</span></summary><div class="phase-body"><p class="phase-goal">${esc(p.goal)}</p><div class="route-check"><strong>阶段检查</strong><ul>${p.checks.map(c=>`<li>${esc(c)}</li>`).join('')}</ul><button class="quiet" data-action="score">记录独立测评</button></div>${course.weeks.filter(w=>w.phase===p.id).map(w=>{const count=Array.from({length:7},(_,d)=>Boolean(state.completed[E.lessonId(profile,w.week,d)])).filter(Boolean).length;return `<div class="week-row"><span class="week-no">${String(w.week).padStart(2,'0')}</span><div><h3>${esc(w.title)}</h3><p>${esc(w.canDo)}</p></div><div class="week-row-actions"><span class="pill gray">${count}/7</span><button class="btn secondary small" data-action="week-preview" data-week="${w.week}" aria-expanded="false" aria-controls="preview-${w.week}">查看这一周</button></div></div><div class="week-preview" id="preview-${w.week}" hidden><p class="hint">${esc(w.grammar.title)} · ${esc(w.text.title)} · 原创微课与练习${E.mockWeeks[profile].includes(w.week)?' · 含165分钟完整模考':''}</p>${dayPath(w.week,-1)}<p class="hint">${esc(w.reviewTip)}</p></div>`;}).join('')}</div></details>`).join('');
  }

  function renderLesson() {
    const lesson=activeLesson,w=lesson.content,draft=draftFor(lesson),complete=state.completed[lesson.id];
    return `<div class="lesson-top"><a class="back-link" href="#today">← 回到今天</a><div class="source-label"><span class="pill blue">第 ${lesson.week} 周 · 学习日 ${lesson.day+1}</span><span>${esc(lesson.title)}${complete?' · 已完成，可重新练习':''}</span></div><h1>${esc(w.title)}</h1><p>${esc(w.canDo)}</p></div><div class="mobile-focus"><span>专注这一课 <strong data-clock>${clock(elapsedFor(lesson.id))}</strong></span><button class="btn soft small" data-action="timer">${state.timer?.lessonId===lesson.id&&state.timer.startedAt?'暂停专注':'开始专注'}</button></div><div class="lesson-layout"><section class="paper study-paper"><div class="lesson-tabs" role="tablist" aria-label="练习步骤">${[['learn','1 读懂'],['practice','2 练习'],['reflect','3 留下成果']].map(([id,label])=>`<button role="tab" id="tab-${id}" data-action="lesson-tab" data-tab="${id}" aria-selected="${ui.tab===id}" aria-controls="lesson-panel" tabindex="${ui.tab===id?'0':'-1'}">${label}</button>`).join('')}</div><div id="lesson-panel" role="tabpanel" aria-labelledby="tab-${ui.tab}">${lesson.isMock?renderMock(lesson):ui.tab==='learn'?renderLearning(lesson):ui.tab==='practice'?renderPractice(lesson):renderReflection(lesson)}</div><div class="step-controls">${ui.tab!=='learn'?`<button class="btn secondary" data-action="lesson-tab" data-tab="${ui.tab==='practice'?'learn':'practice'}">上一步</button>`:'<span></span>'}${ui.tab!=='reflect'?`<button class="btn soft" data-action="lesson-tab" data-tab="${ui.tab==='learn'?'practice':'reflect'}">${ui.tab==='learn'?'开始练习':'整理成果'} →</button>`:''}</div></section><aside class="lesson-side"><section class="session-card"><span class="pill gray">专注这一课</span><div class="session-clock" data-clock>${clock(elapsedFor(lesson.id))}</div><div class="session-actions"><button class="btn primary" data-action="timer" data-lesson="${lesson.id}">${state.timer?.lessonId===lesson.id&&state.timer.startedAt?'暂停':'开始计时'}</button><button class="btn secondary" data-action="timer-log">保存时长</button></div><p class="hint">前台专注计时。离开页面会暂停；外部学习可补记实际分钟。</p></section><section class="session-card"><h3>今天的完成标准</h3><ul class="goal-list">${completionCriteria(lesson).map(c=>`<li>${esc(c)}</li>`).join('')}</ul><p class="hint">今日总预算 ${fmtMinutes(lesson.minutes)}；核心练习之外，用原声资料和重做巩固。按实际时间记录。</p></section><section class="session-card"><h3>本课补充材料</h3><p class="hint">真实原声与原站练习。站内文本为原创微课，合成朗读不是原声听力测评。</p><div class="inline-resources">${resourceLinks(lesson)}</div></section><section class="session-card save-card"><h3>练完，再留下一个成果</h3><p>草稿自动保存在当前人物空间。完成标记与测验分数分开记录。</p><button class="btn secondary" data-action="lesson-tab" data-tab="reflect">整理并完成本课</button><span class="hint" id="draft-status">${draft.text||draft.note?'已有本地草稿':'编辑后自动保存草稿'}</span></section></aside></div>`;
  }
  function completionCriteria(lesson) {
    if(lesson.isMock)return ['选择考试类型与未练过的完整试卷','严格完成听力、阅读、写作与口语，写说等待可靠评分','记录卷号、各项结果与复盘重点'];
    if(lesson.day===3)return [`独立写 ${lesson.content.writing.minWords}–${lesson.content.writing.maxWords} words`,...lesson.content.writing.checklist];
    if(lesson.day===2||lesson.day===4)return [...lesson.content.speaking.checklist,'保存录音或英文表达稿；纠错后重说'];
    if(lesson.day===6)return ['完成5道已学题复测，记录正确题数','选出最需要继续练的表达','写一个下周可执行的调整'];
    return ['理解本课文本与词块','完成本课练习并查看解析','用自己的语境写出一句表达'];
  }
  function renderLearning(lesson) {
    const w=lesson.content;
    return `<div class="source-label"><span class="pill gray">站内原创微课</span><span>${esc(w.level)} · ${E.wordCount(w.text.body)} words</span></div><h2 class="english-title" lang="en">${esc(w.text.title)}</h2><p class="english-text" lang="en">${esc(w.text.body)}</p><div class="audio-toolbar"><button class="btn soft small" data-action="speak">${icon('headphones')} 朗读这段文字</button><button class="quiet" data-action="stop-speech">停止</button><label class="small muted">速度 <select id="speech-rate" aria-label="朗读速度"><option value="0.8">0.8×</option><option value="1" selected>1.0×</option><option value="1.15">1.15×</option></select></label></div><p class="hint">浏览器合成朗读，声音因设备而异。没有声音时可阅读文本；真实听力用右侧原声资源。</p><div class="inset blue"><h3>${esc(w.grammar.title)}</h3><p class="small">${esc(w.grammar.note)}</p>${w.grammar.examples.map(t=>`<p class="example" lang="en">${esc(t)}</p>`).join('')}</div><div class="section-line"><h3>今天会用的 5 个表达</h3><span class="small muted">先试着说，再加入复习</span></div><div class="chunk-grid">${w.chunks.map((c,i)=>`<div class="chunk-row"><div><strong lang="en">${esc(c.en)}</strong><small>${esc(c.zh)}</small></div><button class="btn lilac small" data-action="add-review" data-chunk="${i}">${state.reviews.some(r=>r.lessonId===lesson.id&&r.phrase===c.en)?'已加入':'加入复习'}</button></div>`).join('')}</div>`;
  }
  function practicePrompt(lesson) {
    const w=lesson.content;
    if(lesson.isMock)return {title:'完整模考的证据',prompt:'记录考试类型、未练过的卷册与Test编号、四项完成情况和复盘重点。写说没有可靠评分时明确填待评。',min:0};
    if(lesson.day===1)return {title:'换成自己的句子',prompt:`使用“${w.grammar.title}”，围绕你的生活或工作写5句。至少用到本课3个词块。`,min:15};
    if(lesson.day===2)return {title:'关掉原文，说给一个人听',prompt:w.speaking.prompt,min:15};
    if(lesson.day===3)return {title:'先自己写，再自己改',prompt:w.writing.prompt,min:w.writing.minWords};
    if(lesson.day===4)return {title:w.workplace.scenario,prompt:`${w.workplace.prompt}\n本次产物：${w.workplace.goal}`,min:20};
    if(lesson.day===5)return {title:'从真实材料带回一个表达',prompt:`打开本课原声材料，完成原站题目。记录课程/片段名、正确题数/总题数、3个听辨问题。再用本周主题“${w.title}”写3句自己的表达。`,min:15};
    if(lesson.day===6)return {title:'给下周的自己一条建议',prompt:`${w.reviewTip}\n写下本周能做到的1件事、还不熟的1个表达和下周的1个动作。`,min:0};
    return {title:'用自己的信息，改写一句',prompt:`从本课选择1个句型，换成你自己的信息。可以从这句开始：${w.grammar.examples[0]}`,min:5};
  }
  function renderPractice(lesson) {
    const w=lesson.content,draft=draftFor(lesson),task=practicePrompt(lesson),graded=ui.graded[lesson.id];
    const qs=lesson.questionIndexes.map(i=>w.quiz[i]);
    return `<div class="section-line"><h2>${esc(task.title)}</h2><span class="pill lilac">输出，才会真的记住</span></div><p style="white-space:pre-line">${esc(task.prompt)}</p>${lesson.day===3&&state.settings.examType==='undecided'&&lesson.week>=17?'<div class="notice"><p>尚未选考试类型。本课先练通用写作；正式 Task 1 请在学习偏好中选择 Academic 或 General Training。</p><button class="quiet" data-action="settings">选择类型</button></div>':''}
      ${lesson.day===2||lesson.day===4?`<div class="inset lilac"><h3>说 ${w.speaking.seconds} 秒，然后再说一次</h3><p class="small">只列关键词，第一次不追求完美。回听后选择一个最影响理解的问题，重说一次。</p><button class="quiet" data-action="coach-prompt">复制本课陪练提示词</button> <a class="quiet" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">打开 ChatGPT ↗</a></div>${recorderHTML(lesson)}`:''}
      <div class="writing-area"><label for="lesson-text">${lesson.day===3?'英文初稿与重写稿':'你的英文表达 / 练习产物'}<span class="word-count" id="word-count">${E.wordCount(draft.text)} words${lesson.day===3?` / 目标 ${w.writing.minWords}–${w.writing.maxWords}`:''}</span></label><textarea id="lesson-text" data-draft="text" maxlength="20000" lang="en" spellcheck="true" placeholder="先写下自己的表达，不用等到完美。">${esc(draft.text)}</textarea><p class="hint" id="draft-status">自动保存在本机。正式写作请保留初稿与重写版本。</p></div>
      ${qs.length?`<section><h3>${lesson.day===6?'本周复习小测':'检验一下理解'}</h3><p class="hint">${lesson.day===6?'这些是本周已经学过的题，只用于复习，不换算英语等级。':'先独立选择，再查看解释。做错不影响练习完成，但要写下纠正。'}</p><form id="quiz-form">${qs.map((q,n)=>`<fieldset class="question"><legend><small>${n+1}</small>${esc(q.question)}</legend>${q.options.map((option,index)=>`<label class="answer-option"><input type="radio" name="${q.id}" value="${index}" data-question="${q.id}" ${draft.answers[q.id]===index?'checked':''}><span lang="en">${esc(option)}</span></label>`).join('')}${graded?`<div class="answer-feedback ${draft.answers[q.id]===q.answer?'':'wrong'}">${draft.answers[q.id]===q.answer?'✓ 回答正确':'再看一下'} · ${esc(q.explanation)}<br>正确答案：${esc(q.options[q.answer])}</div>`:''}</fieldset>`).join('')}<div class="quiz-actions"><button class="btn soft" type="submit">查看答案与解析</button>${graded?`<span class="quiz-result">本次 ${qs.filter(q=>draft.answers[q.id]===q.answer).length}/${qs.length} 题正确 · 练习结果</span>`:''}</div></form></section>`:''}`;
  }
  function renderReflection(lesson) {
    const draft=draftFor(lesson),task=practicePrompt(lesson),qs=lesson.questionIndexes,answered=qs.every(i=>Number.isInteger(draft.answers[lesson.content.quiz[i].id]));
    const score=answered?E.quizScore(lesson.content,draft.answers,qs):null;
    return `<div class="section-line"><h2>让这次练习留下来</h2><span class="pill">最后一步</span></div><p class="muted">完成不是“全对”，而是做过、核对过，也知道下一次怎么练。</p><div class="inset"><h3>本课产物</h3><p class="small">${esc(task.prompt)}</p><p class="hint">已有英文 ${E.wordCount(draft.text)} words${qs.length?` · 已回答 ${qs.filter(i=>Number.isInteger(draft.answers[lesson.content.quiz[i].id])).length}/${qs.length} 题`:''}${score!==null?` · 练习正确率 ${score}%`:''}</p><button class="quiet" data-action="lesson-tab" data-tab="practice">回去补充或修改</button></div><div class="checklist">${completionCriteria(lesson).map((c,i)=>`<label class="check-item"><input type="checkbox" name="reflection-check" value="${i}"><span>${esc(c)}</span></label>`).join('')}</div><div class="writing-area"><label for="lesson-note">这次学会了什么，还有什么要改？</label><textarea id="lesson-note" data-draft="note" maxlength="12000" style="min-height:120px;font:14px/1.8 var(--font)" placeholder="例如：能用 I work on…介绍工作；还会漏掉第三人称-s，下次先复习。">${esc(draft.note)}</textarea></div><form id="finish-form" class="form-grid"><label>本次尚未记录的有效分钟<input name="minutes" type="number" min="0" max="720" step="1" value="${Math.floor(elapsedFor(lesson.id)/60)}"><small>如果已用“保存时长”记录过，请填0。计时只作参考，可以按实际专注调整。</small></label><p id="finish-error" class="error-copy" role="alert"></p><button class="btn primary" type="submit">保存成果，完成这一课 ✓</button></form>`;
  }
  function renderMock(lesson) {
    const draft=draftFor(lesson),type=state.settings.examType,resource=resources.find(r=>r.id===(type==='general'?'ielts-general':'ielts-academic'));
    if(ui.tab==='reflect')return renderReflection(lesson);
    return `<span class="pill lilac">正式考试形式 · 不使用站内微课题代替真题</span><h2 style="margin:20px 0">留出完整的 165 分钟</h2><p>这一天替换常规练习。使用同一考试类型、未练过的完整试卷；官方样题页含零散题型，不能拼成可比较的完整模考。</p><div class="inset blue"><h3>${type==='undecided'?'先选择考试类型':type==='general'?'General Training · 培训类':'Academic · 学术类'}</h3><p class="small">听力约30分钟、阅读60分钟、写作60分钟、口语11–14分钟。纸笔形式另按考试要求安排听力誊写；口语可另约。复盘用次日时间，先保留未批改的写作和录音。</p>${type==='undecided'?'<button class="quiet" data-action="settings">设置考试类型</button>':`<a class="quiet" href="${resource.url}" target="_blank" rel="noopener noreferrer">查看对应官方样题 ↗</a>`}</div><ol><li>先填试卷来源与 Test 编号，确保未用于日常练习。</li><li>关闭词典、字幕和辅助工具，按各科时间独立完成。</li><li>听读按答案核分；写说未获可靠评分时填“待评”，不要用AI估分冒充正式结果。</li><li>在成长记录中记录四项成绩、评分来源与最重要的改进。</li></ol><div class="writing-area"><label for="lesson-text">试卷编号、完成结果与复盘依据</label><textarea id="lesson-text" data-draft="text" maxlength="20000" style="min-height:160px;font:14px/1.8 var(--font)" placeholder="例如：Cambridge IELTS __ / Academic / Test __，未做过。L __/40，R __/40；W/S待教师评分。">${esc(draft.text)}</textarea></div><button class="btn secondary" data-action="score">记录四项测评</button>`;
  }
  function renderComplete() {
    const lesson=activeLesson,done=state.completed[lesson.id],next=nextLesson(lesson);
    return `<section class="paper completion"><img src="assets/plant.svg" alt="" width="230" height="170"><p class="pill">${done?'这次练习，留下来了':'还可以继续练习'}</p><h1>一点练习，<br>多了一点会用的英语。</h1><p>${esc(lesson.content.canDo)}</p><div class="inset"><strong>${done?`本次记录 ${done.minutes} 分钟${done.score!==null?` · 练习正确率 ${done.score}%`:''}`:'尚未保存成果'}</strong><p class="hint">${esc(done?.evidence||'回到练习完成并保存。')}</p></div><div class="page-actions"><a class="btn primary" href="#today">回到学习桌</a>${next?`<a class="btn secondary" href="${lessonUrl(next)}">预览下一课</a>`:'<a class="btn secondary" href="#growth">看看这一年的成果</a>'}</div></section>`;
  }

  function filteredMaterials() {
    const ids=new Set(lessonResources(getLesson(currentWeek(),0)).map(r=>r.id));
    const library=[...resources,...state.materials.map(r=>({...r,cost:'自定义',level:'我的材料',custom:true}))];
    return library.filter(r=>(ui.filter==='全部'||ui.filter==='本周'&&(ids.has(r.id)||r.custom)||ui.filter==='我的材料'&&r.custom||r.category===ui.filter)&&`${r.name} ${r.note} ${r.level} ${r.category}`.toLowerCase().includes(ui.query.toLowerCase()));
  }
  function libraryCards() {
    const items=filteredMaterials();
    return `<p class="hint" role="status">找到 ${items.length} 项资源${ui.filter==='本周'?' · 与本周课程有关的补充资料':''}</p><div class="resource-grid">${items.map(r=>`<article class="resource-card"><div class="resource-head"><span class="resource-symbol">${icon(r.category==='听力'?'headphones':r.category==='口语'?'speech':'book')}</span><span class="pill gray">${esc(r.level)} · ${esc(r.category)}</span></div><h2>${esc(r.name)}</h2><p>${esc(r.note)}</p><span class="small muted">${esc(r.cost)}</span><div class="page-actions"><a class="btn soft small" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">打开原站 ↗</a><button class="quiet" data-action="resource-log" data-id="${r.id}">记录这次练习</button>${r.custom?`<button class="quiet danger" data-action="remove-material" data-id="${r.id}">移除</button>`:''}</div></article>`).join('')}</div>${!items.length?'<div class="empty"><h3>还没有找到这份材料</h3><p>换一个关键词，或者添加你已经在使用的资料。</p><button class="btn secondary" data-action="add-material">添加自己的材料</button></div>':''}`;
  }
  function renderLibrary() {
    return titleBlock('好材料，不必到处找。','站内微课可以直接学；这里放真实原声、官方练习和你自己的资料。',`<button class="btn primary" data-action="add-material">＋ 添加材料</button>`)+`<div class="search-row"><label class="search-field"><span class="sr-only">搜索材料</span><input type="search" id="material-search" value="${esc(ui.query)}" placeholder="搜索课程、技能或平台"></label><button class="btn secondary" data-action="study-guide">不知道怎么选？</button></div><div class="filter-row" aria-label="材料分类">${['本周','全部','听力','口语','阅读','写作','词汇','职场','考试','影视','我的材料'].map(f=>`<button data-action="library-filter" data-filter="${f}" aria-pressed="${ui.filter===f}">${f}</button>`).join('')}</div><div id="resource-list">${libraryCards()}</div><p class="hint">外部资源保留原站版权。课程目录会明确标注，不把目录页当作某一课；打不开时仍可继续站内原创微课。</p>`;
  }
  function renderReview() {
    const due=dueReviews(),unique=[...new Map(due.map(r=>[`${r.lessonId}:${r.phrase}`,r])).values()];
    return titleBlock('记住的，慢慢变成会用的。','先遮住释义，试着说出一个自己的句子。加入的词块会在第1、3、7天回来。')+`<div class="review-tools"><span class="pill lilac">今天 ${unique.length} 条 · 待复习 ${state.reviews.filter(r=>!r.done).length} 次</span><button class="btn secondary small" data-action="add-review-manual">＋ 记一个自己的表达</button></div>${unique.length?unique.slice(0,10).map(r=>`<article class="review-card"><span class="small muted">到期 ${esc(r.due)} · ${r.lessonId?esc(r.lessonId.split('-').slice(1).join(' ')):'我的表达'}</span><p class="review-phrase" lang="en">${esc(r.phrase)}</p>${ui.reveal[r.id]?`<p class="review-meaning">${esc(r.meaning)}</p><p class="hint">能脱离原句说出自己的例句，才选“记住了”；只是眼熟，可以再练一次。</p><div class="page-actions"><button class="btn primary" data-action="review-done" data-id="${r.id}">能用自己的句子说出来</button><button class="btn secondary" data-action="review-again" data-id="${r.id}">还不熟，明天再来</button></div>`:`<p class="hint">先回忆意思，再说一个生活或工作里的例句。</p><button class="btn soft" data-action="review-reveal" data-id="${r.id}">看看释义</button>`}</article>`).join(''):`<div class="paper empty"><img src="assets/plant.svg" alt="" width="190" height="130"><h3>今天的复习本，还很轻。</h3><p>${state.reviews.length?'到期的表达都复习过了。其余会在安排好的日期回来。':'打开一课，把想真正会用的词块加入复习。'}</p><a class="btn primary" href="#today">回到今天的练习</a></div>`}${unique.length>10?'<p class="hint">先练这10条，完成后会继续显示剩余内容。</p>':''}`;
  }
  function renderGrowth() {
    const logs=[...state.logs].sort((a,b)=>b.date.localeCompare(a.date)),total=logs.reduce((n,l)=>n+l.minutes,0);
    const dates=new Set(logs.map(l=>l.date)),ielts=[...state.scores].reverse().find(s=>s.type.startsWith('IELTS'));
    const pageCount=Math.max(1,Math.ceil(logs.length/8));ui.historyPage=Math.min(ui.historyPage,pageCount);
    const recent28=logs.filter(l=>S.dayOffset(l.date)>=0&&S.dayOffset(l.date)<28),weekTotal=recent28.reduce((n,l)=>n+l.minutes,0);
    return titleBlock('进步，应该有迹可循。','看你练了什么、哪里变好了，以及下一步该练什么。',`<button class="btn primary" data-action="manual-log">＋ 记录练习</button><button class="btn secondary" data-action="score">记录测评</button>`)+
      `<div class="stats-grid"><article class="stat-box"><small>累计有效投入</small><strong>${(total/60).toFixed(1)}<em>小时</em></strong></article><article class="stat-box"><small>有记录的学习日</small><strong>${dates.size}<em>天</em></strong></article><article class="stat-box"><small>完成的课程</small><strong>${Object.keys(state.completed).length}<em>课</em></strong></article><article class="stat-box"><small>最近 IELTS · ${ielts?esc(ielts.source):'尚未测评'}</small><strong>${ielts?esc(ielts.total):'—'}</strong></article></div>
      <div class="growth-grid"><section class="paper growth-panel"><div class="section-line"><h2>最近四周，时间花在哪？</h2><span class="small muted">${weekTotal} 分钟</span></div>${Object.entries(skillNames).map(([skill,name])=>{const min=recent28.filter(l=>l.skill===skill).reduce((n,l)=>n+l.minutes,0);return `<div class="skill-row"><span>${name.slice(0,2)}</span><div class="skill-bar"><span style="width:${weekTotal?min/weekTotal*100:0}%"></span></div><span>${min}分</span></div>`;}).join('')}<p class="hint">这是投入分布，不是能力雷达。口语训练分钟包含准备与反馈，不冒充实际开口分钟。</p></section><section class="paper growth-panel"><div class="section-line"><h2>独立测评</h2><button class="quiet" data-action="score">＋ 添加</button></div>${state.scores.length?[...state.scores].reverse().slice(0,4).map(s=>`<article class="assessment-row"><span class="small muted">${esc(s.date)} · ${esc(s.source||'旧版记录')}</span><p><strong>${esc(s.type)} ${esc(s.total)}</strong></p><p>${esc(s.detail)}</p><p>${esc(s.note)}</p></article>`).join(''):'<p class="hint">尚无独立测评记录。不要用站内练习正确率推算雅思分。记录未练过的题、四项结果和评分来源，才能比较。</p>'}<a class="quiet" href="#settings">更新四项基线 ↗</a></section></div>
      <section class="paper growth-panel"><div class="section-line"><h2>每次练习，都有一个成果</h2><button class="quiet" data-action="export">导出备份</button></div>${logs.length?logs.slice((ui.historyPage-1)*8,ui.historyPage*8).map(l=>`<article class="log-row"><time>${esc(l.date.slice(5))}</time><div><strong>${esc(l.activity)}</strong><p>${esc(l.evidence)}</p>${l.note?`<p>下次：${esc(l.note)}</p>`:''}${l.lessonId?`<a class="quiet" href="${urlForId(l.lessonId)}">回看课程</a>`:''}</div><span>${esc(skillNames[l.skill])} · ${l.minutes}分</span></article>`).join(''):'<div class="empty"><h3>先留下第一笔真实练习。</h3><p>学了哪一课、投入多少时间、完成什么成果，比一个勾更有用。</p><a class="btn soft" href="#today">开始今天的练习</a></div>'}${logs.length>8?`<div class="pagination"><span>第 ${ui.historyPage} / ${pageCount} 页 · ${logs.length} 条</span><div class="page-actions"><button class="btn secondary small" data-action="history-page" data-page="${ui.historyPage-1}" ${ui.historyPage===1?'disabled':''}>上一页</button><button class="btn secondary small" data-action="history-page" data-page="${ui.historyPage+1}" ${ui.historyPage===pageCount?'disabled':''}>下一页</button></div></div>`:''}</section>`;
  }
  function urlForId(id) {const m=id.match(/^(leo|nico)-w(\d{2})-d(\d{2})$/);return m&&m[1]===profile?`#lesson/${Number(m[2])}/${Number(m[3])}`:'#growth';}
  function renderSettings() {
    const s=state.settings;
    return titleBlock('让计划，适合现在的你。','目标可以有挑战，安排需要诚实。调整日历和预算不会删除已保存的成果。')+`<div class="settings-layout"><div><section class="paper settings-panel"><h2>学习节奏与目标</h2><form id="settings-form" class="form-grid two"><label>计划开始日<input name="startDate" type="date" value="${s.startDate}" required><small>从这天算第1周；预览其他周不会改变学习日历。</small></label><label>每周时间预算<select name="weeklyMinutes">${[[300,'5小时 · 轻量'],[540,'9小时 · 稳步'],[750,'12.5小时 · 标准'],[900,'15小时 · 集中']].map(([v,t])=>`<option value="${v}" ${s.weeklyMinutes===v?'selected':''}>${t}</option>`).join('')}${![300,540,750,900].includes(s.weeklyMinutes)?`<option value="${s.weeklyMinutes}" selected>${s.weeklyMinutes}分钟 · 已导入</option>`:''}</select><small>全年预算按每周×52计算；并非达标保证。</small></label><label class="form-span">IELTS 考试类型<select name="examType"><option value="undecided" ${s.examType==='undecided'?'selected':''}>尚未确定 · 先练通用能力</option><option value="academic" ${s.examType==='academic'?'selected':''}>Academic · 学术类</option><option value="general" ${s.examType==='general'?'selected':''}>General Training · 培训类</option></select><small>选择后，模考资源按对应类型展示。Task 1 图表与书信不能混为同一种训练。</small></label><div class="form-span inset blue"><h3>先看看现在，不必证明自己。</h3><p class="small">${esc(course.baselineLabel)}。你可以记分数，也可以写“初次听录音，8题对5题”。没有测过就留空。</p><p class="hint">建议用未练过的官方材料；写作和口语尽量有教师或可靠评分。不能完成某项也是有效诊断。</p></div>${Object.entries({listening:'听力',reading:'阅读',writing:'写作',speaking:'口语'}).map(([k,n])=>`<label>${n}基线<input name="baseline-${k}" maxlength="240" value="${esc(s.baseline[k])}" placeholder="未测评，或填写测评来源与结果"></label>`).join('')}<p id="settings-error" class="error-copy form-span" role="alert"></p><button class="btn primary form-span" type="submit">保存我的安排</button></form></section><section class="paper settings-panel"><h2>从合适的地方开始</h2><p class="hint">如果已有可靠基线，可以把某周设为当前周。其余内容仍可预览，不会伪造已完成进度。</p><form id="start-week-form" class="form-grid"><label>当前学习周<select name="week">${course.weeks.map(w=>`<option value="${w.week}" ${w.week===currentWeek()?'selected':''}>第${w.week}周 · ${esc(w.title)}</option>`).join('')}</select></label><button class="btn secondary" type="submit">调整当前周</button></form></section></div><div><section class="paper settings-panel"><h2>你的记录，留在你手里</h2><p class="hint">数据存在当前浏览器，不会自动同步到其他设备。清理浏览器、换域名或换设备前，请导出备份。</p><div class="data-actions"><button class="btn primary" data-action="export">导出 ${course.learner} 的备份</button><button class="btn secondary" type="button" data-action="import">导入备份</button><input type="file" id="backup-file" accept="application/json,.json" hidden></div><p class="hint">JSON 包含课程草稿、练习、成绩、复习和自定义材料。录音保存在本机音频库，需单独下载，不包含在JSON中。</p><div class="data-actions"><button class="quiet" data-action="restore-snapshot">恢复上次替换前的数据</button><button class="quiet danger" data-action="reset">重置当前人物数据</button></div>${Object.values(state.legacy).some(v=>Array.isArray(v)?v.length:Object.keys(v).length)?`<details class="archive"><summary>查看保留的旧版记录</summary><p>旧版时长与成绩已迁入记录；旧任务语义不同，不计入新课程完成。</p><pre>${esc(JSON.stringify(state.legacy,null,2))}</pre></details>`:''}</section><section class="paper settings-panel"><h2>这套系统，怎样帮助你？</h2><ul class="hint"><li>52周主题有原创微课、词块、练习和输出目标。</li><li>每天练的是同一主题的不同能力；不用每天重新选材料。</li><li>站内测验只检查所学，不提供雅思认证或自动判定CEFR升级。</li><li>正式提分依靠独立听读测评与可靠写说评分。</li><li>每4周根据结果决定补学，不要求赶进度。</li></ul><button class="quiet" data-action="help">查看完整使用方法</button></section></div></div>`;
  }

  function modal(title, html) {$('#dialog-title').textContent=title;$('#dialog-body').innerHTML=html;if(!$('#dialog').open)$('#dialog').showModal();document.body.classList.add('dialog-open');}
  function closeModal() {$('#dialog').close();document.body.classList.remove('dialog-open');}
  function help() {modal('每天怎么练，更容易坚持？',`<p><strong>先理解，再输出，最后留下成果。</strong> “今天”会给你当前周的一课；点开后读懂材料、完成练习，再保存自己的表达和实际分钟。</p><ol class="hint"><li>先用25分钟完成站内核心。预算较多时，按今日安排继续原声材料与迁移输出，可分段做。</li><li>听力和阅读有明确问题与解析；口语录音、写作初稿由你自己完成。复制提示词可以用AI陪练，正式评分快照要注明来源。</li><li>词块点“加入复习”，在第1、3、7天主动回忆。不会的表达明天再来。</li><li>每周末复盘，每4周用新材料复测。学时和完成率是投入，不是能力证明。</li><li>忙碌时可以只做核心并记录实际时间。回来补学不会丢记录。</li></ol><p>Leo和Nico的内容与记录独立。站内无需登录；备份需要你定期导出。麦克风只有点“开始录音”时才申请使用。</p><div class="page-actions"><button class="btn primary" data-action="close-modal">明白了，开始练习</button></div>`);}
  function manualLog(resource=null) {
    modal(resource?'记下这次外部练习':'记录一次真实练习',`<form id="manual-log-form" class="form-grid two"><label>日期<input name="date" type="date" value="${S.dateKey()}" required></label><label>有效分钟<input name="minutes" type="number" min="1" max="720" value="25" required></label><label>训练技能<select name="skill">${Object.entries(skillNames).map(([v,n])=>`<option value="${v}">${n}</option>`).join('')}</select></label><label>所属学习周<input name="week" type="number" min="0" max="52" value="${currentWeek()}" required></label><label class="form-span">具体课程 / 任务<input name="activity" maxlength="240" value="${esc(resource?.name||'')}" placeholder="例如：VOA Lesson 2 Conversation" required></label><label class="form-span">可核对的成果<textarea name="evidence" maxlength="12000" placeholder="例如：听力原站Task 1答对6/8；复述覆盖4个信息点。" required></textarea></label><label class="form-span">下次重点<input name="note" maxlength="1000" placeholder="例如：重听数字和日期；先不看文本。"></label><p id="form-error" class="error-copy form-span" role="alert"></p><button class="btn primary form-span" type="submit">保存练习</button></form>`);
  }
  function scoreDialog() {
    modal('记录测评，不猜测能力',`<p class="hint">练习正确率、Anki回顾率和IELTS成绩分开记录。写说还没批改时请留空，总分会显示“待评”。</p><form id="score-form" class="form-grid two"><label>日期<input type="date" name="date" value="${S.dateKey()}" required></label><label>测评类型<select id="score-type" name="type"><option>IELTS 模考</option><option>IELTS 正式考试</option><option>${profile==='nico'?'Anki 回顾':'Duolingo 课程分数'}</option><option>阶段能力检查</option></select></label><div id="ielts-fields" class="form-span form-grid two">${['L','R','W','S'].map((n,i)=>`<label>${['听力','阅读','写作','口语'][i]} Band<input name="${n}" type="number" min="0" max="9" step="0.5" placeholder="待评分"></label>`).join('')}</div><label id="other-score" class="form-span" hidden>成绩或检查结果<input name="total" maxlength="100" placeholder="Anki填百分比；课程分数填App显示值"></label><label>评分来源<select name="source" required><option value="" selected disabled>请选择实际评分来源</option><option value="教师评分">教师评分</option><option value="正式成绩单">正式成绩单</option><option value="自测/自评">自测 / 自评</option><option value="AI练习反馈">AI练习反馈（非正式）</option></select></label><label>卷册 / 题目 / 日期<input name="detail" maxlength="2000" placeholder="例如：Academic / Book __ Test __，未练过" required></label><label class="form-span">下阶段的具体动作<input name="note" maxlength="1000" placeholder="例如：冠词错3次；下周加练Task 1概述。"></label><p id="form-error" class="error-copy form-span" role="alert"></p><button class="btn primary form-span" type="submit">保存测评</button></form>`);
  }
  function materialDialog() {modal('添加自己的好材料',`<form id="material-form" class="form-grid"><label>材料名称<input name="name" maxlength="200" required placeholder="具体课名，而不只是网站名称"></label><label>原始链接<input name="url" type="url" maxlength="2000" required placeholder="https://…"></label><label>训练类型<select name="category">${['听力','口语','阅读','写作','词汇','职场','考试','影视'].map(v=>`<option>${v}</option>`).join('')}</select></label><label>怎么学 / 具体片段<textarea name="note" maxlength="4000" placeholder="例如：季集与时间段、阅读章节、先听再做哪几题。" required></textarea></label><p id="form-error" class="error-copy" role="alert"></p><button class="btn primary" type="submit">加入材料库</button></form>`);}

  function clock(seconds) {const n=Math.max(0,Math.floor(seconds));return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;}
  function elapsedFor(id) {const t=state.timer;if(!t||t.lessonId!==id)return 0;return Math.min(43200,t.elapsed+(t.startedAt?(Date.now()-t.startedAt)/1000:0));}
  function pauseTimer() {if(state.timer?.startedAt){const next=copy(state);next.timer.elapsed=elapsedFor(next.timer.lessonId);next.timer.startedAt=null;commit(next);}}
  function toggleTimer(lesson) {
    if(state.timer&&state.timer.lessonId!==lesson.id&&elapsedFor(state.timer.lessonId)>0){toast('先保存上一课的计时，再开始这一课');return;}
    const next=copy(state);
    if(!next.timer||next.timer.lessonId!==lesson.id)next.timer={lessonId:lesson.id,startedAt:null,elapsed:0,mode:'focus'};
    if(next.timer.startedAt){next.timer.elapsed=elapsedFor(lesson.id);next.timer.startedAt=null;}else next.timer.startedAt=Date.now();
    if(commit(next)){renderTimer();if(page==='lesson')render();}
  }
  function renderTimer() {
    const t=state.timer,dock=$('#timer-dock');dock.hidden=!t;
    if(!t)return;
    dock.innerHTML=`<a href="${urlForId(t.lessonId)}">${esc(t.lessonId.split('-').slice(1).join(' '))} · 专注计时</a><strong data-dock-clock>${clock(elapsedFor(t.lessonId))}</strong><button class="quiet" data-action="timer-pause">${t.startedAt?'暂停':'继续'}</button><button class="quiet" data-action="timer-log">保存</button><button class="quiet" data-action="timer-discard" aria-label="放弃尚未保存的计时">×</button>`;
    document.querySelectorAll('[data-clock]').forEach(el=>{el.textContent=clock(elapsedFor(activeLesson?.id));});
  }
  function saveTimerDialog() {
    const t=state.timer;if(!t){toast('先开始一次计时，或在成长记录中补记练习');return;}
    pauseTimer();const match=t.lessonId.match(/-w(\d+)-d(\d+)/),lesson=match?getLesson(Number(match[1]),Number(match[2])-1):null;
    const seconds=elapsedFor(t.lessonId);modal('把时间连同成果保存',`<p class="hint">${esc(lesson?`${lesson.content.title} · ${lesson.title}`:t.lessonId)}。只记录实际专注部分；当前计时 ${clock(seconds)}。</p><form id="timer-save-form" class="form-grid"><input type="hidden" name="lessonId" value="${esc(t.lessonId)}"><label>有效分钟<input name="minutes" type="number" min="1" max="720" value="${Math.max(1,Math.floor(seconds/60))}" required></label><label>这段时间完成了什么？<textarea name="evidence" maxlength="12000" required placeholder="例如：理解了原文，2题对1题；发现from和for听辨混淆。"></textarea></label><p id="form-error" class="error-copy" role="alert"></p><button class="btn primary" type="submit">保存时长与成果</button></form>`);
  }

  let audioDB;
  function getAudioDB() {
    if(!audioDB)audioDB=new Promise((resolve,reject)=>{const request=indexedDB.open('english-studio-audio',1);request.onupgradeneeded=()=>request.result.createObjectStore('clips');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(Error('无法访问本地音频库'));});
    return audioDB;
  }
  async function audioItem(id,value) {const db=await getAudioDB();return new Promise((resolve,reject)=>{const tx=db.transaction('clips',value?'readwrite':'readonly'),store=tx.objectStore('clips'),request=value?store.put(value,id):store.get(id);let result;request.onsuccess=()=>{result=request.result;};tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(Error('音频保存失败，请下载保留'));});}
  function recorderHTML(lesson) {return `<section class="recorder"><h3>给自己的声音留一个版本</h3><p class="hint">录音只保存在本机。可回听、下载；不会上传或自动评分。再次录音会保留上一段为下载入口，确认后再替换。</p><div class="audio-toolbar"><button class="btn lilac small" data-action="record-audio">${recorder?.state==='recording'?'停止并保存':'开始录音'}</button><span class="rec-status" id="rec-status">建议 ${lesson.content.speaking.seconds} 秒</span></div><div id="audio-preview"></div></section>`;}
  async function loadAudio(id) {
    if(!$('#audio-preview'))return;
    try {const clip=await audioItem(id);if(!clip||activeLesson?.id!==id||!$('#audio-preview'))return;const url=URL.createObjectURL(clip.blob);const el=$('#audio-preview');if(el.dataset.url)URL.revokeObjectURL(el.dataset.url);el.dataset.url=url;el.innerHTML=`<audio controls src="${url}"></audio><a class="quiet" href="${url}" download="${id}.${clip.blob.type.includes('mp4')?'m4a':'webm'}">下载录音 · ${Math.round(clip.seconds)}秒</a><p class="hint">保存于 ${esc(clip.date)}。JSON备份不含录音，请单独下载。</p>`;}catch{if($('#rec-status'))$('#rec-status').textContent='本地音频库不可用，可使用设备录音工具，文字草稿仍可保存。';}
  }
  async function toggleRecording() {
    if(recorder?.state==='recording'){recorder.stop();return;}
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){toast('当前浏览器不支持站内录音，请使用设备录音工具');return;}
    if($('#audio-preview audio')){modal('保留上一版录音',`<p>本课已有录音。请先下载上一版，再选择重新录音；新录音保存后会替换本课音频。</p><button class="btn secondary" data-action="close-modal">返回下载</button><button class="btn primary" data-action="record-replace">已保留，重新录音</button>`);return;}
    await startRecording();
  }
  async function startRecording() {
    const owner=activeLesson?.id,ownerProfile=profile;if(!owner||recordingPending||recorder?.state==='recording')return;
    recordingPending=true;let stream;
    try {stream=await navigator.mediaDevices.getUserMedia({audio:true});if(activeLesson?.id!==owner||profile!==ownerProfile||page!=='lesson'||ui.tab!=='practice'||document.hidden||!$('#rec-status')){stream.getTracks().forEach(t=>t.stop());return;}
      recorder=new MediaRecorder(stream);const chunks=[],started=Date.now(),currentRecorder=recorder;
      currentRecorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
      currentRecorder.onstop=async()=>{const clip={blob:new Blob(chunks,{type:currentRecorder.mimeType||'audio/webm'}),seconds:(Date.now()-started)/1000,date:S.dateKey()};stream.getTracks().forEach(t=>t.stop());try{await audioItem(owner,clip);toast('录音已保存在本机');if(activeLesson?.id===owner&&page==='lesson'){render();}}catch(error){const url=URL.createObjectURL(clip.blob);modal('录音需要下载保留',`<p>${esc(error.message)}</p><a class="btn primary" href="${url}" download="${owner}.webm">下载这段录音</a>`);}};
      recorder.start();$('#rec-status').textContent='录音中…说完后点停止。';const button=document.querySelector('[data-action="record-audio"]');if(button)button.textContent='停止并保存';
    }catch(error){stream?.getTracks().forEach(t=>t.stop());toast(error.name==='NotAllowedError'?'未获得麦克风权限。仍可写下表达稿，或使用设备录音工具。':'无法开始录音，请检查麦克风。');}
    finally{recordingPending=false;}
  }

  function downloadJSON(value,name) {const blob=new Blob([typeof value==='string'?value:JSON.stringify(value,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function exportBackup() {try{downloadJSON(S.exportData(state),`english-studio-${profile}-${S.dateKey()}.json`);toast('备份已导出；录音请另行下载');}catch(error){toast(error.message);}}
  function preserveSnapshot() {const raw=localStorage.getItem(S.key(profile));if(raw!==null)localStorage.setItem(`${S.key(profile)}:before-replace`,raw);}
  function importCandidate(candidate) {try{preserveSnapshot();state=S.save(candidate);storageError='';closeModal();render();toast('备份已恢复，替换前的数据也保留了本机快照');}catch(error){$('#form-error').textContent=error.message;}}
  async function importFile(file) {
    if(!file)return;if(file.size>5*1024*1024){toast('备份超过5MB，请选择本站导出的JSON');return;}
    try {const raw=await file.text(),data=JSON.parse(raw);let candidate;
      if(data.version===2)candidate=S.importData(data,profile);
      modal(data.version===2?'确认恢复这份备份':`确认旧版备份属于 ${course.learner}`,`<p>${data.version===2?`这份备份属于 ${course.learner}，有 ${candidate.logs.length} 条练习、${Object.keys(candidate.completed).length} 课成果。`:`旧版文件缺少可靠人物标识。请确认这是 ${course.learner} 的备份；旧任务保留为档案，不会冒充新版课程完成。`}</p><p>导入会替换当前人物空间。替换前会保留一份本机快照，也建议先下载当前备份。</p><div class="page-actions"><button class="btn secondary" data-action="export">先导出当前备份</button><button class="btn primary" id="confirm-import">${data.version===2?'确认替换':'这是我的旧版备份，继续'}</button></div><p id="form-error" class="error-copy" role="alert"></p>`);
      $('#confirm-import').onclick=()=>{try{candidate=candidate||S.importLegacy(data,profile);importCandidate(candidate);}catch(error){$('#form-error').textContent=error.message;}};
    }catch(error){toast(`没有导入：${error.message}`);}
  }
  async function loadDuolingo() {try{const response=await fetch('duolingo-data.json',{cache:'no-cache'});if(!response.ok)throw Error();const d=await response.json();if(profile!=='leo'||!$('#duolingo-summary'))return;const at=new Date(d.syncedAt);$('#duolingo-summary').innerHTML=`<h3>Duolingo · @${esc(d.username)}</h3><div class="stat-line"><strong>${Number.isFinite(d.streak)?d.streak:'—'}</strong><small>天连续学习</small></div><p class="rail-caption">${Number.isNaN(at.getTime())?'同步时间未知':`快照 ${dateText(at)}`} · 非官方公开资料<br>XP与课程进度不用于判断能力等级。</p>`;}catch{if($('#duolingo-summary'))$('#duolingo-summary').innerHTML='<h3>Duolingo 进度暂不可用</h3><p class="hint">不影响本站课程；可在成长记录里手动记录课程分数。</p>';}}

  const actions={
    'profile-toggle':()=>setProfileMenuOpen($('#profile-menu').hidden,true),
    'switch-profile':el=>switchProfile(el.dataset.profile),
    settings:()=>{closeModal();location.hash='settings';},help, 'study-guide':help,'close-modal':closeModal,
    'lesson-tab':el=>{if(recorder?.state==='recording')recorder.stop();ui.tab=el.dataset.tab;render();$('#lesson-panel')?.scrollIntoView({block:'start'});$('#lesson-panel')?.setAttribute('tabindex','-1');$('#lesson-panel')?.focus({preventScroll:true});},
    'week-preview':el=>{const target=$(`#preview-${el.dataset.week}`),open=target.hidden;target.hidden=!open;el.setAttribute('aria-expanded',String(open));el.textContent=open?'收起':'查看这一周';},
    'library-filter':el=>{ui.filter=el.dataset.filter;render();},
    'add-material':materialDialog,'manual-log':()=>manualLog(),score:scoreDialog,
    'resource-log':el=>manualLog([...resources,...state.materials].find(r=>r.id===el.dataset.id)),
    'remove-material':el=>{const item=state.materials.find(r=>r.id===el.dataset.id);if(!item)return;modal('移除这份材料？',`<p>${esc(item.name)} 会从材料库移除，历史练习记录仍然保留。</p><button class="btn secondary" data-action="close-modal">取消</button><button class="btn primary" id="confirm-remove">确认移除</button>`);$('#confirm-remove').onclick=()=>{const next=copy(state);next.materials=next.materials.filter(r=>r.id!==item.id);if(commit(next)){closeModal();render();toast('材料已移除');}};},
    'history-page':el=>{ui.historyPage=Number(el.dataset.page);render();$('#content').scrollIntoView({block:'start'});},
    'add-review':el=>{const c=activeLesson.content.chunks[Number(el.dataset.chunk)];queueReview(c.en,c.zh,activeLesson.id);},
    'add-review-manual':()=>modal('记一个想会用的表达',`<form id="review-form" class="form-grid"><label>英文词块或句子<input name="phrase" maxlength="1000" required></label><label>释义 / 自己的使用场景<textarea name="meaning" maxlength="2000" required></textarea></label><button class="btn primary" type="submit">加入第1、3、7天复习</button></form>`),
    'review-reveal':el=>{ui.reveal[el.dataset.id]=true;render();},
    'review-done':el=>{const r=state.reviews.find(r=>r.id===el.dataset.id),next=copy(state);if(!r)return;next.reviews=next.reviews.map(item=>item.lessonId===r.lessonId&&item.phrase===r.phrase&&item.due<=S.dateKey()?{...item,done:true}:item);if(commit(next)){render();toast('这次回忆已完成，后续复习仍会按时回来');}},
    'review-again':el=>{const next=copy(state),r=next.reviews.find(r=>r.id===el.dataset.id);if(!r)return;next.reviews=next.reviews.map(item=>item.lessonId===r.lessonId&&item.phrase===r.phrase&&item.due<=S.dateKey()?{...item,due:addDays(S.dateKey(),1)}:item);if(commit(next)){render();toast('已安排明天再练');}},
    speak:()=>{if(!window.speechSynthesis){toast('当前设备不支持朗读，可以阅读文本或打开原声材料');return;}speechSynthesis.cancel();const speech=new SpeechSynthesisUtterance(activeLesson.content.text.body);speech.lang='en-US';speech.rate=Number($('#speech-rate')?.value||1);const voice=speechSynthesis.getVoices().find(v=>v.lang==='en-US')||speechSynthesis.getVoices().find(v=>v.lang.startsWith('en'));if(voice)speech.voice=voice;speech.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))toast('朗读未能播放，请使用文本或右侧原声材料');};speechSynthesis.speak(speech);},
    'stop-speech':()=>window.speechSynthesis?.cancel(),
    'coach-prompt':async()=>{const w=activeLesson.content,prompt=`You are my English practice partner. My lesson is "${w.title}" (${w.level}). Task: ${w.speaking.prompt} Workplace scenario: ${w.workplace.prompt} Ask one question at a time and wait for my reply. After five turns, explain the three most important issues in Chinese, then ask me to repeat my answer. Do not invent an IELTS band or claim to certify my level.`;try{await navigator.clipboard.writeText(prompt);toast('本课提示词已复制；打开陪练后粘贴即可');}catch{modal('复制本课提示词',`<textarea readonly style="width:100%;height:240px">${esc(prompt)}</textarea>`);}},
    timer:()=>toggleTimer(activeLesson),'timer-pause':()=>{if(!state.timer)return;const match=state.timer.lessonId.match(/-w(\d+)-d(\d+)/);if(match)toggleTimer(getLesson(Number(match[1]),Number(match[2])-1));},'timer-log':saveTimerDialog,
    'timer-discard':()=>{modal('放弃这段未保存的计时？','<p>这只会清除当前计时，不会删除已经保存的练习。</p><button class="btn secondary" data-action="close-modal">保留</button><button class="btn primary" id="confirm-discard">放弃当前计时</button>');$('#confirm-discard').onclick=()=>{const next=copy(state);next.timer=null;if(commit(next)){closeModal();render();toast('未保存的计时已清除');}};},
    'record-audio':toggleRecording,'record-replace':()=>{closeModal();startRecording();},
    import:()=>$('#backup-file').click(),export:exportBackup,'raw-export':()=>{const oldKey=profile==='leo'?'learning-workspace:leo-english-year-one:v1':'learning-workspace:nico-english-2026:v1';downloadJSON(localStorage.getItem(S.key(profile))||localStorage.getItem(oldKey)||'{}',`english-studio-${profile}-raw.json`);},
    'restore-snapshot':()=>{const raw=localStorage.getItem(`${S.key(profile)}:before-replace`);if(!raw){toast('还没有替换前快照');return;}try{const candidate=S.importData(raw,profile);modal('恢复替换前的数据？',`<p>这份本机快照有 ${candidate.logs.length} 条练习。恢复会替换当前人物数据，当前数据也会保留为快照。</p><button class="btn secondary" data-action="close-modal">取消</button><button class="btn primary" id="confirm-restore">恢复快照</button><p id="form-error" class="error-copy"></p>`);$('#confirm-restore').onclick=()=>importCandidate(candidate);}catch(error){toast(error.message);}},
    reset:()=>{modal('重新开始当前人物空间？',`<p>只重置 ${course.learner} 的文字记录、课程草稿与复习。旧版原始键和本地录音仍保留。当前记录会先保留快照；建议再下载一份备份。</p><div class="page-actions"><button class="btn secondary" data-action="export">先下载备份</button><button class="btn primary" id="confirm-reset">保留快照并重置</button></div><p id="form-error" class="error-copy"></p>`);$('#confirm-reset').onclick=()=>importCandidate(S.create(profile));}
  };
  function queueReview(phrase,meaning,lessonId) {if(state.reviews.some(r=>r.lessonId===lessonId&&r.phrase===phrase)){toast('这个表达已经有复习安排');return;}const next=copy(state);for(const interval of [1,3,7])next.reviews.push({id:uid(`review${interval}`),due:addDays(S.dateKey(),interval),phrase,meaning,lessonId,done:false});if(commit(next)){closeModal();render();toast('已加入第1、3、7天复习');}}

  document.addEventListener('click',event=>{const el=event.target.closest('[data-action]');if(!el||el.disabled)return;const action=actions[el.dataset.action];if(action)Promise.resolve(action(el)).catch(error=>toast(error.message));});
  document.addEventListener('input',event=>{const el=event.target;
    if(el.dataset.draft&&activeLesson){persistDraft(activeLesson,el.dataset.draft,el.value);if(el.dataset.draft==='text'&&$('#word-count'))$('#word-count').textContent=`${E.wordCount(el.value)} words${activeLesson.day===3?` / 目标 ${activeLesson.content.writing.minWords}–${activeLesson.content.writing.maxWords}`:''}`;}
    if(el.id==='material-search'){ui.query=el.value;$('#resource-list').innerHTML=libraryCards();}
  });
  document.addEventListener('change',event=>{const el=event.target;
    if(el.name==='reflection-check'&&activeLesson){ui.checks[activeLesson.id]??={};ui.checks[activeLesson.id][el.value]=el.checked;}
    if(el.dataset.question&&activeLesson){const draft=copy(draftFor(activeLesson));draft.answers[el.dataset.question]=Number(el.value);state.drafts[activeLesson.id]=draft;delete ui.graded[activeLesson.id];commit();}
    if(el.id==='backup-file'){importFile(el.files?.[0]);el.value='';}
    if(el.id==='score-type'){const isIELTS=el.value.startsWith('IELTS');$('#ielts-fields').hidden=!isIELTS;$('#other-score').hidden=isIELTS;}
  });
  document.addEventListener('keydown',event=>{if(event.target.matches('[role="tab"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const tabs=['learn','practice','reflect'],i=tabs.indexOf(ui.tab);ui.tab=event.key==='Home'?'learn':event.key==='End'?'reflect':tabs[(i+(event.key==='ArrowRight'?1:2))%3];render();$(`#tab-${ui.tab}`).focus();}});
  document.addEventListener('submit',event=>{const form=event.target;if(!form.id)return;event.preventDefault();const data=Object.fromEntries(new FormData(form));
    try {
      if(form.id==='quiz-form'){const qs=activeLesson.questionIndexes.map(i=>activeLesson.content.quiz[i]);if(!qs.every(q=>Number.isInteger(draftFor(activeLesson).answers[q.id]))){toast('先回答每一道题，再查看解析');return;}ui.graded[activeLesson.id]=true;render();$('#quiz-form')?.scrollIntoView({block:'start'});return;}
      if(form.id==='finish-form'){finishLesson(form,data);return;}
      if(form.id==='manual-log-form'){const next=S.record(state,{date:data.date,skill:data.skill,minutes:Number(data.minutes),week:Number(data.week),activity:data.activity.trim(),evidence:data.evidence.trim(),note:data.note.trim()});if(commit(next)){closeModal();render();toast('练习与成果已保存');}return;}
      if(form.id==='timer-save-form'){const match=data.lessonId.match(/-w(\d+)-d(\d+)/),lesson=getLesson(Number(match[1]),Number(match[2])-1);let next=S.record(state,{lessonId:lesson.id,week:lesson.week,skill:lesson.skill,minutes:Number(data.minutes),activity:`${lesson.content.title} · ${lesson.title}`,evidence:data.evidence.trim(),note:draftFor(lesson).note});next.timer=null;if(commit(next)){closeModal();render();toast('时长与成果已连同课程保存');}return;}
      if(form.id==='material-form'){const next=copy(state);next.materials.push({id:uid('material'),name:data.name.trim(),url:data.url.trim(),category:data.category,note:data.note.trim()});if(commit(next)){closeModal();ui.filter='我的材料';ui.query='';render();toast('已加入材料库');}return;}
      if(form.id==='review-form'){queueReview(data.phrase.trim(),data.meaning.trim(),'');return;}
      if(form.id==='settings-form'){const next=copy(state);next.settings={...next.settings,startDate:data.startDate,weeklyMinutes:Number(data.weeklyMinutes),examType:data.examType,onboarded:true,baseline:Object.fromEntries(Object.keys(skillNames).slice(0,4).map(k=>[k,String(data[`baseline-${k}`]||'').trim()]))};if(commit(next)){selectedDay=null;render();toast('学习安排已更新，已有成果仍保留');}return;}
      if(form.id==='start-week-form'){const week=Number(data.week);if(!Number.isInteger(week)||week<1||week>52)throw Error('请选择有效学习周');const next=copy(state);next.settings.startDate=addDays(S.dateKey(),-(week-1)*7);next.settings.entryWeek=week;if(commit(next)){selectedDay=null;location.hash='today';toast(`当前已调整为第${week}周，历史成果未改动`);}return;}
      if(form.id==='score-form'){saveScore(data);return;}
    }catch(error){const target=form.querySelector('[role="alert"]')||$('#form-error');if(target)target.textContent=error.message;else toast(error.message);}
  });
  function saveScore(data) {
    const isIELTS=data.type.startsWith('IELTS'),parts=['L','R','W','S'].map(k=>data[k]===''?null:Number(data[k]));let total=data.total.trim(),detail=data.detail.trim();
    if(isIELTS){for(const n of parts)if(n!==null&&(!Number.isFinite(n)||n<0||n>9||n*2%1!==0))throw Error('IELTS单项应为0–9之间的0.5分间隔');total=parts.every(n=>n!==null)?Math.round(parts.reduce((n,v)=>n+v,0)/4*2)/2:'待评';detail=`${['L','R','W','S'].map((k,i)=>`${k}${parts[i]===null?'待评':parts[i]}`).join(' ')} · ${detail}`;}
    else if(!total)throw Error('请填写测评结果');
    if(data.type==='Anki 回顾'&&(!/^\d+(\.\d+)?%?$/.test(total)||parseFloat(total)>100))throw Error('Anki回顾率请填0–100之间的百分比');
    const next=copy(state);next.scores.push({id:uid('score'),date:data.date,type:data.type,total,detail,note:data.note.trim(),source:data.source});if(commit(next)){closeModal();render();toast('测评已保存；评分来源也一并记录');}
  }
  function finishLesson(form,data) {
    const lesson=activeLesson,draft=draftFor(lesson),error=form.querySelector('[role="alert"]');
    if(state.completed[lesson.id]){error.textContent='这课已完成。草稿会继续自动保存；新增练习时间请用“保存时长”，避免重复完成。';return;}
    if(lesson.isMock&&state.settings.examType==='undecided'){error.textContent='请先在学习偏好中选择考试类型，再记录完整模考。';return;}
    const qs=lesson.isMock?[]:lesson.questionIndexes;
    if(!qs.every(i=>Number.isInteger(draft.answers[lesson.content.quiz[i].id]))){error.textContent='还有练习题没回答，请回到练习页完成。';return;}
    if(qs.length&&!ui.graded[lesson.id]){error.textContent='请先在练习页查看答案解析，再整理成果。';return;}
    const min=lesson.isMock?0:practicePrompt(lesson).min;
    if(E.wordCount(draft.text)<min){error.textContent=`请先留下至少${min}个英文词的练习产物，目前${E.wordCount(draft.text)}个。口语可以记录关键词与表达稿。`;return;}
    if(draft.note.trim().length<5){error.textContent='请写下具体成果或下次重点，至少5个字符。';return;}
    if(lesson.isMock&&draft.text.trim().length<15){error.textContent='请填试卷来源、Test编号和完成结果；没有可靠评分的项目可以标待评。';return;}
    if([...document.querySelectorAll('[name="reflection-check"]')].some(el=>!el.checked)){error.textContent='请逐项核对本课完成标准；尚未做到的可以回去补练。';return;}
    const minutes=Number(data.minutes);if(!Number.isInteger(minutes)||minutes<0||minutes>720)throw Error('本次分钟应为0–720之间的整数');
    let next=copy(state);const score=E.quizScore(lesson.content,draft.answers,qs),evidence=draft.text.trim()||draft.note.trim();
    if(minutes>0)next=S.record(next,{lessonId:lesson.id,week:lesson.week,skill:lesson.skill,minutes,activity:`${lesson.content.title} · ${lesson.title}`,evidence:evidence.slice(0,12000),note:draft.note});
    next.completed[lesson.id]={at:new Date().toISOString(),minutes,score,evidence:evidence.slice(0,12000)};
    if(next.timer?.lessonId===lesson.id)next.timer=null;
    if(commit(next)){location.hash=`complete/${lesson.week}/${lesson.day+1}`;toast('这次练习已完成，成果已保存');}
  }
  $('#dialog-close').addEventListener('click',closeModal);$('#dialog').addEventListener('cancel',()=>document.body.classList.remove('dialog-open'));
  document.addEventListener('keydown',handleProfileMenuKey);
  document.addEventListener('pointerdown',event=>{if(!$('#profile-picker').contains(event.target))setProfileMenuOpen(false);});
  window.addEventListener('hashchange',route);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){pauseTimer();if(recorder?.state==='recording')recorder.stop();window.speechSynthesis?.cancel();}else{if(page==='today')render();else renderTimer();}});
  window.addEventListener('pagehide',()=>{clearTimeout(saveTimeout);pauseTimer();if(state&&!storageError)commit();});
  setInterval(()=>{if(!state?.timer)return;document.querySelectorAll('[data-clock]').forEach(el=>el.textContent=clock(elapsedFor(activeLesson?.id)));document.querySelectorAll('[data-dock-clock]').forEach(el=>el.textContent=clock(elapsedFor(state.timer.lessonId)));if(state.timer.startedAt&&Date.now()-state.timer.startedAt>=15000){const next=copy(state);next.timer.elapsed=elapsedFor(next.timer.lessonId);next.timer.startedAt=Date.now();commit(next);}},1000);
  try {loadProfile();route();}catch(error){$('#content').innerHTML=`<div class="notice error"><p>学习桌未能打开：${esc(error.message)}。请刷新；已有记录不会被清空。</p></div>`;}
})();
