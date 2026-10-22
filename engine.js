(function(root){
  'use strict';
  const dayNames=['听懂意思','说准句子','脱稿表达','写清楚','带到工作里','真实材料与迁移','复习与小测'];
  const daySkills=['listening','vocabulary','speaking','writing','speaking','reading','review'];
  const mockWeeks={leo:[40,46,50],nico:[24,49]};
  function lessonId(profile,week,day){return `${profile}-w${String(week).padStart(2,'0')}-d${String(day+1).padStart(2,'0')}`;}
  function budget(total,mock=false){
    if(!Number.isInteger(total)||total<300||total>1500)throw Error('每周时间需在300–1500分钟之间');
    const weights=[16,15,16,15,14,18,6],result=Array(7).fill(0);
    if(mock)result[5]=165;
    const pool=total-result[5],sum=weights.reduce((n,w,i)=>n+(mock&&i===5?0:w),0);
    let assigned=0;
    for(let i=0;i<6;i++){if(mock&&i===5)continue;result[i]=Math.floor(pool*weights[i]/sum);assigned+=result[i];}
    result[6]=pool-assigned;
    return result;
  }
  function lesson(course,week,day,weeklyMinutes=750){
    if(!['leo','nico'].includes(course?.id)||!Number.isInteger(week)||week<1||week>52||!Number.isInteger(day)||day<0||day>6)throw Error('找不到这一课');
    const content=course.weeks[week-1];if(!content)throw Error('找不到这一课');
    const mock=mockWeeks[course.id].includes(week);
    return {id:lessonId(course.id,week,day),week,day,content,minutes:budget(weeklyMinutes,mock)[day],title:mock&&day===5?'完整模考日':dayNames[day],skill:mock&&day===5?'mock':daySkills[day],isMock:mock&&day===5,questionIndexes:day===0?[0,1]:day===1?[3,4]:day===2?[2]:day===6?[0,1,2,3,4]:[]};
  }
  function wordCount(text){return (String(text).match(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g)||[]).length;}
  function quizScore(week,answers,indexes){if(!indexes.length)return null;const correct=indexes.filter(i=>Number.isInteger(answers[week.quiz[i].id])&&answers[week.quiz[i].id]===week.quiz[i].answer).length;return Math.round(correct/indexes.length*100);}
  const api={dayNames,daySkills,mockWeeks,lessonId,budget,lesson,wordCount,quizScore};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.StudyEngine=api;
})(typeof window!=='undefined'?window:globalThis);
