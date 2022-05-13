import { IReadContent } from "../content";

export interface IStudyPage {
    id: number,
    title: string,
    content: IReadContent[]
}