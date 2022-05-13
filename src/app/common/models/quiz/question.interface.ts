import { QuestionType } from "../enums";

export interface IQuestion {
    id: number,
    type: QuestionType,
    title: string,
    description: string,
    image: string,
    answer_options: string[]
}

