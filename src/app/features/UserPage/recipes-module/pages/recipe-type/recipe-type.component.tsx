import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { PageHeading } from "../../../../../common/components/layouts/page-heading";
import { IRecipeGroup } from "../../../../../common/models";
import { recipeState } from "../../state";
import { RecipeTypeSubgroup } from "./components";

import styles from './recipe-type.module.scss';


/**  /recipes/[:recipeType] */
export const RecipeType: React.FC = observer(() => {
    const recipeType = recipeState.recipeType;

    if (recipeType === null) {
        return (
            <>
                <PageHeading title={undefined} goBackLink />
                
            </>
        )
    }
    
    return (<div>
        <PageHeading title={recipeType.title} goBackLink />
        <div>
            <RecipeTypeSubgroup title="Новинки" groups={getRecipeGroups(recipeType.recipeGroups, recipeType.sections.brand_new)} />
            <RecipeTypeSubgroup title="Сезонное меню" groups={getRecipeGroups(recipeType.recipeGroups, recipeType.sections.season_menu)} />
            <RecipeTypeSubgroup title="Основное меню" groups={getRecipeGroups(recipeType.recipeGroups)} />
        </div>
    </div>)
});

function getRecipeGroups(
    allGroups: IRecipeGroup[], 
    neededIds?: number[]
): { firstRecipeId: number, image?: string, title: string }[] {
    const neededGroups = neededIds ? allGroups.filter(group => neededIds.some(neededId => neededId === group.id)) : allGroups;
    
    return neededGroups.map((group) => {
        return {
            firstRecipeId: group.recipes[0].id || 0,
            image: group.image,
            title: group.title
        }
    });
}