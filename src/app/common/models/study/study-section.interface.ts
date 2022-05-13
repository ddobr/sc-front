import { IShortStudyChapter } from ".";
import { IShortQuiz } from "../quiz";

export interface IStudySection {
    id: number,
    title: string,
    is_available: boolean,
    chapters: IShortStudyChapter[],
    quiz?: IShortQuiz,
}