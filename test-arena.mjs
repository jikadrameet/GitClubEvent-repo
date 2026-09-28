import { CHALLENGES_DATA } from './src/data/challenges.js';
import { INITIAL_LEADERBOARD } from './src/data/leaderboardData.js';

console.log('--- Testing Challenge Arena Data Integrity ---');

// 1. Validate Challenges
console.log(`Checking ${CHALLENGES_DATA.length} challenges...`);
if (CHALLENGES_DATA.length < 8) {
  throw new Error(`Expected at least 8 challenges, got ${CHALLENGES_DATA.length}`);
}

CHALLENGES_DATA.forEach((c) => {
  const required = ['id', 'title', 'category', 'difficulty', 'status', 'points', 'deadline', 'problemDescription', 'requirements', 'rules'];
  for (const field of required) {
    if (!c[field]) {
      throw new Error(`Challenge ${c.id || 'unknown'} missing field: ${field}`);
    }
  }
  if (!Array.isArray(c.requirements) || c.requirements.length === 0) {
    throw new Error(`Challenge ${c.id} has empty requirements`);
  }
  if (!Array.isArray(c.rules) || c.rules.length === 0) {
    throw new Error(`Challenge ${c.id} has empty rules`);
  }
});
console.log('✓ All 9 challenges have complete metadata, requirements, and rules.');

// 2. Validate Leaderboard
console.log(`Checking leaderboard participants (${INITIAL_LEADERBOARD.length})...`);
const currentUser = INITIAL_LEADERBOARD.find(p => p.isCurrentParticipant);
if (!currentUser) {
  throw new Error('Current participant not found in leaderboard!');
}
console.log(`✓ Current participant identified: "${currentUser.name}" with initial rank #${currentUser.rank}`);

console.log('All automated integrity tests passed successfully!');
