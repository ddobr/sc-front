import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toRecipe } from '../../../../../../../common/services/routing-service/navigation-urls';

import styles from './recipe-group-card.module.scss';


interface Props {
    title: string,
    image?: string,
    firstRecipeId: number
}

export const RecipeGroupCard: React.FC<Props> = observer(({
    title,
    image,
    firstRecipeId,
}) => {

    const { recipeTypeId } = useParams<{ recipeTypeId: string }>();
    const history = useHistory();

    const clickHandler = useCallback(() => {
        history.push(toRecipe(Number.parseInt(recipeTypeId), firstRecipeId));
    }, [recipeTypeId, firstRecipeId, history]);

    return (
        <div 
            className={styles.recipeGroup}
            onClick={clickHandler}
        >
            <div className={styles.imageCrop}>
                <img src={image} alt={title} className={styles.image} />
            </div>
            <div className={styles.groupTitle}>{title}</div>
        </div>
    )
})