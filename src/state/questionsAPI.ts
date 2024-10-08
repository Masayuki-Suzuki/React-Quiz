import { Question } from './types'
import { Nullable } from '../types/utilities'

export const fetchQuestionsData = async (errorHandler: VoidFunction): Promise<Nullable<Question[]>> => {
    try {
        // Disabled for Github pages.
        // const res = await fetch('http://localhost:4000/questions')
        // const data: Question[] = await res.json()
        // return data

        // For Github pages.
        const res = await fetch('/React-Quiz/questions.json')
        const { questions } = (await res.json()) as { questions: Question[] }
        return questions
    } catch (error) {
        console.error(error)
        errorHandler()
        return null
    }
}
