import { ISearchResult } from "../../../../models";

export const fakeSearchResult: ISearchResult[] = [
    {
        type: 'news',
        words: '...время и деньги, поэтому любителям холодных напитков...',
        ids: {
            news_id: 0
        }
    },
    {
        type: 'page',
        words: '...именно поэтому свечка и совершает свои...',
        ids: {
            course_id: 0,
            section_id: 0,
            chapter_id: 0,
            page_id: 2
        }
    },
    {
        type: 'page',
        words: '...кейсы на сайте. Поэтому я и пишу...',
        ids: {
            course_id: 0,
            section_id: 0,
            chapter_id: 0,
            page_id: 1
        }
    },
];