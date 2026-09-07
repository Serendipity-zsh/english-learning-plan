(() => {
  const { phases, weeks, materials } = window.LEARNING_PLAN;
  const storageKey = 'english-year-one-v1';
  const calendarDayIndex = (new Date().getDay() + 6) % 7;
  const defaultState = { currentWeek: 1, selectedDay: calendarDayIndex, completedTasks: {}, passedWeeks: [], logs: [], scores: [] };
  let state = loadState();
  let activeFilter = 0;
  let timerSeconds = 25 * 60;
  let timerInitial = timerSeconds;
  let timerId = null;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const today = new Date().toISOString().slice(0, 10);
  $('#log-date').value = today;
  $('#score-date').value = today;

  function loadState() {
    try { return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || '{}') }; }
    catch { return { ...defaultState }; }
  }
  function saveState() { localStorage.setItem(storageKey, JSON.stringify(state)); renderDashboard(); renderRecords(); }
  function esc(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('is-visible'); clearTimeout(el._timer); el._timer=setTimeout(()=>el.classList.remove('is-visible'),2400); }
  function dailySchedule(week) {
    const mainMaterial = week.materials.split('；')[0];
    const scale = week.hours / 12.5;
    const minutes = value => Math.max(5, Math.round(value * scale / 5) * 5);
    const task = (title, detail, value) => ({ title, detail: `${detail} · ${minutes(value)} 分钟`, minutes: minutes(value) });
    return [
      { name:'周一', theme:'进入本周主题', tasks:[task('Duolingo 基础练习','复习并学习本周句型',20),task('主材料学习',mainMaterial,35),task('关键句跟读','选择 5 句录音对比',15),task('语法整理',week.focus,20)] },
      { name:'周二', theme:'阅读和短写作', tasks:[task('Duolingo 基础练习','保持每日连续学习',20),task('主材料第二轮',`${mainMaterial} 听读结合`,30),task('英文阅读','划出主旨和 5 个表达',20),task('短写作','用本周表达完成一段文字',20)] },
      { name:'周三', theme:'听力和口语', tasks:[task('Duolingo 基础练习','复习薄弱题目',20),task('精听训练','听写关键句并对照文本',30),task('ChatGPT 语音','围绕本周主题连续对话',25),task('口语复盘','记录 3 个错误并重说',15)] },
      { name:'周四', theme:'准确度训练', tasks:[task('Duolingo 基础练习','巩固基础句型',20),task('主材料第三轮',`${mainMaterial} 复述和测验`,30),task('语法练习',week.focus,20),task('修改写作','根据反馈完成一次重写',20)] },
      { name:'周五', theme:'迁移到真实表达', tasks:[task('Duolingo 基础练习','完成本周 App 目标',20),task('本周材料复习',week.materials,30),task('口语输出',`围绕“${week.title}”录音`,25),task('表达复习','主动使用 10 个本周表达',15)] },
      { name:'周六', theme:'长任务和作品', tasks:[task('影视或长材料精听','只用英文字幕，精学 5–10 分钟',45),task('跟读和表达整理','保存 10 个可复用表达',25),task('本周写作',week.output,45),task('脱稿复述','保存音频或会话文字',35)] },
      { name:'周日', theme:'测试和周复盘', tasks:[task('本周测试',week.check,60),task('工作英语模拟','站会、会议、项目介绍或面试',30),task('错题复盘','整理最高频的 3 类错误',30),task('安排下周','记录成绩、证据和下周重点',30)] },
    ];
  }

  function dayIsComplete(weekNumber, dayIndex, schedule) {
    return schedule[dayIndex].tasks.every((_, taskIndex) => state.completedTasks[`w${weekNumber}-d${dayIndex}-t${taskIndex}`]);
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
    $('#today-title').innerHTML = selectedDay === calendarDayIndex
      ? '今天的<br>专注练习'
      : `${day.name}的<br>学习计划`;
    $('#week-summary').textContent = `${phase.name}阶段。本周聚焦${week.focus}。${day.name}的重点是${day.theme}，计划约 ${day.tasks.reduce((sum, item) => sum + item.minutes, 0)} 分钟。`;
    $('#focus-title').textContent = week.title;
    $('#day-switcher').innerHTML = schedule.map((item, dayIndex) => {
      const done = dayIsComplete(week.week, dayIndex, schedule);
      return `<button class="day-button ${dayIndex===selectedDay?'is-active':''} ${done?'is-done':''}" data-day="${dayIndex}"><span>${item.name}</span><small>${dayIndex===calendarDayIndex?'今天':done?'已完成':`${item.tasks.reduce((sum,t)=>sum+t.minutes,0)} 分`}</small></button>`;
    }).join('');
    $$('[data-day]').forEach(button => button.addEventListener('click', () => { state.selectedDay=Number(button.dataset.day); saveState(); }));
    const keyPrefix = `w${week.week}-d${selectedDay}-t`;
    $('#today-tasks').innerHTML = day.tasks.map((task, i) => {
      const checked = Boolean(state.completedTasks[`${keyPrefix}${i}`]);
      return `<label class="task-row ${checked?'is-done':''}"><input type="checkbox" data-task-key="${keyPrefix}${i}" ${checked?'checked':''} aria-label="完成 ${esc(task.title)}"><span><strong>${esc(task.title)}</strong><small>${esc(task.detail)}</small></span></label>`;
    }).join('');
    $$('[data-task-key]').forEach(input => input.addEventListener('change', e => { state.completedTasks[e.target.dataset.taskKey]=e.target.checked; saveState(); }));
    const selectedCompleted = day.tasks.filter((_, taskIndex) => state.completedTasks[`${keyPrefix}${taskIndex}`]).length;
    const completedDays = schedule.filter((_, dayIndex) => dayIsComplete(week.week, dayIndex, schedule)).length;
    $('#selected-day-target').textContent = `${day.name} · ${day.theme}`;
    $('#selected-day-progress').textContent = `${selectedCompleted} / ${day.tasks.length} 项`;
    $('#today-completed').textContent = `${selectedCompleted}/${day.tasks.length}`;
    $('#checked-days').textContent = `${completedDays}/7`;
    $('#week-detail').innerHTML = `<div class="focus-meta"><span class="tag">${esc(phase.range)}</span><span class="tag">目标 ${esc(phase.level)}</span><span class="tag">建议 ${week.hours} 小时</span></div><h3>${esc(week.focus)}</h3><p><strong>使用材料：</strong>${esc(week.materials)}</p><div class="focus-columns"><div><h4>本周产物</h4><ul><li>${esc(week.output)}</li><li>至少 2 次保留录音或文字证据</li></ul></div><div><h4>通过标准</h4><ul><li>${esc(week.check)}</li><li>完成学习记录和三类高频错误复盘</li></ul></div></div>`;
    const totalMinutes = state.logs.reduce((sum, l) => sum + Number(l.minutes || 0), 0);
    const totalHours = totalMinutes / 60;
    $('#hours-copy').textContent = `${totalHours.toFixed(1)} / 650 小时`;
    $('#hours-progress').style.width = `${Math.min(100, totalHours/650*100)}%`;
    $('#next-milestone').textContent = `下一里程碑 ${phase.level} · ${phase.milestone}`;
  }

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

  renderDashboard(); renderRoadmap(); renderMaterials(); renderRecords();
})();
