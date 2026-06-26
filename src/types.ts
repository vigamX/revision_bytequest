// Domain model for ByteQuest — OCR GCSE Computer Science (J277) revision game.

export type PaperId = 'paper1' | 'paper2'

export interface Paper {
  id: PaperId
  /** OCR component code, e.g. "J277/01" */
  code: string
  /** Short title, e.g. "Computer Systems" */
  name: string
  /** One-line description of the paper's scope */
  blurb: string
  /** Accent theme key used by the UI ("cyan" | "violet") */
  theme: string
  /** Topic ids that belong to this paper, in spec order */
  topicIds: string[]
}

export interface Topic {
  /** Spec reference and stable id, e.g. "1.1" */
  id: string
  paperId: PaperId
  /** Display name, e.g. "Systems architecture" */
  name: string
  /** Revision-friendly summary of what the topic covers */
  summary: string
  /** Emoji used as the zone icon */
  icon: string
}

export type QuestionType = 'mcq'

export interface Question {
  id: string
  /** Topic.id this question belongs to */
  topicId: string
  type: QuestionType
  prompt: string
  /** Answer options (2-5). The correct one is at `answerIndex`. */
  options: string[]
  /** 0-based index of the correct option in `options` */
  answerIndex: number
  /** Shown after answering, written in OCR mark-scheme language */
  explanation: string
  /** 1 = recall, 2 = apply, 3 = stretch */
  difficulty: 1 | 2 | 3
}

export interface TopicProgress {
  attempts: number
  correct: number
  bestStreak: number
  /** 0..1 rolling mastery estimate (correct / attempts) */
  mastery: number
  /** epoch ms of last attempt, 0 if never seen */
  lastSeen: number
}

export interface ProgressState {
  /** schema version, used for safe migrations */
  version: number
  xp: number
  totalAttempts: number
  totalCorrect: number
  /** keyed by Topic.id */
  topics: Record<string, TopicProgress>
  /** best score reached in the Base Converter Arcade */
  converterBest: number
  /** earned badge ids */
  badges: string[]
}
