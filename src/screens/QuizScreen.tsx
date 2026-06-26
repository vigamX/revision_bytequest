import { useState, useEffect, useCallback } from 'react'
import { buildQuiz } from '../lib/quiz'
import type { QuizItem } from '../lib/quiz'
import { TOPICS_BY_ID } from '../data/topics'
import type { ProgressState } from '../types'
import type { View } from '../App'

interface QuizScreenProps {
  topicId: string
  progress: ProgressState
  recordAnswer: (topicId: string, correct: boolean, streak: number) => void
  navigate: (view: View) => void
}

export function QuizScreen({ topicId, progress: _progress, recordAnswer, navigate }: QuizScreenProps) {
  const [items, setItems] = useState<QuizItem[]>(() => buildQuiz(topicId, 5))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const topic = TOPICS_BY_ID[topicId]
  const currentItem = items[currentIndex]

  const handleSelect = useCallback((idx: number) => {
    if (selectedIdx !== null || isFinished) return
    
    setSelectedIdx(idx)
    const isCorrect = idx === currentItem.correctIndex
    const newStreak = isCorrect ? streak + 1 : 0
    
    setStreak(newStreak)
    if (isCorrect) setScore((s) => s + 1)

    recordAnswer(topicId, isCorrect, newStreak)
  }, [selectedIdx, isFinished, currentItem, streak, topicId, recordAnswer])

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedIdx(null)
    } else {
      setIsFinished(true)
    }
  }, [currentIndex, items.length])

  const handlePlayAgain = () => {
    setItems(buildQuiz(topicId, 5))
    setCurrentIndex(0)
    setSelectedIdx(null)
    setStreak(0)
    setScore(0)
    setIsFinished(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return
      if (selectedIdx === null) {
        if (e.key === '1') handleSelect(0)
        else if (e.key === '2') handleSelect(1)
        else if (e.key === '3') handleSelect(2)
        else if (e.key === '4') handleSelect(3)
        else if (e.key === '5') handleSelect(4)
      } else {
        if (e.key === 'Enter') {
          handleNext()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIdx, isFinished, handleSelect, handleNext])

  if (!topic || items.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>No questions available for this topic.</p>
        <button
          onClick={() => navigate({ name: 'hub' })}
          className="mt-4 px-4 py-2 bg-[var(--color-brand-surface)] rounded text-white"
        >
          Back to Hub
        </button>
      </div>
    )
  }

  const isCyan = topic.paperId === 'paper1'
  const brandColor = isCyan ? 'var(--color-brand-cyan)' : 'var(--color-brand-violet)'

  if (isFinished) {
    const accuracy = score / items.length
    let message = 'Keep practising!'
    if (accuracy === 1) message = 'Flawless victory! 🏆'
    else if (accuracy >= 0.8) message = 'Excellent work! 🌟'
    else if (accuracy >= 0.5) message = 'Solid effort! 👍'

    const xpGained = score * 10 + items.length * 2

    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-full rounded-3xl bg-[var(--color-brand-surface)] p-8 shadow-2xl border border-white/10">
          <div className="text-6xl mb-6">{topic.icon}</div>
          <h2 className="text-3xl font-black text-white mb-2">{topic.name} Complete!</h2>
          <p className="text-xl text-[var(--color-brand-cyan-light)] font-bold mb-8">{message}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-[#0b1020] rounded-xl p-4 border border-white/5">
              <p className="text-slate-400 text-sm uppercase font-bold tracking-wider mb-1">Score</p>
              <p className="text-4xl font-black text-white">{score} <span className="text-xl text-slate-500">/ {items.length}</span></p>
            </div>
            <div className="bg-[#0b1020] rounded-xl p-4 border border-white/5">
              <p className="text-slate-400 text-sm uppercase font-bold tracking-wider mb-1">XP Earned</p>
              <p className="text-4xl font-black text-emerald-400">+{xpGained}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePlayAgain}
              className="px-8 py-3 rounded-xl font-bold text-white transition-transform hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-surface)]"
              style={{ backgroundColor: brandColor }}
            >
              Play Again
            </button>
            <button
              onClick={() => navigate({ name: 'hub' })}
              className="px-8 py-3 rounded-xl font-bold text-slate-300 bg-white/10 hover:bg-white/20 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-surface)]"
            >
              Back to Map
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-20">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate({ name: 'hub' })}
          className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <div className="text-sm font-bold text-slate-400">
          Question <span className="text-white">{currentIndex + 1}</span> of {items.length}
        </div>
      </div>

      <div className="rounded-3xl bg-[var(--color-brand-surface)] p-6 sm:p-8 shadow-xl border border-white/5 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-1 bg-gradient-to-r transition-all duration-300 ease-out" 
          style={{ 
            width: `${((currentIndex) / items.length) * 100}%`,
            backgroundImage: `linear-gradient(to right, var(--color-brand-cyan), ${brandColor})`
          }} 
        />
        
        <div className="flex items-start gap-4 mb-6">
          <span className="text-3xl shrink-0" aria-hidden="true">{topic.icon}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            {currentItem.question.prompt}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {currentItem.options.map((opt, idx) => {
            const isSelected = selectedIdx === idx
            const isCorrectAnswer = currentItem.correctIndex === idx
            
            let btnClass = "bg-[#0b1020] border-white/10 text-slate-200 hover:bg-white/5 hover:border-white/20"
            let icon = <span className="w-6 h-6 flex items-center justify-center rounded bg-white/10 text-xs font-bold shrink-0">{idx + 1}</span>
            let textClass = ""

            if (selectedIdx !== null) {
              if (isCorrectAnswer) {
                btnClass = "bg-emerald-950/40 border-emerald-500/50 text-emerald-100"
                icon = <span className="w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500 text-white shrink-0">✓</span>
                textClass = "font-semibold"
              } else if (isSelected) {
                btnClass = "bg-rose-950/40 border-rose-500/50 text-rose-100 opacity-80"
                icon = <span className="w-6 h-6 flex items-center justify-center rounded-full bg-rose-500 text-white shrink-0">✗</span>
                textClass = "line-through opacity-70"
              } else {
                btnClass = "bg-[#0b1020] border-transparent opacity-40 grayscale"
                icon = <span className="w-6 h-6 flex items-center justify-center rounded bg-white/5 text-xs font-bold shrink-0 opacity-50">{idx + 1}</span>
              }
            }

            return (
              <button
                key={idx}
                disabled={selectedIdx !== null}
                onClick={() => handleSelect(idx)}
                className={`flex items-center gap-4 text-left w-full p-4 rounded-xl border-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-surface)] ${btnClass}`}
              >
                {icon}
                <span className={`text-base sm:text-lg ${textClass}`}>{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {selectedIdx !== null && (
        <div className="fx-rise">
          <div className={`rounded-2xl p-6 border ${selectedIdx === currentItem.correctIndex ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-rose-950/20 border-rose-500/20'}`}>
            <h3 className={`text-lg font-bold mb-2 ${selectedIdx === currentItem.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
              {selectedIdx === currentItem.correctIndex ? 'Correct!' : 'Incorrect'}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {currentItem.question.explanation}
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              autoFocus
              onClick={handleNext}
              className="px-8 py-3 bg-white text-[var(--color-brand-bg)] rounded-xl font-black text-lg transition-transform hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-bg)]"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
