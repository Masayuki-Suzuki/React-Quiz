import { Nullable, PromiseVoidFunction } from '../types/utilities'
import { VoidFunction } from '../types/utilities'

export type Question = {
    question: string
    options: string[]
    points: number
    correctOption: number
}

export type QuestionActionTypes =
    | 'SET_QUESTIONS'
    | 'DATA_FETCH_ERROR'
    | 'DATA_FETCH'
    | 'START_QUIZ'
    | 'CALCULATE'
    | 'FINISH_QUIZ'
    | 'RESTART_QUIZ'
    | 'NEXT_QUESTION'
    | 'NEW_ANSWER'
    | 'TICK'

export type QuestionAction = {
    type: QuestionActionTypes
    payload?: Question[] | number
}

export type AppError = {
    message: string
    httpStatus: number
}

export type Status = 'loading' | 'ready' | 'error' | 'active' | 'calculating' | 'finished'

export type AppState = {
    index: number
    score: number
    highScore: number
    status: Status
    questions: Question[]
    answer: Nullable<number>
    error: Nullable<AppError>
    secondsRemaining: Nullable<number>
}

export type QuestionContext = {
    state: AppState
    tick: VoidFunction
    startQuiz: VoidFunction
    finishQuiz: VoidFunction
    restartQuiz: VoidFunction
    nextQuestion: VoidFunction
    calculateScore: VoidFunction
    handleFetchError: VoidFunction
    fetchQuestions: PromiseVoidFunction
    addNewAnswer: (answer: number) => void
    setQuestions: (questions: Question[]) => void
}
