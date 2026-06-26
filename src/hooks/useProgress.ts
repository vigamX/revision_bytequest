import { useCallback, useEffect, useState } from 'react'
import type { ProgressState } from '../types'
import { defaultProgress, loadProgress, saveProgress } from '../lib/storage'
import {
  recordAnswer as applyAnswer,
  recordConverterScore as applyConverter,
} from '../lib/progress'

export interface UseProgress {
  progress: ProgressState
  recordAnswer: (topicId: string, correct: boolean, streak: number) => void
  recordConverterScore: (score: number) => void
  resetProgress: () => void
}

/**
 * React state for the player's progress, automatically persisted to
 * localStorage whenever it changes.
 */
export function useProgress(): UseProgress {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const recordAnswer = useCallback(
    (topicId: string, correct: boolean, streak: number) => {
      setProgress((prev) => applyAnswer(prev, topicId, correct, streak))
    },
    [],
  )

  const recordConverterScore = useCallback((score: number) => {
    setProgress((prev) => applyConverter(prev, score))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress())
  }, [])

  return { progress, recordAnswer, recordConverterScore, resetProgress }
}
