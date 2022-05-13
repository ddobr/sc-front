import { ILikedRecipe } from "../../../../../models";

class FakeLikedRecipes {
    private _likedRecipes: ILikedRecipe[] = [
        {
            recipe_id: 0,
            type_id: 0,
            title: 'Эспрессо Классический',
            image: 'https://uploads-ssl.webflow.com/5f92b98ef775e43402afe27f/608db20990e9d924ca66bb5c_espresso1-p-1080.jpeg'
        },
        {
            recipe_id: 4,
            type_id: 0,
            title: 'Flat White',
            image: 'https://uploads-ssl.webflow.com/5f92b98ef775e43402afe27f/608e7ba89175d027f295a770_capuch2-p-1080.jpeg'
        },
    ];

    public get(): ILikedRecipe[] {
        return this._likedRecipes;
    }
}

export const fakeLikedRecipes = new FakeLikedRecipes();