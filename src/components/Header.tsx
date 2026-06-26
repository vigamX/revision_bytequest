import type { ProgressState } from '../types'
import { level, xpIntoLevel } from '../lib/progress'
import type { View } from '../App'

interface HeaderProps {
  progress: ProgressState
  navigate: (view: View) => void
  currentView: string
}

export function Header({ progress, navigate, currentView }: HeaderProps) {
  const currentLvl = level(progress.xp)
  const { current, needed } = xpIntoLevel(progress.xp)
  const percent = Math.round((current / needed) * 100)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-brand-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ name: 'hub' })}
            className="group flex items-center gap-2 text-2xl font-black tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-bg)] rounded-sm"
          >
            <span className="bg-gradient-to-br from-[var(--color-brand-cyan)] to-[var(--color-brand-violet)] bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              &gt;_
            </span>
            <span>ByteQuest</span>
          </button>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-300">
            OCR J277
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="text-sm font-bold text-slate-200">
              Lvl {currentLvl}
            </div>
            <div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-slate-800 shadow-inner sm:w-40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-violet)] transition-all duration-500 ease-out"
                style={{ width: `${percent}%` }}
                role="progressbar"
                aria-valuenow={current}
                aria-valuemin={0}
                aria-valuemax={needed}
              />
            </div>
          </div>

          <nav className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate({ name: 'hub' })}
              className={`rounded-md px-3 py-1.5 text-sm font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-bg)] ${
                currentView === 'hub'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Hub
            </button>
            <button
              type="button"
              onClick={() => navigate({ name: 'stats' })}
              className={`rounded-md px-3 py-1.5 text-sm font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-bg)] ${
                currentView === 'stats'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Stats
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
