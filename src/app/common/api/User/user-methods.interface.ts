import { 
    IUser, 
    IShortStudyCourse, 
    IStudyChapter, 
    IStudyCourse, 
    IQuiz, 
    IQuestionAnswer, 
    IQuizGrade, 
    IFullNewsArticle, 
    IShortNewsArticle, 
    ISearchResult,
    IQuizSession,
    IQuizPreface,
    IRecipeType,
    IFullRecipeType,
    IFullRecipe
} from "../../models";
import { INewsListRequest } from "../../models/news/news-list-request.interface";
import { ILikedRecipe } from "../../models";

export interface UserMethods {
    login(login: string, password: string): {token: string};

    sendCode(email: string): void;
    validateCodeGetToken(email: string, code: string): {token: string};
    
    // ТЕСТЫ
    getQuizPreface(sectionId: number): IQuizPreface;
    startSectionQuiz(sectionId: number): IQuiz;
    answerSectionQuiz(sectionId: number, answer: IQuestionAnswer[]): IQuizGrade;
    getStartedSectionQuiz(sectionId: number): IQuiz;
    getQuizSession(): IQuizSession;

    getMyProfile(): IUser;
    getMyCourses(): IShortStudyCourse[];
    getChapterContent(chapterId: number): IStudyChapter;
    getCourseContent(courseId: number): IStudyCourse;
    readPage(pageId: number): void;
    getNewsArticle(articleId: number): IFullNewsArticle;
    getNewsList(filter: INewsListRequest): IShortNewsArticle[];
    searchOnSite(query: string): ISearchResult[];

    // РЕЦЕПТЫ
    /** Группы рецептов */
    getRecipeTypes(): IRecipeType[];
    /** 
     * Тип со списком групп рецептов 
     * @param id id типа
     */
    getFullRecipeType(id: number): IFullRecipeType;
    /**
     * Получить рецепт
     * @param id id рецепта
     */
    getRecipe(id: number): IFullRecipe;
    /**
     * Получить список сохраненных рецептов
     */
    getLikedRecipes(): ILikedRecipe[];
}

