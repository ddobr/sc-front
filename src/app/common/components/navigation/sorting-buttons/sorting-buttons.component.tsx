import { useCallback, useMemo, useState } from 'react';
import { ReactComponent as SortSvg } from '../../../../../assets/img/sort-btn.svg';
import cls from 'classnames';

import styles from './sorting-buttons.module.scss';
import { observer } from 'mobx-react-lite';


interface Props {
    sortTypes: string[],
    onChangeSortType: undefined | ((type: string, ascending: boolean) => any)
}

export const SortingButtons: React.FC<Props> = observer(({
    sortTypes,
    onChangeSortType
}) => {

    // Состояние фильтра в него входит тип и состояние типа
    const [currentType, setCurrentType] = useState<{type: string, ascending: boolean}>(
        sortTypes && sortTypes[0] 
        ? {type: sortTypes[0], ascending: true}
        : {type: '', ascending: true}
    );

    const itemClickHandler = useCallback((clickedType: string, currentlyAscending: boolean) => {
        if (sortTypes) {
            const newCurrentType: {type: string, ascending: boolean} = { type: clickedType, ascending: true};
            if (currentType.type === clickedType) {
                if (currentlyAscending) {
                    newCurrentType.ascending = false;
                } else {
                    newCurrentType.ascending = true;
                }
            } 

            setCurrentType(newCurrentType);
            onChangeSortType && onChangeSortType(newCurrentType.type, newCurrentType.ascending);
        }
    }, [currentType, onChangeSortType, sortTypes]);

    const sortButtons = useMemo(() => {
        const sortButtons = [];

        if (sortTypes) {
            for (const sortType of sortTypes) { 
                const buttonCls = cls(styles.sortButton, {[styles.disabled]: sortType !== currentType.type});
                const svgCls = cls(styles.svg, {[styles.down]: sortType === currentType.type && !currentType.ascending});
                
                let ascending = true;
                if (currentType.type === sortType) {
                    ascending = currentType.ascending; 
                }

                sortButtons.push(
                    <span key={sortType} onClick={() => itemClickHandler(sortType, ascending)} className={buttonCls}>
                        <SortSvg className={svgCls} />
                        { sortType }
                    </span>
                )
            }
        }

        return sortButtons;
    }, [currentType, sortTypes, itemClickHandler])

    return (
        <div className={styles.sortingButtons}>
            <span className={styles.text}>Сортировать по:</span>
            { sortButtons }
        </div>
    )
});
