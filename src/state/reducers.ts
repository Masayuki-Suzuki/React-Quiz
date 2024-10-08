import { useReducer } from 'react'
import { AppState, Question, QuestionAction, QuestionContext } from './types'
import { fetchQuestionsData } from './questionsAPI'
import { sleep } from '../libs/utilities'
import initialState from './initialState'

const SECONDS_PER_QUIZ = 30

export const questionsReducer = (state: AppState, action: QuestionAction): AppState => {
    switch (action.type) {
        case 'SET_QUESTIONS': {
            const questions = action.payload ? action.payload : []

            if (typeof questions === 'number' || questions.length === 0) {
                return state
            }

            return { ...state, questions, status: 'ready' }
        }

        case 'DATA_FETCH':
            return { ...state, status: 'loading' }

        case 'DATA_FETCH_ERROR':
            return { ...state, status: 'error' }

        case 'START_QUIZ':
            return { ...state, status: 'active', secondsRemaining: state.questions.length * SECONDS_PER_QUIZ }

        case 'CALCULATE':
            return {
                ...state,
                status: 'calculating',
                secondsRemaining: null
            }

        case 'FINISH_QUIZ': {
            const savedScore = parseInt(localStorage.getItem('highScore') || '0', 10)

            if (state.score > savedScore) {
                localStorage.setItem('highScore', String(state.score))
            }
            return { ...state, status: 'finished', highScore: Math.max(state.score, savedScore) }
        }

        case 'RESTART_QUIZ':
            return {
                ...initialState,
                questions: state.questions,
                highScore: state.highScore,
                status: 'ready'
            }

        case 'NEW_ANSWER': {
            const question = state.questions.at(state.index)
            if (question && typeof action.payload === 'number') {
                const points = question.correctOption === action.payload ? question.points : 0
                return { ...state, answer: action.payload, score: state.score + points }
            }

            return state
        }

        case 'NEXT_QUESTION': {
            const status = state.index < state.questions.length - 1 ? 'active' : 'calculating'

            return {
                ...state,
                index: state.index + 1,
                answer: null,
                status
            }
        }

        case 'TICK': {
            const remaining = state.secondsRemaining ? state.secondsRemaining - 1 : 0

            return {
                ...state,
                secondsRemaining: remaining,
                status: remaining <= 0 ? 'calculating' : state.status
            }
        }

        default:
            return state
    }
}

export const useQuestionsReducer = (initialState: AppState): QuestionContext => {
    const [state, dispatch] = useReducer(questionsReducer, initialState)

    const setQuestions = (questions: Question[]) => dispatch({ type: 'SET_QUESTIONS', payload: questions })
    const handleFetchError = () => dispatch({ type: 'DATA_FETCH_ERROR' })
    const loadingQuestions = () => dispatch({ type: 'DATA_FETCH' })
    const startQuiz = () => dispatch({ type: 'START_QUIZ' })
    const nextQuestion = () => dispatch({ type: 'NEXT_QUESTION' })
    const addNewAnswer = (answer: number) => dispatch({ type: 'NEW_ANSWER', payload: answer })
    const finishQuiz = () => dispatch({ type: 'FINISH_QUIZ' })
    const restartQuiz = () => dispatch({ type: 'RESTART_QUIZ' })
    const tick = () => dispatch({ type: 'TICK' })

    const fetchQuestions = async () => {
        loadingQuestions()
        const questions = await fetchQuestionsData(handleFetchError)
        await sleep(2000)
        if (questions) {
            setQuestions(questions)
        }
    }

    const calculateScore = async () => {
        dispatch({ type: 'CALCULATE' })
        await sleep(2000)
        finishQuiz()
    }

    return {
        state,
        setQuestions,
        handleFetchError,
        fetchQuestions,
        startQuiz,
        nextQuestion,
        addNewAnswer,
        calculateScore,
        finishQuiz,
        restartQuiz,
        tick
    }
}
