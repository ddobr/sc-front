/* BARISTA AND MANAGER NAV METHODS */
export const toCourseContents = (courseId: number) => {
    return `/course/${courseId}`
}

export const toChapter = (courseId: number, sectionId: number, chapterId: number) => {
    return `/course/${courseId}/section/${sectionId}/chapter/${chapterId}`;
}

export const toSectionQuiz = (courseId: number, sectionId: number) => {
    return `/course/${courseId}/section/${sectionId}/quiz`;
}

export const toNewsArticle = (newsId: number) => {
    return `/news/${newsId}`;
}

export const toNews = () => {
    return `/news`;
}

export function index(): string {
    return '/';
}

export function myCourses(): string {
    return '/courses';
}

export function toRecipes(): string {
    return `/recipes`;
}

export function toRecipeType(typeId: number) {
    return `/recipes/${typeId}`;
}

export function toRecipe(typeId: number, recipeId: number) {
    return `/recipes/${typeId}/${recipeId}`;
}