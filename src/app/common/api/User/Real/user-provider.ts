import axios from "axios";
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
    IFullRecipe,
    ILikedRecipe
} from "../../../models";
import { ProviderOf, Subscription } from "../../core";
import { createAnonymousServer, createAuthorizedServer } from "../../core/create-server";
import { UserMethods } from "../user-methods.interface";
import methodArgs from '../user-method-arguments';
import { INewsListRequest } from "../../../models/news/news-list-request.interface";

class UserPovider implements ProviderOf<UserMethods> {
    private _server = createAuthorizedServer(axios.create({
        baseURL: `${window.location.origin}/api/v1`,
    }));
    
    private _serverAnonym = createAnonymousServer(axios.create({
        baseURL: `${window.location.origin}/api/v1`,
    }));

    getLikedRecipes(): Subscription<ILikedRecipe[]> {
        return this._server(methodArgs.getLikedRecipes());
    }

    getRecipe(id: number): Subscription<IFullRecipe> {
        return this._server(methodArgs.getRecipe(id));
    }

    getFullRecipeType(id: number): Subscription<IFullRecipeType> {
        return this._server(methodArgs.getFullRecipeType(id));
    }

    getRecipeTypes(): Subscription<IRecipeType[]> {
        return this._server(methodArgs.getRecipeTypes());
    }

    getStartedSectionQuiz(sectionId: number): Subscription<IQuiz> {
        return this._server(methodArgs.getStartedSectionQuiz(sectionId));
    }

    getQuizPreface(sectionId: number): Subscription<IQuizPreface> {
        return this._server(methodArgs.getQuizPreface(sectionId));
    }

    getQuizSession(): Subscription<IQuizSession> {
        return this._server(methodArgs.getQuizSession());
    }

    validateCodeGetToken(email: string, code: string): Subscription<{ token: string; }> {
        return this._serverAnonym(methodArgs.validateCodeGetToken(email, code));
    }

    sendCode(email: string): Subscription<void> {
        return this._serverAnonym(methodArgs.sendCode(email));
    }

    login(login: string, password: string): Subscription<{token: string}> {
        return this._serverAnonym(methodArgs.login(login, password));
    }

    getMyProfile(): Subscription<IUser> {
        return this._server(methodArgs.getMyProfile());
    }

    getMyCourses(): Subscription<IShortStudyCourse[]> {
        return this._server(methodArgs.getMyCourses());
    }

    getChapterContent(chapterId: number): Subscription<IStudyChapter> {
        return this._server(methodArgs.getChapterContent(chapterId));
    }

    getCourseContent(courseId: number): Subscription<IStudyCourse> {
        return this._server(methodArgs.getCourseContent(courseId));
    }

    startSectionQuiz(sectionId: number): Subscription<IQuiz> {
        return this._server(methodArgs.startSectionQuiz(sectionId));
    }

    answerSectionQuiz(sectionId: number, answer: IQuestionAnswer[]): Subscription<IQuizGrade> {
        return this._server(methodArgs.answerSectionQuiz(sectionId, answer));
    }

    readPage(pageId: number): Subscription<void> {
        return this._server(methodArgs.readPage(pageId));
    }

    getNewsArticle(articleId: number): Subscription<IFullNewsArticle> {
        return this._server(methodArgs.getNewsArticle(articleId));
    }

    getNewsList(filter: INewsListRequest): Subscription<IShortNewsArticle[]> {
        return this._server(methodArgs.getNewsList(filter));
    }

    searchOnSite(query: string): Subscription<ISearchResult[]> {
        return this._server(methodArgs.searchOnSite(query));
    }
}

export default new UserPovider();