/* eslint-disable no-multi-str */
import { IFullRecipe } from "../../../../../models";

class FakeFullRecipe {
    private _recipe: IFullRecipe = {
        id: 11,
        title: 'Раф',
        about: '\
            Раф-кофе — популярный в России и странах бывшего СССР кофейный напиток, появившийся в конце 1990-х годов. \
            Готовится путём добавления нагретых паром сливок с небольшим количеством пены в одиночную порцию эспрессо. \
            Основное отличие от латте — в использовании ванильного сахара и сливок вместо молока.',
        saved: true,
        image: 'https://uploads-ssl.webflow.com/5f92b98ef775e43402afe27f/608fd1df6c9455749dd7887d_coctail1-p-1080.jpeg',
        nutritional_value: {
            relative_amount: '300мл',
            calories: {
                amount: '268 кКал',
                percentage: 15.9
            },
            protein: {
                amount: '7.7 г',
                percentage: 10.1,
            },
            carbohydrates: {
                amount: '24.2 г',
                percentage: 11.1,
            },
            fats: {
                amount: '17 г',
                percentage: 30.4
            }
        },
        recipe_steps: [
            'Налить 10% сливки в питчер ',
            'Добавить в питчер эспрессо и ванильный сахар',
            'Вспенить всё вместе',
            'Перелить в чашку для латте',
        ]
    }

    public get(): IFullRecipe {
        const copy = JSON.stringify(this._recipe);

        return JSON.parse(copy);
    }
}

export const fakeFullRecipe = new FakeFullRecipe();