import type { ProgressState, TopicProgress } from '../types'

export const XP_PER_CORRECT = 10
export const XP_PER_ATTEMPT = 2
export const XP_PER_LEVEL = 100

function emptyTopic(): TopicProgress {
  return { attempts: 0, correct: 0, bestStreak: 0, mastery: 0, lastSeen: 0 }
}

/** Return a new state with a single answer recorded against `topicId`. */
export function recordAnswer(
  state: ProgressState,
  topicId: string,
  correct: boolean,
  streak: number,
): ProgressState {
  const prev = state.topics[topicId] ?? emptyTopic()
  const attempts = prev.attempts + 1
  const correctCount = prev.correct + (correct ? 1 : 0)
  const topic: TopicProgress = {
    attempts,
    correct: correctCount,
    bestStreak: Math.max(prev.bestStreak, streak),
    mastery: correctCount / attempts,
    lastSeen: Date.now(),
  }
  return {
    ...state,
    xp: state.xp + XP_PER_ATTEMPT + (correct ? XP_PER_CORRECT : 0),
    totalAttempts: state.totalAttempts + 1,
    totalCorrect: state.totalCorrect + (correct ? 1 : 0),
    topics: { ...state.topics, [topicId]: topic },
  }
}

/** Add Base Converter Arcade points and update the personal best. */
export function recordConverterScore(
  state: ProgressState,
  score: number,
): ProgressState {
  return {
    ...state,
    xp: state.xp + Math.max(0, score),
    converterBest: Math.max(state.converterBest, score),
  }
}

/** Overall accuracy across all topics, 0..1. */
export function overallAccuracy(state: ProgressState): number {
  if (state.totalAttempts === 0) return 0
  return state.totalCorrect / state.totalAttempts
}

/** Current level (1-based). Every XP_PER_LEVEL points is a new level. */
export function level(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

/** Progress within the current level, for rendering an XP bar. */
export function xpIntoLevel(xp: number): { current: number; needed: number } {
  return { current: xp % XP_PER_LEVEL, needed: XP_PER_LEVEL }
}
