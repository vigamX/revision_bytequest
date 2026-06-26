import { PAPERS, TOPICS_BY_ID } from '../data/topics'
import { level, overallAccuracy } from '../lib/progress'
import type { ProgressState } from '../types'
import type { View } from '../App'

interface StatsScreenProps {
  progress: ProgressState
  resetProgress: () => void
  navigate: (view: View) => void
}

export function StatsScreen({ progress, resetProgress, navigate }: StatsScreenProps) {
  const acc = Math.round(overallAccuracy(progress) * 100)
  const currentLvl = level(progress.xp)

  const handleReset = () => {
    if (window.confirm('Are you sure you want to completely reset your progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div className="flex flex-col gap-10 pb-20">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate({ name: 'hub' })}
          className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          ← Back to Map
        </button>
        <h1 className="text-3xl font-black text-white">Your Stats</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[var(--color-brand-surface)] p-6 shadow-lg border border-white/5">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Level</span>
          <span className="mt-2 text-5xl font-black text-white">{currentLvl}</span>
          <span className="mt-1 text-sm text-[var(--color-brand-cyan-light)]">{progress.xp} XP</span>
        </div>
        
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[var(--color-brand-surface)] p-6 shadow-lg border border-white/5">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Accuracy</span>
          <span className="mt-2 text-5xl font-black text-white">{acc}%</span>
          <span className="mt-1 text-sm text-slate-400">
            {progress.totalCorrect} / {progress.totalAttempts} correct
          </span>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl bg-[var(--color-brand-surface)] p-6 shadow-lg border border-white/5">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Arcade Best</span>
          <span className="mt-2 text-5xl font-black text-white">{progress.converterBest}</span>
          <span className="mt-1 text-sm text-slate-400">Score</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {PAPERS.map((paper) => {
          const isCyan = paper.theme === 'cyan'
          const colorVar = isCyan ? 'var(--color-brand-cyan)' : 'var(--color-brand-violet)'

          return (
            <div key={paper.id} className="rounded-3xl bg-[var(--color-brand-surface)] p-6 sm:p-8 shadow-xl border border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: colorVar, boxShadow: `0 0 8px ${colorVar}` }}
                />
                {paper.name}
              </h2>
              
              <div className="flex flex-col gap-4">
                {paper.topicIds.map((id) => {
                  const topic = TOPICS_BY_ID[id]
                  if (!topic) return null

                  const tp = progress.topics[id]
                  const mastery = tp?.mastery ?? 0
                  const pct = Math.round(mastery * 100)
                  const attempts = tp?.attempts ?? 0

                  return (
                    <div key={id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 bg-[#0b1020] p-4 rounded-xl border border-white/5">
                      <div className="w-full sm:w-1/3 flex items-center gap-3">
                        <span className="text-2xl" aria-hidden="true">{topic.icon}</span>
                        <div>
                          <p className="font-bold text-white text-sm sm:text-base leading-tight">{topic.id} {topic.name}</p>
                          <p className="text-xs text-slate-500">{attempts} attempts</p>
                        </div>
                      </div>
                      
                      <div className="w-full sm:w-2/3 flex items-center gap-4">
                        <div className="flex-1 h-3 rounded-full bg-slate-800 overflow-hidden shadow-inner">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: pct > 0 ? colorVar : '',
                            }}
                          />
                        </div>
                        <span className="text-sm font-bold text-white min-w-[3ch] text-right">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleReset}
          className="px-6 py-3 text-sm font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors border border-rose-500/20 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-bg)]"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  )
}
