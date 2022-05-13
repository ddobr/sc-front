import { IShortQuiz } from "../../../common/models";

export interface SectionCardModel {
    courseId: number,
    sectionTitle: string,
    id: number,
    completedChapters: number,
    openedByDefault: boolean,
    chapters: ChapterCardModel[],
    quiz?: SectionQuizCardModel
}   

export interface ChapterCardModel {
    chapterId: number,
    sectionId: number,
    courseId: number,
    chapterTitle: string,
    disabled: boolean,
    pagesCount: number,
    questionsCount: number,
    progressPercentage: number
}

export interface SectionQuizCardModel extends IShortQuiz {
    disabled: boolean
}