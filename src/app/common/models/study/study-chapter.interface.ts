import { IStudyPage } from ".";

export interface IStudyChapter {
    id: number,
    title: string,
    pages: IStudyPage[]
}