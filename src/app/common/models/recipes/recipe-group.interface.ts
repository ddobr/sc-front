import { IShortRecipe } from ".."

/** Группа рецептов (например "Коктейли" или "Сок и смузи") */
export interface IRecipeGroup {
    /** id группы */
    id: number,
    /** Название группы */
    title: string,
    /** Список с краткой инфой о каждом рецепте в этой группе */
    recipes: IShortRecipe[]
    /** Url лоу-рез картинки группы рецептов */
    image?: string
}