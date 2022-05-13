import { ReadContentType, IFullNewsArticle, IShortNewsArticle } from "../../../../models";

export const fakeShortNews: IShortNewsArticle[] =[
    {
        id: 0,
        title: '«Эффект разбитого зеркала»: стоматолог предупредила об опасности кофе глясе в жару',
        description: 'Стоматолог предупредила, что популярный в жаркую погоду кофе глясе может быть опасным для здоровья зубов.',
        date: 'Сегодня',
        img: 'https://www.abc4.com/wp-content/uploads/sites/4/2021/04/GettyImages-1191285127.jpg?strip=1'
    },
    {
        id: 2,
        title: 'В мире любят кофе',
        description: 'Это почему ты кофе не любишь, а потому что у тебя хорошего кофе не было!',
        date: '07.07.2021',
        img: 'https://images.immediate.co.uk/production/volatile/sites/30/2017/07/GettyImages-1204189958-fb4b98b.jpg?quality=90&resize=960%2C872'
    },
    {
        id: 3,
        title: 'Какой-то очень преочень длинный тайтл, ну прямо очень',
        description: 'Описание короткое, но не тут то было, описание еще длиннее заголовка, читай, не ленись! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to ma',
        date: 'Вчера',
        img: 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2020/04/23/16/coffee-2304.jpg?width=968&auto=webp&quality=75&crop=968%3A645%2Csmart'
    },
];

export const fakeFullNewsArticle: IFullNewsArticle = {
    id: 0,
    title: '«Эффект разбитого зеркала»: стоматолог предупредила об опасности кофе глясе в жару',
    date: '12.07.2021',
    content: [
        {
            type: ReadContentType.Image,
            entity: 'https://radiokp.ru/sites/default/files/styles/kp_fullnode_730_486/public/2021-07/cafe-1851114_1280.jpg?itok=_Z1KzFPd'
        },
        {
            type: ReadContentType.Highlight,
            entity: 'Восстановить эмаль можно, но придется потратить на это время и деньги.'
        },
        {
            type: ReadContentType.Paragraph,
            entity: 'Стоматолог-гигиенист Екатерина Довгаль предупредила, что популярный в жаркую погоду кофе глясе может быть опасным для здоровья зубов.'
        },
        {
            type: ReadContentType.Paragraph,
            entity: '«Глясе — самый вредный вид кофе для зубов. Из-за резкого перепада температуры на эмали зубов образуются трещины, и мы получаем так называемый "эффект разбитого зеркала". В дальнейшем это приводит к сколам и чувствительности зубов», — цитирует ее «Доктор Питер».'
        },
        {
            type: ReadContentType.Paragraph,
            entity: 'Специалист отметила, что восстановить эмаль можно, но придется потратить на это время и деньги, поэтому любителям холодных напитков лучше заняться профилактикой.'
        },
        {
            type: ReadContentType.Paragraph,
            entity: '«Если без глясе вы не можете представить свой день, тогда вооружайтесь всеми подручными средствами: пастами и гелями на основе кальция, фосфора, гидроксиапатита, которые обычно назначает врач, стоматолог-гигиенист», — пояснила стоматолог.'
        },
        {
            type: ReadContentType.Paragraph,
            entity: 'Ранее врач-диетолог, член Национальной ассоциации диетологов и нутрициологов России Наталья Круглова рассказала, почему опасно пить айс-кофе в жару.'
        },
        {
            type: ReadContentType.Paragraph,
            entity: 'Она объяснила, что в таком напитке содержится такое же количество кофеина, как и в обычном кофе. В жару опасно превышать норму потребления этого бодрящего компонента.'
        }
    ]
}