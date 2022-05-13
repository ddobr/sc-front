import { IRecipeGroup } from "./recipe-group.interface";

/** Для страницы типа с группами рецептов 
 * 
 * Например тип "Кофе и напитки" содержит группу рецептов "Коктейли"
*/
export interface IFullRecipeType {
    /** id типа рецепта */
    id: number,
    /** Название типа (например "Кофе и напитки") */
    title: string,
    /** Все группы рецептов у этого типа */
    recipeGroups: IRecipeGroup[],
    /** Разделы, по типу "сезонное меню", содержащие id групп рецептов */
    sections: {
        /** Новинки */
        brand_new: number[],
        /** Сезонное меню */
        season_menu: number[],
    }
}
