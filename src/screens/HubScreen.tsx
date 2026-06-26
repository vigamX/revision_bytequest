import { PAPERS, TOPICS_BY_ID } from '../data/topics'
import { topicHasQuestions } from '../lib/quiz'
import type { ProgressState } from '../types'
import type { View } from '../App'

interface HubScreenProps {
  progress: ProgressState
  navigate: (view: View) => void
}

export function HubScreen({ progress, navigate }: HubScreenProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl text-white">
          Choose your zone
        </h1>
        <p className="mt-3 text-lg text-slate-400">
          Select a topic to revise or jump into the arcade.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => navigate({ name: 'converter' })}
          className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[var(--color-brand-surface)] p-6 outline-none transition-all hover:-translate-y-1 hover:bg-[var(--color-brand-surface-highlight)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-bg)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="text-4xl">🕹️</span>
          <h2 className="text-xl font-bold text-white">Base Converter Arcade</h2>
          <p className="text-center text-sm text-slate-400">
            60-second binary & hex challenge
          </p>
        </button>

        <button
          type="button"
          onClick={() => navigate({ name: 'stats' })}
          className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[var(--color-brand-surface)] p-6 outline-none transition-all hover:-translate-y-1 hover:bg-[var(--color-brand-surface-highlight)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-bg)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="text-4xl">📊</span>
          <h2 className="text-xl font-bold text-white">Your Stats</h2>
          <p className="text-center text-sm text-slate-400">
            View mastery and progress details
          </p>
        </button>
      </div>

      {PAPERS.map((paper) => {
        const isCyan = paper.theme === 'cyan'
        const colorVar = isCyan
          ? 'var(--color-brand-cyan)'
          : 'var(--color-brand-violet)'
        const borderHover = isCyan ? 'hover:border-[var(--color-brand-cyan)]' : 'hover:border-[var(--color-brand-violet)]'
        const ringFocus = isCyan ? 'focus-visible:ring-[var(--color-brand-cyan)]' : 'focus-visible:ring-[var(--color-brand-violet)]'

        return (
          <section key={paper.id} className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: colorVar, boxShadow: `0 0 10px ${colorVar}` }}
                />
                {paper.code}: {paper.name}
              </h2>
              <p className="mt-1 text-slate-400">{paper.blurb}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paper.topicIds.map((id) => {
                const topic = TOPICS_BY_ID[id]
                if (!topic) return null

                const tp = progress.topics[topic.id]
                const mastery = tp?.mastery ?? 0
                const attempts = tp?.attempts ?? 0
                const hasQs = topicHasQuestions(topic.id)

                return (
                  <button
                    key={topic.id}
                    type="button"
                    disabled={!hasQs}
                    onClick={() => hasQs && navigate({ name: 'quiz', topicId: topic.id })}
                    className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-brand-surface)] p-5 text-left outline-none transition-all ${
                      hasQs
                        ? `${borderHover} hover:-translate-y-1 hover:bg-[var(--color-brand-surface-highlight)] hover:shadow-lg focus-visible:ring-2 ${ringFocus} focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-bg)]`
                        : 'opacity-50 cursor-not-allowed grayscale'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-3xl" aria-hidden="true">
                          {topic.icon}
                        </span>
                        <span className="rounded bg-white/5 px-2 py-1 text-xs font-bold text-slate-300">
                          {topic.id}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-white group-hover:text-white transition-colors">
                        {topic.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Mastery
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full transition-all duration-700 ease-out"
                              style={{
                                width: `${Math.round(mastery * 100)}%`,
                                backgroundColor: mastery > 0 ? colorVar : '',
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-300">
                            {Math.round(mastery * 100)}%
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Played
                        </span>
                        <span className="text-xs font-bold text-slate-300">
                          {attempts}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
