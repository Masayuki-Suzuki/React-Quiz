import Header from './molecues/Header'
import Main from './pages/Main'
import { useContext, useEffect } from 'react'
import Loader from './molecues/Loader'
import Error from './molecues/Error'
import StartScreen from './pages/StartScreen'
import { QuestionsContext } from './contexts/QuestionsContext'
import Questions from './pages/Questions'
import FinishScreen from './pages/FinishScreen'

function App() {
    const {
        state: { status },
        fetchQuestions
    } = useContext(QuestionsContext)

    useEffect(() => {
        void fetchQuestions()
    }, [])

    return (
        <div className="app">
            <Header />
            <Main>
                <>
                    {status === 'loading' && <Loader />}
                    {status === 'error' && <Error />}
                    {status === 'ready' && <StartScreen />}
                    {status === 'active' && <Questions />}
                    {status === 'calculating' && <Loader text="Calculating your score..." />}
                    {status === 'finished' && <FinishScreen />}
                </>
            </Main>
        </div>
    )
}

export default App
