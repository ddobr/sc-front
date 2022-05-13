import { IReadContent } from "../content";

export interface IFullNewsArticle {
    id: number,
    title: string,
    date: string,
    content: IReadContent[]
}