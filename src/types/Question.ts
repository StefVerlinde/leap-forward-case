export type Questions = Question[]

export interface Question {
    question: string
    time_limit_s: number
    answers: Answer[]
}

export interface Answer {
    answer: string
    correct: boolean
}
