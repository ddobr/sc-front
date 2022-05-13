export interface ICourseItem {
    type: 'chapter' | 'quiz',
    id: number,
    nextItem: ICourseItem | null,
    prevItem: ICourseItem | null,
    url: string
}