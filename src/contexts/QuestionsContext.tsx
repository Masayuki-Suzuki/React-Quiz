import { createContext } from 'react'
import { QuestionContext } from '../state/types'
import { OnlyChildrenProps } from '../types/utilities'
import { InitialState, useQuestionsReducer } from '../state'

export const QuestionsContext = createContext({} as QuestionContext)

const QuestionsProvider = ({ children }: OnlyChildrenProps) => {
    const values = useQuestionsReducer(InitialState)

    return <QuestionsContext.Provider value={values}>{children}</QuestionsContext.Provider>
}

export default QuestionsProvider
