import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { RecipeGroupCard } from "../recipe-group-card/recipe-group-card.component";

import styles from './recipe-type-subgroup.module.scss';

interface Props {
    title: string,
    groups: { firstRecipeId: number, image?: string, title: string }[]
}

export const RecipeTypeSubgroup: React.FC<Props> = observer(({
    title,
    groups
}) => {

    const rowsWithGroups = useMemo(() => {
        return splitToGroups(groups, 3);
    }, [groups])

    return (
        <section className={styles.typeSection}>
            <div className={styles.title}>{title}</div>
            <div className={styles.groups}>
                {
                    rowsWithGroups.map((row, idx) => (
                        <div className={styles.row} key={idx}>
                            {
                            row.map(group => (
                                <div key={group.firstRecipeId} className={styles.groupWrapper}>
                                    <RecipeGroupCard title={group.title} image={group.image} firstRecipeId={group.firstRecipeId} />
                                </div>
                            ))
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    )
})

function splitToGroups<T>(arr: T[], groupLength: number): T[][] {
    const res: T[][] = [];

    for (let i = 0; i < Math.ceil(arr.length / groupLength); i++) {
        const group: T[] = [];

        for(let j = 0; j < groupLength; j++) {
            if (arr[i * groupLength + j] !== undefined) {
                group.push(arr[i * groupLength + j]);
            }
        }

        res.push(group);
    }

    return res;
}