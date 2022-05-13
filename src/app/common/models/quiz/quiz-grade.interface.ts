import { IQuestionAnswerGrade } from "./question-answer-grade.interface";

export interface IQuizGrade {
    result: number,
    answers: IQuestionAnswerGrade[]
}