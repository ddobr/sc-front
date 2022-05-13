/** ПОЛНАЯ информация о КОНКРЕТНОМ рецепте */
export interface IFullRecipe {
    /** id рецепта */
    id: number,
    /** Название рецепта */
    title: string,
    /** История рецепта и прочая фигня */
    about: string,
    /** Сохранено ли в избранное */
    saved: boolean,
    /** URL на хай-рез картинку рецепта */
    image: string,
    /** Для составления таблицы пищевой ценности */
    nutritional_value: {
        /** Значение, относительно которого приводится информация о нутриентах.
         * 
         * Например: "300мл" или "250г"
         */
        relative_amount: string,
        /** Калорийность */
        calories: INutrientInfo,
        /** Белки */
        protein: INutrientInfo,
        /** Жиры */
        fats: INutrientInfo,
        /** Углеводы */
        carbohydrates: INutrientInfo,
    },
    /** Шаги выполнения рецепта. (Способ приготовления) */
    recipe_steps: string[]
}

export interface INutrientInfo {
    /** Количество нутриента в ```relative_amount``` продукта.
     * 
     * Например для калорийности "268 кКал" или для белков "10г"
     */
    amount: string,
    /** % от нормы в 100 г */
    percentage: number
}