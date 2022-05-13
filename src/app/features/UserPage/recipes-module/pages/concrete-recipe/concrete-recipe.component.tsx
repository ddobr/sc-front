import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { user } from "../../../../../common/api";
import { PageHeading } from "../../../../../common/components/layouts/page-heading";
import { CustomTable, RecipeSteps } from "../../../../../common/components/readable-content";
import { Skeleton } from "../../../../../common/components/ui-no-interact";
import { IFullRecipe } from "../../../../../common/models";

import styles from './concrete-recipe.module.scss';


/** /recipes/[:recipeType]/[:recipeId] */
export const ConcreteRecipe: React.FC = observer(() => {
    const { recipeTypeId, recipeId } = useParams<{ recipeTypeId: string, recipeId: string }>();
    const [recipe, setRecipe] = useState<IFullRecipe | null>(null);

    useEffect(() => {
        document.title = 'Рецепты';

        const req = user.getRecipe(Number.parseInt(recipeId));

        req.response.then(responseRecipe => {
            setRecipe(responseRecipe.data);
            document.title = 'Рецепты: ' + responseRecipe.data.title;
        })

        return () => {
            req.cancelFn && req.cancelFn();
        }
    }, [recipeId]);

    if (recipe === null) {
        return (
            <>
                <PageHeading title={undefined} />
                <Skeleton />
            </>
        )
    }

    return (
        <>
            <PageHeading title={recipe.title} goBackLink />
            <div className={styles.info}>
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={recipe.image} alt={recipe.title}/>
                </div>
                <div className={styles.about}>{recipe.about}</div>
                <div className={styles.nutritionalValue}>
                    <div className={styles.relative}>Пищевая ценность и химический состав "{recipe.title} {recipe.nutritional_value.relative_amount}".</div>
                    <CustomTable 
                        columns={['Нутриент', 'Количество', 'Углеводы']} 
                        rows={[
                            ['Калорийность', recipe.nutritional_value.calories.amount, `${recipe.nutritional_value.calories.percentage}%`],
                            ['Белки', recipe.nutritional_value.protein.amount, `${recipe.nutritional_value.protein.percentage}%`],
                            ['Жиры', recipe.nutritional_value.fats.amount, `${recipe.nutritional_value.fats.percentage}%`],
                            ['Углеводы', recipe.nutritional_value.carbohydrates.amount, `${recipe.nutritional_value.carbohydrates.percentage}%`],
                        ]} 
                    />
                </div>
            </div>

            <h2 style={{marginBottom: '20px'}}>Способ приготовления</h2>
            <RecipeSteps steps={recipe.recipe_steps}/>
        </>
    )
})