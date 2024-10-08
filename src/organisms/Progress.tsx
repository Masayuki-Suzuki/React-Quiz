import { useContext } from 'react'
import { QuestionsContext } from '../contexts/QuestionsContext'

const Progress = () => {
    const {
        state: { answer, index, questions }
    } = useContext(QuestionsContext)

    const numberOfQuestions = questions.length

    return (
        <header className="progress">
            <progress value={index + Number(answer !== null)} max={numberOfQuestions}></progress>
            <p>
                Question <strong>{index + 1}</strong> / {numberOfQuestions}
            </p>
        </header>
    )
}

export default Progress
