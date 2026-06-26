import type { ProgressState } from '../types'

const STORAGE_KEY = 'bytequest:progress'
const SCHEMA_VERSION = 1

export function defaultProgress(): ProgressState {
  return {
    version: SCHEMA_VERSION,
    xp: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    topics: {},
    converterBest: 0,
    badges: [],
  }
}

/** Load saved progress, falling back to a fresh state on any error. */
export function loadProgress(): ProgressState {
  if (typeof localStorage === 'undefined') return defaultProgress()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    if (!parsed || parsed.version !== SCHEMA_VERSION) return defaultProgress()
    return { ...defaultProgress(), ...parsed, topics: parsed.topics ?? {} }
  } catch {
    // Corrupt or unreadable data — start fresh rather than crash.
    return defaultProgress()
  }
}

/** Persist progress. Best-effort: ignores quota / private-mode failures. */
export function saveProgress(state: ProgressState): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage may be unavailable (quota exceeded, private mode); ignore.
  }
}
