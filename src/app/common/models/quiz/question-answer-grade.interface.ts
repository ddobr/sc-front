export interface IQuestionAnswerGrade {
    question_id: number,
    is_correct: boolean,
    user_answers: {
        [key: string]: { 
            is_correct: boolean,
            caption: string|null
        }
    }
}