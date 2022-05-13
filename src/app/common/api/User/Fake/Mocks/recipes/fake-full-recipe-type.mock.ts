import { IFullRecipeType } from "../../../../../models";

class FakeFullRecipeType {
    private _groups: IFullRecipeType = {
        id: 0,
        title: 'Кофе и напитки',
        recipeGroups: [
            {
                id: 0,
                recipes: [
                    { 
                        id: 0,
                        title: 'Эспрессо Классический'
                    },
                    { 
                        id: 1,
                        title: 'Аффогато'
                    }
                ],
                title: 'Эспрессо',
                image: 'https://uploads-ssl.webflow.com/5f92b98ef775e43402afe27f/608db20990e9d924ca66bb5c_espresso1-p-1080.jpeg'
            },
            {
                id: 1,
                recipes: [
                    {
                        id: 2,
                        title: 'Капучино Классический'
                    },
                    {
                        id: 3,
                        title: 'Мокачино'
                    },
                    {
                        id: 4,
                        title: 'Flat White'
                    }
                ],
                title: 'Капучино',
                image: 'https://uploads-ssl.webflow.com/5f92b98ef775e43402afe27f/608e7ba89175d027f295a770_capuch2-p-1080.jpeg'
            },
            {
                id: 2,
                recipes: [
                    {
                        id: 5,
                        title: 'Латте Классический'
                    },
                    {
                        id: 6,
                        title: 'Миндальный Латте'
                    }
                ],
                title: 'Латте',
                image: 'https://uploads-ssl.webflow.com/5f92b98ef775e43402afe27f/608e6eeab02dde01bd2a17e8_capuch1-p-1080.jpeg'
            },
            {
                id: 3,
                recipes: [
                    {
                        id: 7,
                        title: 'Смузи Клубника-Банан'
                    },
                    {
                        id: 8,
                        title: 'Смузи Черника-Кокос',
                    },
                    {
                        id: 9,
                        title: 'Облепиховый Смузи'
                    },
                    {
                        id: 10,
                        title: 'Свежевыжатый сок'
                    }
                ],
                title: 'Сок и смузи',
                image: 'https://uploads-ssl.webflow.com/5f92b98ef775e43402afe27f/608fdb2d78749807e46d7af2_juice1-p-1080.jpeg'
            },
            {
                id: 4,
                recipes: [
                    {
                        id: 11,
                        title: 'Раф'
                    },
                    {
                        id: 12,
                        title: 'Кофе по-Венски'
                    }
                ],
                title: 'Коктейли',
                image: 'https://uploads-ssl.webflow.com/5f92b98ef775e43402afe27f/608fd1df6c9455749dd7887d_coctail1-p-1080.jpeg'
            },
        ],
        sections: {
            brand_new: [3],
            season_menu: [3, 4],
        }
    }

    public get(): IFullRecipeType {
        const copy = JSON.stringify(this._groups);

        return JSON.parse(copy);
    }
}

export const fakeFullRecipeType = new FakeFullRecipeType();