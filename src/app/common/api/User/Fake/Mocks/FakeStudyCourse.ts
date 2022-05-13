import { IStudyCourse } from "../../../../models";

export const fakeStudyCourse: IStudyCourse = {
    id: 0,
    title: 'Добро пожаловать в Simple Coffee',
    description: 'Мы открываем свою первую кофейню на улице Хохрякова. Наша мечта - предлагать гостям качественный кофе по демократичной цене, в непринужденной и дружелюбной атмосфере. Стать островком спокойствия и уединения среди городского шума.',
    percentage: 75,
    sections: [
        {
            id: 0,
            title: 'Кто мы?',
            is_available: true,
            chapters: [
                {
                    id: 0, 
                    title: 'Глава 1',
                    pages_number: 3,
                    questionsAmount: 3,
                    percentage: 100,
                    is_available: true
                },
                {
                    id: 1, 
                    title: 'Глава 2',
                    pages_number: 2,
                    questionsAmount: 1,
                    percentage: 95,
                    is_available: true
                },
            ],
            quiz: { 
                id: 0, 
                title: 'Квиз 1', 
                percentage: 100,
                available: true
            }
        },
        {
            id: 1,
            title: 'История',
            is_available: true,
            chapters: [
                {
                    id: 2,
                    title: 'Глава 1',
                    pages_number: 5,
                    questionsAmount: 10,
                    percentage: 87,
                    is_available: true
                },
                {
                    id: 3,
                    title: 'Глава 2',
                    pages_number: 5,
                    questionsAmount: 12,
                    percentage: 0,
                    is_available: false
                },
            ],
            quiz: { 
                id: 1, 
                title: 'Квиз 2', 
                percentage: 0,
                available: false
            }
        }
    ]
}