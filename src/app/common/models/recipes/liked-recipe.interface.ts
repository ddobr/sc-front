export interface ILikedRecipe {
    /** id рецепта */
    recipe_id: number,
    /** id типа рецепта */
    type_id: number,
    /** название рецепта */
    title: string,
    /** url лоу-рез картинки рецепта */
    image: string,
}