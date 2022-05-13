import { IQuestion } from "./question.interface";

export interface IQuiz {
    id: number
    title: string,
    questions: IQuestion[],
    /** Когда квиз кончится */
    end_timestamp: number,
    /** Сколько секунд дается на тест */
    quiz_duration_seconds: number,
}