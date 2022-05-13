import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { user } from "../api";
import { IQuestionAnswer, IQuiz, IShortStudyCourse, IStudyCourse } from "../models";

class StudyState {
    /** Краткая информация о всех курсах, доступных пользователю */
    @observable
    private _allCourses: IShortStudyCourse[] | null = null;

    /** Подробная информация о выбранном курсе. Не содержит контента страниц и тестов */
    @observable
    private _course: IStudyCourse | null = null;

    /** Ответы пользователя на текущий тест */
    @observable
    private _quizAnswers: IQuestionAnswer[] | null = null;

    constructor() {
        makeObservable(this);
    }

    /** Запросить с бэка список курсов доступных пользователю */
    @action
    public async fetchAllCourses(): Promise<void> {
        return await user.getMyCourses().response
            .then((response) => {
                runInAction(() => {
                    this._allCourses = response.data;
                })
            })
    }

    /**
     * Запросить с бэка подробную информацию о курсе, записывает его в стейт
     * @param courseId id курса
     */
    @action
    public async fetchCourse(courseId: number): Promise<void> {
        return await user.getCourseContent(courseId).response
            .then((response) => {
                runInAction(() => {
                    this._course = response.data;
                });

                return;
            })
    }

    /** Краткая информация о всех курсах, доступных пользователю */
    @computed
    public get allCourses(): IShortStudyCourse[] | null {
        return this._allCourses;
    }

    /** Подробная информация о выбранном курсе. Не содержит контента страниц и тестов */
    @computed
    public get course(): IStudyCourse | null {
        return this._course;
    }

    /** Ответы пользователя на текущий тест */
    @computed
    public get quizAnswers(): IQuestionAnswer[] | null {
        return this._quizAnswers;
    }

    /** Записать подробную информацию о курсе */
    @action
    public setCourseInfo(courseInfo: IStudyCourse): void {
        this._course = courseInfo;
    }

    /** Ответить на вопрос из текущего теста */
    @action
    public setAnswer(answer: IQuestionAnswer): void {
        if (this._quizAnswers === null) {
            this._quizAnswers = [];
        }

        const answerIndex = this._quizAnswers.findIndex(e => e.id === answer.id);

        if (answerIndex !== -1) {
            this._quizAnswers[answerIndex] = answer;
        } else {
            console.warn('Вопроса с переданным id нет в тесте');
            this._quizAnswers.push(answer);
        }
    }

    /** Инициализировать тест. В сторе создаются все вопросы из теста */
    @action
    public setQuiz(quiz: IQuiz | null): void {
        if (quiz === null || quiz === undefined) {
            return;
        }

        const initArr: IQuestionAnswer[] = [];
        for (const question of quiz.questions) {
            initArr.push({ id: question.id, answers: [] });
        }

        this._quizAnswers = initArr;
    }

    /** Удаляет ответы пользователя на текущий тест */
    @action
    public cleanAnswers(): void {
        this._quizAnswers = null;
    }
}

export const studyState = new StudyState();