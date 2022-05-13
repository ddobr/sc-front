import { IQuestionAnswer } from "../../models";
import { INewsListRequest } from "../../models/news/news-list-request.interface";
import { MethodArgs, MethodArgsFor } from "../core";
import { UserMethods } from "./user-methods.interface";

class UserMethodArgs implements MethodArgsFor<UserMethods> {
    getLikedRecipes(): MethodArgs {
        return {
            url: `/recipes/saved`,
            method: 'get'
        }
    }

    getRecipe(id: number): MethodArgs {
        return {
            url: `/recipes/recipe/${id}`,
            method: 'get'
        }
    }

    getFullRecipeType(id: number): MethodArgs {
        return {
            url: `/recipes/types/${id}`,
            method: 'get'
        }
    }

    getRecipeTypes(): MethodArgs {
        return {
            url: `/recipes/types`,
            method: 'get'
        }
    }

    getStartedSectionQuiz(sectionId: number): MethodArgs {
        return {
            url: `/section/${sectionId}/started_quiz`,
            method: 'get'
        }
    }
    
    getQuizPreface(sectionId: number): MethodArgs {
        return {
            url: `/study/section/${sectionId}/quiz/info`,
            method: 'get'
        }
    }

    getQuizSession(): MethodArgs {
        return {
            url: '/me/sessions/quiz',
            method: 'get'
        }
    }

    validateCodeGetToken(email: string, code: string): MethodArgs {
        return {
            url: '/auth/',
            method: 'post',
            body: {
                code: code,
                email: email
            }
        }
    }

    sendCode(email: string): MethodArgs {
        return {
            url: '/auth/email/',
            method: 'post',
            body: {
                email: email
            }
        }
    }

    login(login: string, password: string): MethodArgs {
        return {
            url: '/me/token/',
            method: 'post',
            body: {
                email: login,
                password: password
            }
        }
    }

    getMyProfile(): MethodArgs {
        return {
            url: '/me',
            method: 'get',
        }
    }

    getMyCourses(): MethodArgs {
        return {
            url: '/me/available-courses',
            method: 'get'
        }
    }

    getChapterContent(chapterId: number): MethodArgs {
        return {
            url: `/study/chapter/${chapterId}`,
            method: 'get'
        }
    }

    getCourseContent(courseId: number): MethodArgs {
        return {
            url: `/study/course/${courseId}`,
            method: 'get',
        }
    }

    startSectionQuiz(sectionId: number): MethodArgs {
        return {
            url: `/study/section/${sectionId}/quiz`,
            method: 'get',
        }
    }
    
    answerSectionQuiz(sectionId: number, answer: IQuestionAnswer[]): MethodArgs {
        return {
            url: `/study/section/${sectionId}/quiz/answer/`,
            method: 'post',
            body: answer
        }
    }

    readPage(pageId: number): MethodArgs {
        return {
            url: `/me/read-page/${pageId}/`,
            method: 'patch'
        }
    }

    getNewsArticle(articleId: number): MethodArgs {
        return {
            url: `/news/${articleId}`,
            method: 'get'
        }
    }

    getNewsList(filter: INewsListRequest): MethodArgs {
        return {
            url: '/news',
            method: 'get',
            body: filter
        }
    }

    searchOnSite(query: string): MethodArgs {
        return {
            url: `/search/${query}`,
            method: 'get'
        }
    }
}

export default new UserMethodArgs();