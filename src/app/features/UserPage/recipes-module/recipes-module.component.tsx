import { observer } from "mobx-react-lite"
import { useEffect } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { BaseLayout } from "../../../common/components/layouts/base-layout"
import { RecipeTypeSideNavigation } from "./components";
import { AllRecipeTypes } from "./pages/all-recipe-types/all-recipe-types.component";
import { ConcreteRecipe } from "./pages/concrete-recipe/concrete-recipe.component";
import { RecipeType } from "./pages/recipe-type/recipe-type.component";
import { recipeState } from "./state";

const RecipesModule: React.FC = observer(() => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <AllRecipeTypes />
            </Route>
            <Route path={`${path}/:recipeTypeId`}>
                <RecipeTypeSwitch />
            </Route>

        </Switch>
    )
});

/**  /recipe/[:recipeTypeId] */
const RecipeTypeSwitch: React.FC = observer(() => {
    const { path } = useRouteMatch();
    const { recipeTypeId } = useParams<{ recipeTypeId: string }>();

    useEffect(() => {
        const cancelFn = recipeState.fetchType(Number.parseInt(recipeTypeId));

        return () => {
            cancelFn && cancelFn();
        }
    }, [recipeTypeId]);

    return (
        <BaseLayout
            sideBar={<RecipeTypeSideNavigation />}
        >
            <Switch>
                <Route exact path={`${path}`}>
                    <RecipeType />
                </Route>
                <Route exact path={`${path}/:recipeId`}>
                    <ConcreteRecipe />
                </Route>
            </Switch>
        </BaseLayout>
    )
})

export default RecipesModule;