import { observer } from "mobx-react-lite";
import cls from 'classnames';

import styles from './recipe-steps.module.scss';
import { useState } from "react";


interface Props {
    steps: string[]
}

export const RecipeSteps: React.FC<Props> = observer(({
    steps
}) => {

    const [doneIdx, setDoneIdx] = useState(-1);

    const completeHandler = (idx: number) => {
        if (doneIdx === 0 && idx === 0) {
            setDoneIdx(-1)
        } else {
            setDoneIdx(idx);
        }
    }

    return (
        <ol className={styles.recipeSteps}>
            {
                steps.map((step, idx) => 
                <li key={step} className={cls(styles.item, {[styles.connected]: idx !== steps.length - 1})}>
                    <span onClick={() => completeHandler(idx)} className={cls(styles.itemNumber, {[styles.done]: idx <= doneIdx})}>{idx}</span> 
                    <span className={styles.itemContent}>{step}</span>
                </li>)
            }
        </ol>
    )
})
