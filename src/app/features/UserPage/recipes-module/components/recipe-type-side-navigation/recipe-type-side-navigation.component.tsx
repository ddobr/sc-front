import { observer } from "mobx-react-lite";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { CollapsibleNavigationGroup, MinimalLink } from "../../../../../common/components/navigation/collapsible-navigation";
import { Skeleton } from "../../../../../common/components/ui-no-interact";
import { IFullRecipeType } from "../../../../../common/models";
import { toRecipe, toRecipeType } from "../../../../../common/services/routing-service/navigation-urls";
import { recipeState } from "../../state";
import { useRecipeId } from "./hooks/use-recipe-id.hook";

import styles from './recipe-type-side-navigation.module.scss';

interface Props {
}

export const RecipeTypeSideNavigation: React.FC<Props> = observer(() => {

    const history = useHistory();
    const recipeType = recipeState.recipeType;
    const { recipeTypeId } = useParams<{ recipeTypeId: string, recipeId: string | undefined }>();
    const location = useLocation();
    const recipeId = useRecipeId(location.pathname);


    if (recipeType === null) {
        return (
            <>
                <Skeleton height="16px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
            </>
        )
    }

    return (
        <nav
            className={styles.recipeNavigation}
        >
            <div
                key={'type-link'}
                className={styles.typeLink}
                onClick={() => history.push(toRecipeType(Number.parseInt(recipeTypeId)))}
            >{ recipeType.title }</div>
            {
                recipeType.recipeGroups.map(group => (
                    <div style={{ marginBottom: '10px' }} key={group.id} >
                        <CollapsibleNavigationGroup 
                            title={group.title} 
                            openedByDefault={group.recipes.some(e => { 
                                return e.id === recipeId
                            })}
                        >
                            {
                                group.recipes.map(recipe => (
                                    <MinimalLink key={recipe.id} path={toRecipe(Number.parseInt(recipeTypeId), recipe.id)} title={recipe.title} />
                                ))
                            }
                        </CollapsibleNavigationGroup>
                    </div>
                ))
            }
        </nav>
    )
});
