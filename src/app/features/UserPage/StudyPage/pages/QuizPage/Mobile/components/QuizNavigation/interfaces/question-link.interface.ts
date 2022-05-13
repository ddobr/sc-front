export interface IQuestionLink {
    id: number,
    answered: boolean,
    grade?: {
        correct: boolean
    }
}