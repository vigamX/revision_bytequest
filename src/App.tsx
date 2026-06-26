import { useState } from 'react'
import { useProgress } from './hooks/useProgress'
import { Header } from './components/Header'
import { HubScreen } from './screens/HubScreen'
import { QuizScreen } from './screens/QuizScreen'
import { ConverterScreen } from './screens/ConverterScreen'
import { StatsScreen } from './screens/StatsScreen'

export type View =
  | { name: 'hub' }
  | { name: 'quiz'; topicId: string }
  | { name: 'converter' }
  | { name: 'stats' }

function App() {
  const progressHooks = useProgress()
  const [view, setView] = useState<View>({ name: 'hub' })

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header progress={progressHooks.progress} navigate={setView} currentView={view.name} />
      
      <main className="flex-1 px-4 py-8 sm:px-6 md:px-8">
        <div className="mx-auto max-w-5xl">
          {view.name === 'hub' && (
            <HubScreen progress={progressHooks.progress} navigate={setView} />
          )}
          {view.name === 'quiz' && (
            <QuizScreen
              topicId={view.topicId}
              progress={progressHooks.progress}
              recordAnswer={progressHooks.recordAnswer}
              navigate={setView}
            />
          )}
          {view.name === 'converter' && (
            <ConverterScreen
              progressBest={progressHooks.progress.converterBest}
              recordConverterScore={progressHooks.recordConverterScore}
              navigate={setView}
            />
          )}
          {view.name === 'stats' && (
            <StatsScreen
              progress={progressHooks.progress}
              resetProgress={progressHooks.resetProgress}
              navigate={setView}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App

