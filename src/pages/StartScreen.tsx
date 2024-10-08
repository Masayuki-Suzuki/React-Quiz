import { useContext } from 'react'
import { QuestionsContext } from '../contexts/QuestionsContext'

const StartScreen = () => {
    const { state, startQuiz } = useContext(QuestionsContext)
    const numQuestions = state.questions.length

    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} question to test your React mastery</h3>
            <button onClick={startQuiz} className="btn btn-ui">
                Let's Start
            </button>
        </div>
    )
}

export default StartScreen
