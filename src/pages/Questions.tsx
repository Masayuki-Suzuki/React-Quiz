import { QuestionsContext } from '../contexts/QuestionsContext'
import { useContext } from 'react'
import Question from '../organisms/Question'
import Progress from '../organisms/Progress'
import QuestionFooter from '../organisms/QuestionFooter'

// type QuestionsPropsType = {}

const Questions = () => {
    const {
        state: { questions, index, answer },
        addNewAnswer
    } = useContext(QuestionsContext)

    const currentQuestion = questions[index]

    const isAnswered = answer !== null

    return (
        <div>
            <Progress />
            <h4>{currentQuestion.question}</h4>
            <Question
                question={currentQuestion}
                onAnswerQuestion={addNewAnswer}
                answer={answer}
                isAnswered={isAnswered}
            />
            <QuestionFooter isAnswered={isAnswered} />
        </div>
    )
}

export default Questions
