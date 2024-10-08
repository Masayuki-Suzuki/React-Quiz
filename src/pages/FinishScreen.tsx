import { useContext } from 'react'
import { QuestionsContext } from '../contexts/QuestionsContext'
import Button from '../Atoms/Button'

type FinishScreenPropsType = {}

const FinishScreen = ({}: FinishScreenPropsType) => {
    const {
        state: { score, questions, highScore },
        restartQuiz
    } = useContext(QuestionsContext)
    const maxPossiblePoints = questions.reduce((prev, question) => prev + question.points, 0)
    const percentage = (score / maxPossiblePoints) * 100

    let emoji = ''
    if (percentage === 100) {
        emoji = '🥇'
    }
    if (percentage >= 80 && percentage < 100) {
        emoji = '🥈'
    }
    if (percentage >= 60 && percentage < 80) {
        emoji = '🥉'
    }
    if (percentage === 0) {
        emoji = '🤦🏻‍♂️'
    }

    return (
        <>
            <p className="result">
                {emoji} Your scored <strong>{score}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(Your high score: {highScore} points)</p>
            <Button action={restartQuiz}>Restart Quiz</Button>
        </>
    )
}

export default FinishScreen
