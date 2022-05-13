export type ISearchResult = { words: string } & (IPageSearchResult | INewsSearchResult)

type IPageSearchResult = {
    type: 'page',
    ids: {
        course_id: number,
        section_id: number,
        chapter_id: number,
        page_id: number
    }
}

type INewsSearchResult = {
    type: 'news',
    ids: {
        news_id: number
    }
}