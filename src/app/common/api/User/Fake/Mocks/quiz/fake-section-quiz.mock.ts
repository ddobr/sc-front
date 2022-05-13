import { IQuiz, QuestionType } from "../../../../../models"

export class FakeSectionQuiz {
    private static _fakeSectionQuiz: IQuiz = {
        id: 0,
        title: 'Квиз 1', 
        end_timestamp: 0,
        quiz_duration_seconds: 60 * 1,
        questions: [
            {
                id: 0, 
                type: QuestionType.Fill, 
                title: "Где варят воду?", 
                description: 'впишите одно слово в именительном падеже',
                image: '', 
                answer_options: []
            },
            {
                id: 1, 
                type: QuestionType.Multiple, 
                title: "Что можно делать на работе?", 
                description: '',
                image: '', 
                answer_options: [
                    'Пить кофе',
                    'Варить кофе',
                    'Думать о конце рабочего дня',
                    'Требовать з/п'
                ]
            },
            {
                id: 2, 
                type: QuestionType.Single, 
                description: '',
                title: "Что изображено на картинке?", 
                image: 'https://cf.ppt-online.org/files/slide/k/K2wSMlojAZWfRTVUY96ve05Jm8h4cxsuDa1Qyb/slide-0.jpg', 
                answer_options: [
                    'Турка',
                    'Капучинатор',
                    'Кофе',
                    'У вас ссылка битая'
                ]
            },
            {
                id: 3, 
                type: QuestionType.Single, 
                description: '',
                title: "Что изображено на картинке?", 
                image: '', 
                answer_options: [
                    'Турка',
                    'Капучинатор',
                    'Кофе',
                    'У вас ссылка битая'
                ]
            },
            {
                id: 4, 
                type: QuestionType.Fill, 
                description: '',
                title: 'Висит груша, нельзя скушать. Что это?', 
                image: '', 
                answer_options: []
            },
            {
                id: 5, 
                type: QuestionType.Fill, 
                description: '',
                title: 'Висит груша, нельзя скушать. Что это?', 
                image: '', 
                answer_options: []
            },
            {
                id: 6, 
                type: QuestionType.Fill, 
                description: '',
                title: 'Висит груша, нельзя скушать. Что это?', 
                image: '', 
                answer_options: []
            },
            {
                id: 7, 
                type: QuestionType.Fill, 
                description: '',
                title: 'Висит груша, нельзя скушать. Что это?', 
                image: '', 
                answer_options: []
            },
            {
                id: 8, 
                type: QuestionType.Fill, 
                description: '',
                title: 'Висит груша, нельзя скушать. Что это?', 
                image: '', 
                answer_options: []
            },
            {
                id: 9, 
                type: QuestionType.Fill, 
                description: '',
                title: 'Висит груша, нельзя скушать. Что это?', 
                image: '', 
                answer_options: []
            },
        ]
    }

    public static startSectionQuiz(): IQuiz {
        this._fakeSectionQuiz.end_timestamp = Date.now() + 1000 * 60 * 1;

        return {
            ...this._fakeSectionQuiz
        }
    }

    public static getStartedSectionQuiz(): IQuiz {
        return {
            ...this._fakeSectionQuiz
        }
    }
}