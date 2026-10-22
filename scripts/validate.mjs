import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),E=require('../engine.js');
const required=['index.html','studio.css','app.js','engine.js','store.js','resources.js','authentic-resources.js','course-leo.js','course-nico.js','favicon.svg','404.html','assets/reading.svg','assets/plant.svg','ASSET-LICENSES.md'];
for(const file of required)assert.ok(fs.existsSync(file),`Missing ${file}`);
const context={window:{}};vm.createContext(context);
for(const file of ['resources.js','authentic-resources.js','course-leo.js','course-nico.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const resources=[...context.window.STUDY_RESOURCES,...context.window.AUTHENTIC_RESOURCES];
const ids=new Set(resources.map(r=>r.id));
assert.equal(ids.size,resources.length,'resource IDs must be unique');
for(const resource of resources){const url=new URL(resource.url);assert.equal(url.protocol,'https:');assert.ok(resource.name&&resource.note&&resource.category&&resource.cost);}
const authenticIds=new Set(context.window.AUTHENTIC_RESOURCES.map(r=>r.id));
for(const r of context.window.AUTHENTIC_RESOURCES)assert.match(new URL(r.url).pathname,/\/listening\/(?:a1|a2|b1|b2)\/.+/,'Original audio must link to a specific lesson');
let questions=0,lessons=0;
for(const [id,course] of Object.entries(context.window.COURSES)){
  assert.equal(course.id,id);assert.equal(course.weeks.length,52);const qids=new Set(),texts=new Set(),lessonIds=new Set();
  for(const [index,week] of course.weeks.entries()){
    assert.equal(week.week,index+1);assert.ok(course.phases.some(p=>p.id===week.phase&&week.week>=p.from&&week.week<=p.to));
    assert.ok(week.title&&week.canDo&&week.level&&week.grammar.note&&week.grammar.examples.length>=2);
    assert.ok(E.wordCount(week.text.body)>=40);assert.ok(!texts.has(week.text.body),'each week needs original material');texts.add(week.text.body);
    assert.equal(week.chunks.length,5);assert.equal(week.quiz.length,5);assert.ok(week.resourceIds.length>0);
    for(const resource of week.resourceIds)assert.ok(ids.has(resource),`${id} w${week.week}: unknown resource ${resource}`);
    const mapped=context.window.AUTHENTIC_WEEK_MAP[id][week.week];assert.ok(mapped?.length,`${id} w${week.week}: missing original audio`);
    for(const resource of mapped)assert.ok(authenticIds.has(resource),`${id} w${week.week}: unknown original audio ${resource}`);
    for(const q of week.quiz){assert.ok(!qids.has(q.id));qids.add(q.id);assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=2);assert.ok(q.question&&q.explanation);questions++;}
    assert.ok(week.writing.minWords>0&&week.writing.maxWords>=week.writing.minWords);assert.ok(week.writing.prompt&&week.speaking.prompt&&week.workplace.prompt);assert.equal(week.speaking.checklist.length,3);
    for(const budget of [300,540,750,900,1500]){
      const schedule=Array.from({length:7},(_,day)=>E.lesson(course,week.week,day,budget));
      assert.equal(schedule.reduce((n,l)=>n+l.minutes,0),budget,`${id} w${week.week}: budget mismatch`);
      assert.ok(schedule.every(l=>Number.isInteger(l.minutes)&&l.minutes>0));
    }
    for(let day=0;day<7;day++){const lesson=E.lesson(course,week.week,day,750);assert.ok(!lessonIds.has(lesson.id));lessonIds.add(lesson.id);lessons++;}
  }
  assert.equal(lessonIds.size,364);assert.equal(course.phases[0].from,1);assert.equal(course.phases.at(-1).to,52);
  for(let i=1;i<course.phases.length;i++)assert.equal(course.phases[i].from,course.phases[i-1].to+1);
}
const html=fs.readFileSync('index.html','utf8');
const mark=fs.readFileSync('favicon.svg','utf8');
assert.match(mark,/viewBox="0 0 64 64"/);assert.ok(!/<script|<foreignObject|\bhref=|url\(/i.test(mark),'Site icon must be self-contained');
const apple=fs.readFileSync('apple-touch-icon.png');assert.equal(apple.readUInt32BE(16),180);assert.equal(apple.readUInt32BE(20),180);
const ico=fs.readFileSync('favicon.ico');assert.equal(ico.readUInt16LE(0),0);assert.equal(ico.readUInt16LE(2),1);assert.equal(ico.readUInt16LE(4),3);
for(const [i,size] of [16,32,48].entries()){const entry=6+i*16,offset=ico.readUInt32LE(entry+12),length=ico.readUInt32LE(entry+8);assert.equal(ico[entry],size);assert.equal(ico[entry+1],size);assert.ok(offset+length<=ico.length);assert.equal(ico.readUInt32BE(offset),0x89504e47);assert.equal(ico.readUInt32BE(offset+16),size);assert.equal(ico.readUInt32BE(offset+20),size);}
assert.ok(html.includes('src="favicon.svg?v=3"'),'Sidebar and browser must share the same mark');
for(const path of [...html.matchAll(/(?:src|href)="([^"?#]+)(?:\?[^"#]*)?"/g)].map(m=>m[1]).filter(p=>!p.startsWith('http')&&!p.startsWith('#')))assert.ok(fs.existsSync(path),`HTML references missing ${path}`);
const snapshot=JSON.parse(fs.readFileSync('duolingo-data.json','utf8')),allow=['username','displayName','streak','totalXp','englishXp','englishCourseId','syncedAt','source'];
assert.ok(Object.keys(snapshot).every(k=>allow.includes(k)),'Duolingo snapshot must not contain private response fields');assert.equal(snapshot.username,'Leo_zsh');
console.log(`Validated 2 learners, 104 original weeks, ${lessons} daily sessions, ${questions} questions, resource references, and exact minute budgets.`);
