export type Questions = QuestionType[]

export interface QuestionType {
    question: string
    time_limit_s: number
    answers: AnswerType[]
}

export interface AnswerType {
    answer: string
    correct: boolean
}
