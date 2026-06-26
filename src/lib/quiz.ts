import type { Question } from '../types'
import { QUESTIONS } from '../data/questions'

export function getQuestionsForTopic(topicId: string): Question[] {
  return QUESTIONS.filter((q) => q.topicId === topicId)
}

export function topicHasQuestions(topicId: string): boolean {
  return QUESTIONS.some((q) => q.topicId === topicId)
}

export interface QuizItem {
  question: Question
  /** options reordered for display */
  options: string[]
  /** index within `options` of the correct answer */
  correctIndex: number
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

/**
 * Build a randomised quiz for a topic: up to `count` questions, each with its
 * options shuffled. Returns fewer items if the topic has fewer questions.
 */
export function buildQuiz(topicId: string, count = 5): QuizItem[] {
  const pool = shuffle(getQuestionsForTopic(topicId)).slice(0, count)
  return pool.map((question) => {
    const order = shuffle(question.options.map((_, i) => i))
    const options = order.map((i) => question.options[i])
    const correctIndex = order.indexOf(question.answerIndex)
    return { question, options, correctIndex }
  })
}
