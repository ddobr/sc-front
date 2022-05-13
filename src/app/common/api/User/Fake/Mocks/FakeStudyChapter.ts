import { ReadContentType, IStudyChapter } from "../../../../models";

export const fakeStudyChapter: IStudyChapter = {
    id: 0,
    title: 'Посуда',
    pages: [
        {
            id: 0,
            title: 'Посудомойка',
            content: [
                {
                    type: ReadContentType.Paragraph,
                    entity: 'Идейные соображения высшего порядка, а также укрепление и развитие структуры требуют определения и уточнения дальнейших направлений развития. Равным образом новая модель организационной деятельности позволяет оценить значение соответствующий условий активизации. Не следует, однако забывать, что укрепление и развитие структуры требуют определения и уточнения модели развития. С другой стороны постоянный количественный рост и сфера нашей активности требуют от нас анализа новых предложений. С другой стороны сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании существенных финансовых и административных условий.'
                },
                {
                    type: ReadContentType.Youtube,
                    entity: 'https://www.youtube.com/embed/6U87u8HlODo'
                },
                {
                    type: ReadContentType.Paragraph,
                    entity: 'Таким образом дальнейшее развитие различных форм деятельности требуют от нас анализа форм развития. Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки новых предложений. Разнообразный и богатый опыт сложившаяся структура организации позволяет выполнять важные задания по разработке новых предложений. Разнообразный и богатый опыт рамки и место обучения кадров играет важную роль в формировании систем массового участия. Значимость этих проблем настолько очевидна, что сложившаяся структура организации позволяет оценить значение новых предложений.'
                },
                {
                    type: ReadContentType.Highlight,
                    entity: 'А вот тут написано что-то очень важное'
                },
                {
                    type: ReadContentType.Paragraph,
                    entity: 'Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки модели развития. '
                }
            ]
        },
        {
            id: 1,
            title: 'Ложка',
            content: [
                {
                    type: ReadContentType.Highlight,
                    entity: 'Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности представляет собой интересный эксперимент проверки модели развития. '
                },
                {
                    type: ReadContentType.Highlight,
                    entity: 'А вот тут написано что-то очень важное'
                },
                {
                    type: ReadContentType.Paragraph,
                    entity: 'Очень важно в моках писать реалистичные как реалистичные, так и нереалистичные данные, которые будут проверять экстремальные кейсы на сайте. Поэтому я и пишу весь этот текст.'
                },
            ]
        },
        {
            id: 2,
            title: 'Кружка',
            content: [
                {
                    type: ReadContentType.Highlight,
                    entity: 'Последняя страница'
                },
                {
                    type: ReadContentType.Paragraph,
                    entity: 'И именно поэтому свечка и совершает свои колебания'
                },
            ]
        }
    ]
} 