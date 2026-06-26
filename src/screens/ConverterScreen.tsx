import { useState, useEffect, useRef } from 'react'
import { nextChallenge, isCorrect } from '../lib/converter'
import type { ConverterChallenge } from '../lib/converter'
import type { View } from '../App'

interface ConverterScreenProps {
  progressBest: number
  recordConverterScore: (score: number) => void
  navigate: (view: View) => void
}

type ArcadeState = 'start' | 'playing' | 'gameover'

export function ConverterScreen({ progressBest, recordConverterScore, navigate }: ConverterScreenProps) {
  const [gameState, setGameState] = useState<ArcadeState>('start')
  const [timeLeft, setTimeLeft] = useState(60)
  const [score, setScore] = useState(0)
  const [challenge, setChallenge] = useState<ConverterChallenge | null>(null)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong', msg: string } | null>(null)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const scoreRecorded = useRef(false)

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setGameState('gameover')
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameState])

  useEffect(() => {
    if (gameState === 'gameover' && !scoreRecorded.current) {
      recordConverterScore(score)
      scoreRecorded.current = true
    }
  }, [gameState, score, recordConverterScore])

  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [gameState, challenge])

  const startGame = () => {
    setGameState('playing')
    setTimeLeft(60)
    setScore(0)
    setChallenge(nextChallenge())
    setInput('')
    setFeedback(null)
    scoreRecorded.current = false
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!challenge || !input.trim()) return

    const correct = isCorrect(input, challenge)
    if (correct) {
      setScore(s => s + 1)
      setFeedback({ type: 'correct', msg: '+1' })
    } else {
      setFeedback({ type: 'wrong', msg: `Was ${challenge.answer}` })
    }

    setChallenge(nextChallenge())
    setInput('')
    
    setTimeout(() => {
      setFeedback(null)
    }, 1500)
  }

  if (gameState === 'start') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4">
        <div className="text-6xl mb-6">🕹️</div>
        <h1 className="text-4xl font-black text-white mb-4">Base Converter Arcade</h1>
        <p className="text-xl text-slate-400 mb-8">
          You have 60 seconds to convert as many numbers between binary, denary, and hexadecimal as possible.
        </p>
        <div className="bg-[var(--color-brand-surface)] p-6 rounded-2xl mb-8 border border-white/5 inline-block text-left">
          <h3 className="font-bold text-white mb-2 uppercase tracking-wide text-sm text-slate-500">Rules</h3>
          <ul className="list-disc list-inside text-slate-300 space-y-2 marker:text-[var(--color-brand-cyan)]">
            <li>Type the answer and press Enter.</li>
            <li>No penalty for wrong answers, but they waste time.</li>
            <li>Hex letters can be upper or lower case.</li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={startGame}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xl rounded-xl transition-transform hover:scale-105 active:scale-95 glow-cyan"
          >
            START ARCADE
          </button>
          <button
            onClick={() => navigate({ name: 'hub' })}
            className="px-8 py-4 rounded-xl font-bold text-slate-300 bg-white/10 hover:bg-white/20 transition-colors"
          >
            Back to Map
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'gameover') {
    const isNewBest = score > progressBest

    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-full rounded-3xl bg-[var(--color-brand-surface)] p-8 shadow-2xl border border-white/10 relative overflow-hidden">
          <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-widest text-slate-500">Time's Up!</h2>
          
          <div className="mb-10 relative">
            <p className="text-slate-400 text-sm uppercase font-bold tracking-wider mb-2">Final Score</p>
            <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 inline-block drop-shadow-lg">
              {score}
            </p>
            {isNewBest && (
              <div className="absolute top-0 right-0 sm:right-10 rotate-12 bg-rose-500 text-white px-3 py-1 font-black rounded-lg text-sm shadow-lg animate-bounce">
                NEW BEST!
              </div>
            )}
          </div>
          
          <p className="text-lg text-slate-400 mb-8">
            Previous Best: <span className="font-bold text-white">{progressBest}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black rounded-xl transition-transform hover:scale-105 active:scale-95"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate({ name: 'hub' })}
              className="px-8 py-3 rounded-xl font-bold text-slate-300 bg-white/10 hover:bg-white/20 transition-colors"
            >
              Back to Map
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate({ name: 'hub' })}
          className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          ← Quit
        </button>
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Score</div>
            <div className="text-2xl font-black text-white">{score}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Time</div>
            <div className={`text-2xl font-black ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
              {timeLeft}s
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-[var(--color-brand-surface)] p-8 shadow-2xl border border-white/5 relative text-center">
        {feedback && (
          <div className={`absolute top-4 right-4 font-black text-lg fx-rise ${feedback.type === 'correct' ? 'text-emerald-400' : 'text-rose-500'}`}>
            {feedback.msg}
          </div>
        )}
        
        <p className="text-lg font-medium text-[var(--color-brand-cyan-light)] mb-4 uppercase tracking-wide">
          {challenge?.instruction}
        </p>
        
        <div className="py-8 bg-[#0b1020] rounded-xl border border-white/5 mb-8 shadow-inner">
          <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-widest break-all px-4">
            {challenge?.given}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#0b1020] border-2 border-white/10 rounded-xl px-6 py-4 text-2xl font-mono text-white placeholder-slate-600 focus:border-[var(--color-brand-cyan)] focus:outline-none transition-colors text-center uppercase"
            placeholder={`Enter ${challenge?.answerBase}...`}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-white text-[var(--color-brand-bg)] font-black text-xl rounded-xl transition-transform hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-surface)]"
          >
            ↵
          </button>
        </form>
      </div>
    </div>
  )
}
