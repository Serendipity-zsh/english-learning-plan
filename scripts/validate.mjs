import fs from 'node:fs';
import vm from 'node:vm';

const requiredFiles = ['index.html', 'styles.css', 'app.js', 'plan-data.js', '404.html'];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

const context = { window: {} };
vm.runInNewContext(fs.readFileSync('plan-data.js', 'utf8'), context);
const plan = context.window.LEARNING_PLAN;

if (!plan || plan.weeks.length !== 52) {
  throw new Error(`Expected 52 weeks, found ${plan?.weeks?.length ?? 0}`);
}
if (plan.phases.length !== 4) throw new Error('Expected 4 learning phases');
if (plan.materials.length < 8) throw new Error('The materials library is incomplete');

const requiredWeekFields = ['week', 'phase', 'title', 'focus', 'materials', 'output', 'check', 'hours', 'tasks'];
for (const week of plan.weeks) {
  for (const field of requiredWeekFields) {
    if (!week[field] || (Array.isArray(week[field]) && !week[field].length)) {
      throw new Error(`Week ${week.week} is missing ${field}`);
    }
  }
}

const recommendedHours = plan.weeks.reduce((sum, week) => sum + week.hours, 0);
if (recommendedHours < 650) throw new Error(`Recommended hours total only ${recommendedHours}`);

const appSource = fs.readFileSync('app.js', 'utf8');
const dailyFeatureMarkers = ['taskNotes', '今天具体怎么学', '完成标准', 'data-copy-prompt', 'data-start-task', '周一', '周日'];
for (const marker of dailyFeatureMarkers) {
  if (!appSource.includes(marker)) throw new Error(`Daily learning workflow is missing: ${marker}`);
}
if ((appSource.match(/name:'周[一二三四五六日]'/g) || []).length !== 7) {
  throw new Error('Expected seven daily learning schedules');
}

console.log(`Validated ${plan.weeks.length} weeks, 7 daily schedules, ${plan.materials.length} materials, ${recommendedHours} recommended hours.`);
