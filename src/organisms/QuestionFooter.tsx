import { useContext } from 'react'
import { QuestionsContext } from '../contexts/QuestionsContext'
import Button from '../Atoms/Button'
import Timer from '../molecues/Timer'

type QuestionFooterPropsType = {
    isAnswered: boolean
}

const QuestionFooter = ({ isAnswered }: QuestionFooterPropsType) => {
    const {
        state: { questions, index },
        nextQuestion,
        calculateScore
    } = useContext(QuestionsContext)

    const numberOfQuestions = questions.length
    const isFinished = index + 1 === numberOfQuestions
    const buttonText = isFinished ? 'Finish' : 'Next'

    return (
        <footer>
            <Timer />
            {isAnswered && <Button action={isFinished ? calculateScore : nextQuestion}>{buttonText}</Button>}
        </footer>
    )
}

export default QuestionFooter
