import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { user } from "../../../../common/api";
import { IFullRecipeType } from "../../../../common/models";

class RecipeState {
    @observable
    private _type: IFullRecipeType | null = null;

    constructor() {
        makeObservable(this);
    }

    @computed
    public get recipeType(): IFullRecipeType | null {
        return this._type;
    }

    @action 
    public fetchType(id: number): (message?: string | undefined) => void {
        this._type = null;
        const req = user.getFullRecipeType(id);

        req.response.then(typeResponse => {
            runInAction(() => {
                this._type = typeResponse.data;
            });
        })

        return req.cancelFn;
    }
}

export const recipeState = new RecipeState();