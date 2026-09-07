import fs from 'node:fs/promises';

const username = process.env.DUOLINGO_USERNAME || 'Leo_zsh';
const outputPath = new URL('../duolingo-data.json', import.meta.url);
const endpoint = `https://www.duolingo.com/2017-06-30/users?username=${encodeURIComponent(username)}`;

async function syncPublicProfile() {
  const response = await fetch(endpoint, {
    headers: {
      accept: 'application/json',
      'user-agent': 'english-learning-plan/1.0 (public-profile-sync)',
    },
  });
  if (!response.ok) throw new Error(`Duolingo returned HTTP ${response.status}`);

  const payload = await response.json();
  const user = payload?.users?.find(item => item.username === username) || payload?.users?.[0];
  if (!user) throw new Error(`Public profile ${username} was not found`);

  const englishCourse = user.courses?.find(course => course.learningLanguage === 'en' && course.id === user.currentCourseId)
    || user.courses?.find(course => course.learningLanguage === 'en');
  if (!englishCourse) throw new Error('English course was not found in the public profile');

  // Intentionally keep only learning metrics used by the page. Do not persist IDs,
  // location, contact/account flags, moderation data, or the full API response.
  const sanitized = {
    username: String(user.username),
    displayName: String(user.name || user.username),
    streak: Number(user.streak || 0),
    totalXp: Number(user.totalXp || 0),
    englishXp: Number(englishCourse.xp || 0),
    englishCourseId: String(englishCourse.id || ''),
    syncedAt: new Date().toISOString(),
    source: 'Duolingo public profile (unofficial endpoint)',
  };

  await fs.writeFile(outputPath, `${JSON.stringify(sanitized, null, 2)}\n`, 'utf8');
  console.log(`Synced public Duolingo metrics for ${sanitized.username}: ${sanitized.streak} day streak, ${sanitized.englishXp} English XP.`);
}

try {
  await syncPublicProfile();
} catch (error) {
  try {
    await fs.access(outputPath);
    console.warn(`Duolingo sync unavailable; keeping the checked-in fallback. ${error.message}`);
  } catch {
    throw error;
  }
}
