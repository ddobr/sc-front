import { MethodArgs, ProviderOf, Subscription } from "../../core";
import { UserMethods } from "../user-methods.interface";
import { fakeFullNewsArticle, fakeShortNews } from "./Mocks/FakeNews";
import { FakeSectionQuizResult } from "./Mocks/FakeSectionQuiz";
import { fakeShortSudyCourses } from "./Mocks/FakeShortStudyCourses";
import { fakeStudyChapter } from "./Mocks/FakeStudyChapter";
import { fakeStudyCourse } from "./Mocks/FakeStudyCourse";
import { fakeBarista } from "./Mocks/FakeUsers";
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
import { fakeSearchResult } from "./Mocks/fakeSearchResults";
import methodArgs from '../user-method-arguments';
import { fakeQuizPreface } from "./Mocks/quiz/fake-quiz-preface.mock";
import { fakeQuizSessionService } from "./Mocks/quiz/fake-section-quiz-session.mock";
import { FakeSectionQuiz } from "./Mocks/quiz/fake-section-quiz.mock";
import { INewsListRequest } from "../../../models/news/news-list-request.interface";
import { fakeFullRecipe, fakeFullRecipeType, fakeRecipeTypes } from "./Mocks/recipes";
import { fakeLikedRecipes } from "./Mocks/recipes/fake-liked-recipes.mock";


class FakeUserProvider implements ProviderOf<UserMethods> {

    private _createResponse<T>(data: T, args: MethodArgs): Subscription<T> {
        if (process.env.REACT_APP_LOG_REQUESTS === 'true') {
            console.log(`${args.method}: ${args.url}`);
        }

        let cancelled = false;

        let outterResolve: () => void = () => {
            cancelled = true;
        };
        
        return {
            cancelFn: () => {
                outterResolve();
            },
            response: new Promise((resolve, reject) => {
                outterResolve = reject;
                setTimeout(() => {
                    if (cancelled) {
                        reject('cancelled');
                    } else {
                        resolve({ data: data, status: 200 })
                    }
                }, 1000);
            })
        }
    }

    getLikedRecipes(): Subscription<ILikedRecipe[]> {
        return this._createResponse(fakeLikedRecipes.get(), methodArgs.getLikedRecipes());
    }

    getRecipe(id: number): Subscription<IFullRecipe> {
        return this._createResponse(fakeFullRecipe.get(), methodArgs.getRecipe(id));
    }

    getFullRecipeType(id: number): Subscription<IFullRecipeType> {
        return this._createResponse(fakeFullRecipeType.get(), methodArgs.getFullRecipeType(id));
    }

    getRecipeTypes(): Subscription<IRecipeType[]> {
        return this._createResponse(fakeRecipeTypes, methodArgs.getRecipeTypes());
    }

    getStartedSectionQuiz(sectionId: number): Subscription<IQuiz> {
        return this._createResponse(FakeSectionQuiz.getStartedSectionQuiz(), methodArgs.getStartedSectionQuiz(sectionId));
    }

    getQuizPreface(sectionId: number): Subscription<IQuizPreface> {
        return this._createResponse(fakeQuizPreface.getQuizPreface(sectionId), methodArgs.getQuizPreface(sectionId));
    }

    getQuizSession(): Subscription<IQuizSession> {
        return this._createResponse(fakeQuizSessionService.getFakeQuizSession(), methodArgs.getQuizSession());
    }

    validateCodeGetToken(email: string, code: string): Subscription<{ token: string; }> {
        return this._createResponse({token: 'groovest4life'}, methodArgs.validateCodeGetToken(email, code));
    }

    sendCode(email: string): Subscription<void> {
        return this._createResponse(undefined, methodArgs.sendCode(email));
    }

    login(login: string, password: string): Subscription<{token: string}> {
        return this._createResponse({token: 'groovest4life'}, methodArgs.login(login, password));
    }

    getMyProfile(): Subscription<IUser> {
        return this._createResponse({...fakeBarista}, methodArgs.getMyProfile());
    }

    getMyCourses(): Subscription<IShortStudyCourse[]> {
        return this._createResponse([...fakeShortSudyCourses], methodArgs.getMyCourses());
    }

    getChapterContent(chapterId: number): Subscription<IStudyChapter> {
        return this._createResponse({...fakeStudyChapter}, methodArgs.getChapterContent(chapterId));
    }

    getCourseContent(courseId: number): Subscription<IStudyCourse> {
        return this._createResponse({...fakeStudyCourse}, methodArgs.getCourseContent(courseId));
    }

    startSectionQuiz(sectionId: number): Subscription<IQuiz> {
        fakeQuizSessionService.startSession(1);
        fakeQuizPreface.decreaseAttempts();
        return this._createResponse(FakeSectionQuiz.startSectionQuiz(), methodArgs.startSectionQuiz(sectionId));
    }

    answerSectionQuiz(sectionId: number, answer: IQuestionAnswer[]): Subscription<IQuizGrade> {
        fakeQuizSessionService.endSession();
        console.log(JSON.stringify(answer));
        return this._createResponse({...FakeSectionQuizResult}, methodArgs.answerSectionQuiz(sectionId, answer));
    }

    readPage(pageId: number): Subscription<void> {
        return this._createResponse(undefined, methodArgs.readPage(pageId));
    }

    getNewsArticle(articleId: number): Subscription<IFullNewsArticle> {
        return this._createResponse({...fakeFullNewsArticle}, methodArgs.getNewsArticle(articleId));
    }

    getNewsList(filter: INewsListRequest): Subscription<IShortNewsArticle[]> {
        return this._createResponse([...fakeShortNews], methodArgs.getNewsList(filter));
    }

    searchOnSite(query: string): Subscription<ISearchResult[]> {
        return this._createResponse([...fakeSearchResult], methodArgs.searchOnSite(query));
    }
}

export default new FakeUserProvider();