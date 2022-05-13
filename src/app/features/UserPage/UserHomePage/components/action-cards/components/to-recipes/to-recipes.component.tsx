import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as RecipeIcon } from '../../../../../../../../assets/img/to-recipes-action.svg'
import { toRecipes } from "../../../../../../../common/services/routing-service/navigation-urls";
import { BaseAction } from "../base-action/base-action.component";

export const ToRecipes: React.FC = observer(() => {
    const history = useHistory();

    const clickHandler = useCallback(() => {
        history.push(toRecipes());
    }, [history])

    return (
        <BaseAction icon={<RecipeIcon />} onClick={clickHandler}  />
    )
})