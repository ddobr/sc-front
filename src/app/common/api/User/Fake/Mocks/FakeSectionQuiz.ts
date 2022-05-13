import { IQuizGrade } from "../../../../models"

export const FakeSectionQuizResult : IQuizGrade = {
    result: 42,
    answers: [
        {
            question_id: 0,
            is_correct: true,
            user_answers: {
                'чайник': {
                    is_correct: true,
                    caption: 'Воду можно также варить и в других емкостях. Это так, к сведению.'
                }
            }
        },
        {
            question_id: 1,
            is_correct: false,
            user_answers: {
                'Варить кофе': {
                    is_correct: true,
                    caption: 'Более того, это Ваша обязанность!'
                }, 
            }
        },
        {
            question_id: 2,
            is_correct: false,
            user_answers: {
                'У вас ссылка битая': {
                    is_correct: false,
                    caption: 'Ничего она не битая! Мы проверили!'
                }
            }
        },
        {
            question_id: 3,
            is_correct: false,
            user_answers: { 'Кофе': {
                is_correct: false,
                caption: 'Ну и что ты тут увидел? Зачем тыкнул?'
            } }
        },
        {
            question_id: 4,
            is_correct: true,
            user_answers: {
                'Гнилая груша': {
                    is_correct: true,
                    caption: 'Многие считают, что правильный ответ - это лампочка, но это полнейший бред. Причём здесь вообще лампочка?'
                }
            }
        },
        {
            question_id: 5,
            is_correct: true,
            user_answers: {
                'Гнилая груша': {
                    is_correct: true,
                    caption: 'Многие считают, что правильный ответ - это лампочка, но это полнейший бред. Причём здесь вообще лампочка?'
                }
            }
        },
        {
            question_id: 6,
            is_correct: true,
            user_answers: {
                'Гнилая груша': {
                    is_correct: true,
                    caption: 'Многие считают, что правильный ответ - это лампочка, но это полнейший бред. Причём здесь вообще лампочка?'
                }
            }
        },
        {
            question_id: 7,
            is_correct: true,
            user_answers: {
                'Гнилая груша': {
                    is_correct: true,
                    caption: 'Многие считают, что правильный ответ - это лампочка, но это полнейший бред. Причём здесь вообще лампочка?'
                }
            }
        },
        {
            question_id: 8,
            is_correct: true,
            user_answers: {
                'Гнилая груша': {
                    is_correct: true,
                    caption: 'Многие считают, что правильный ответ - это лампочка, но это полнейший бред. Причём здесь вообще лампочка?'
                }
            }
        },
        {
            question_id: 9,
            is_correct: true,
            user_answers: {
                'Гнилая груша': {
                    is_correct: true,
                    caption: 'Многие считают, что правильный ответ - это лампочка, но это полнейший бред. Причём здесь вообще лампочка?'
                }
            }
        }
    ]
}