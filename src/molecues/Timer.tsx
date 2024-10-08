import { useContext, useEffect } from 'react'
import { QuestionsContext } from '../contexts/QuestionsContext'

const SECONDS_PER_QUIZ = 30

const Timer = () => {
    const {
        state: { secondsRemaining, questions },
        tick
    } = useContext(QuestionsContext)

    const remainingSeconds = secondsRemaining ? secondsRemaining : questions.length * SECONDS_PER_QUIZ

    const mins = Math.floor(remainingSeconds / 60)
    const secs = remainingSeconds % 60

    useEffect(() => {
        const timer = setInterval(() => {
            tick()
        }, 1000)

        return () => clearInterval(timer)
    }, [tick])

    return (
        <div className="timer">
            {mins < 10 && '0'}
            {mins}:{secs < 10 && '0'}
            {secs}
        </div>
    )
}

export default Timer
