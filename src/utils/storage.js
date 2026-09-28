/**
 * Git Club CHARUSAT — LocalStorage Persistence Layer
 * Provides clean, safe client-side persistence for participant actions and submissions.
 */

import { CHALLENGES_DATA } from "../data/challenges";
import { INITIAL_LEADERBOARD } from "../data/leaderboardData";

const STORAGE_KEY = "gitclub_challenge_arena_state_v1";

const DEFAULT_STATE = {
  participant: {
    id: "current-user",
    name: "You (CHARUSAT Dev)",
    handle: "student_builder",
    department: "CSPIT / DEPSTAR Tech Cell",
    campus: "CHARUSAT Changa",
    streak: "6 days",
    badge: "Rising Contributor",
    avatar: "👨‍💻"
  },
  // challengeId -> { status: 'Not Started' | 'In Progress' | 'Submitted' | 'Completed', startedAt, submission, earnedPoints }
  challenges: {
    "campus-weather-dashboard": {
      status: "Completed",
      startedAt: "2026-09-12T10:00:00Z",
      submission: {
        repoUrl: "https://github.com/charusat-student/changa-weather-app",
        demoUrl: "https://changa-weather.vercel.app",
        notes: "Completed with responsive UI and microclimate advisory badges.",
        submittedAt: "2026-09-14T18:30:00Z"
      },
      earnedPoints: 180
    }
  }
};

/**
 * Safely read state from localStorage with fallback
 */
export function getStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      participant: { ...DEFAULT_STATE.participant, ...(parsed.participant || {}) },
      challenges: { ...DEFAULT_STATE.challenges, ...(parsed.challenges || {}) }
    };
  } catch (err) {
    console.warn("Failed to read from localStorage, using fallback state:", err);
    return DEFAULT_STATE;
  }
}

/**
 * Safely persist state to localStorage
 */
export function saveStoredState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event("gitclub_storage_update"));
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
}

/**
 * Get status of a specific challenge for current participant
 * @returns {'Not Started' | 'In Progress' | 'Submitted' | 'Completed'}
 */
export function getChallengeParticipantStatus(challengeId) {
  const state = getStoredState();
  return state.challenges?.[challengeId]?.status || "Not Started";
}

/**
 * Get submission details of a specific challenge
 */
export function getChallengeSubmission(challengeId) {
  const state = getStoredState();
  return state.challenges?.[challengeId]?.submission || null;
}

/**
 * Start a challenge
 */
export function startChallenge(challengeId) {
  const state = getStoredState();
  const current = state.challenges[challengeId] || {};

  // If already submitted or completed, keep that status
  if (current.status === "Submitted" || current.status === "Completed") {
    return state;
  }

  state.challenges[challengeId] = {
    ...current,
    status: "In Progress",
    startedAt: current.startedAt || new Date().toISOString()
  };

  saveStoredState(state);
  return state;
}

/**
 * Submit a challenge solution
 */
export function submitChallengeSolution(challengeId, submissionData) {
  const state = getStoredState();
  const challenge = CHALLENGES_DATA.find((c) => c.id === challengeId);
  const earned = challenge ? challenge.points : 200;

  state.challenges[challengeId] = {
    ...(state.challenges[challengeId] || {}),
    status: "Submitted",
    earnedPoints: earned,
    submission: {
      repoUrl: submissionData.repoUrl.trim(),
      demoUrl: submissionData.demoUrl?.trim() || "",
      notes: submissionData.notes?.trim() || "",
      submittedAt: new Date().toISOString()
    }
  };

  saveStoredState(state);
  return state;
}

/**
 * Reset participant progress back to default state
 */
export function resetParticipantProgress() {
  saveStoredState(DEFAULT_STATE);
  return DEFAULT_STATE;
}

/**
 * Calculate aggregate participant stats
 */
export function getParticipantStats() {
  const state = getStoredState();
  const challenges = state.challenges || {};

  let completedCount = 0;
  let submittedCount = 0;
  let inProgressCount = 0;
  let totalPoints = 0;

  Object.entries(challenges).forEach(([id, item]) => {
    if (item.status === "Completed") {
      completedCount++;
      totalPoints += item.earnedPoints || 0;
    } else if (item.status === "Submitted") {
      submittedCount++;
      totalPoints += item.earnedPoints || 0;
    } else if (item.status === "In Progress") {
      inProgressCount++;
    }
  });

  const attemptedCount = completedCount + submittedCount + inProgressCount;
  const totalAvailableChallenges = CHALLENGES_DATA.length;
  const completionPercentage = totalAvailableChallenges > 0
    ? Math.round(((completedCount + submittedCount) / totalAvailableChallenges) * 100)
    : 0;

  return {
    participant: state.participant,
    totalPoints,
    completedCount,
    submittedCount,
    inProgressCount,
    attemptedCount,
    totalAvailableChallenges,
    completionPercentage
  };
}

/**
 * Calculate dynamic leaderboard reflecting user's updated points
 */
export function getDynamicLeaderboard() {
  const stats = getParticipantStats();
  const baseList = INITIAL_LEADERBOARD.map((p) => {
    if (p.isCurrentParticipant) {
      return {
        ...p,
        points: stats.totalPoints,
        challengesCompleted: stats.completedCount + stats.submittedCount,
        challengesAttempted: stats.attemptedCount
      };
    }
    return { ...p };
  });

  // Sort by points descending, then completed count descending
  baseList.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.challengesCompleted - a.challengesCompleted;
  });

  // Re-assign ranks 1..N
  return baseList.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
}
