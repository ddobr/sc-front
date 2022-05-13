
export type ILocation = IChapterLocation | IQuizLocation;

interface IChapterLocation {
    type: 'chapter',
    sectionId: number,
    chapterId: number,
    courseId: number,
}

interface IQuizLocation {
    type: 'quiz',
    sectionId: number,
    courseId: number,
}