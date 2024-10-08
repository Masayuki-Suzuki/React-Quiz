import { Question as QuestionType } from '../state/types'
import { Nullable } from '../types/utilities'

type QuestionPropsType = {
    question: QuestionType
    onAnswerQuestion: (answer: number) => void
    answer: Nullable<number>
    isAnswered: boolean
}

const Question = ({ question, onAnswerQuestion, answer, isAnswered }: QuestionPropsType) => (
    <div className="options">
        {question.options.map((option, index) => (
            <button
                onClick={() => onAnswerQuestion(index)}
                className={`btn btn-option ${isAnswered ? (index === answer ? 'answer correct' : 'wrong') : ''}`}
                disabled={isAnswered}
                key={option}
            >
                {option}
            </button>
        ))}
    </div>
)

export default Question
