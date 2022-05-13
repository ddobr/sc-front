import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { user } from "../api";
import { IUser } from "../models";

class MeState {
    @observable
    private _profile: IUser | null = null;

    constructor() {
        makeObservable(this);
    }

    /** Удаляет весь стейт о профиле пользователя */
    @action
    public removeProfile(): void {
        this._profile = null;
    }

    /**
     * Устанавливает переданный профиль пользователя
     * @param profile пользователь
     */
    @action
    public setProfile(profile: IUser): void {
        this._profile = profile;
    }

    /** Информация о профиле */
    @computed
    public get profile(): IUser | null {
        return this._profile;
    }

    /**
     * Запрашивает инфу о пользователе с бэка, записывает в стейт 
     */
    @action
    public fetchProfile(): void {
        user.getMyProfile().response
            .then((response) => {
                runInAction(() => {
                    this._profile = response.data;
                })
            });
    }
}

export const meState = new MeState();