import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { user } from "../api";
import { IQuizSession } from "../models";

class SessionsState {
    /** Сессия с информацией о тесте */
    @observable
    private _quiz: IQuizSession | null = null;

    constructor() {
        makeObservable(this);
    }

    /** Сессия с информацией о тесте */
    @computed
    public get quizSession(): IQuizSession | null {
        return this._quiz;
    }

    /** Записывает информацию о сессии с тестом */
    @action
    public setQuizSession(quiz: IQuizSession): void {
        this._quiz = quiz;
    }

    /**
     * Запрашивает инфу о сессии с тестом с бэка, записывает в стейт 
     */
    @action
    public fetchQuizSession(): void {
        user.getQuizSession().response
            .then((response) => {
                runInAction(() => {
                    this._quiz = response.data;
                })
            })
    }
}

export const sessionsState = new SessionsState();