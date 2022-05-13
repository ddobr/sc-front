import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cls from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

import styles from './collapsible-navigation-group.module.scss';

interface Props {
    openedByDefault?: boolean,
    title: string,
    children: React.ReactNode
}

const CollapsibleNavigationGroupNoMemo: React.FC<Props> = observer(({openedByDefault, title, children}) => {
    const [opened, setOpened] = useState(openedByDefault);
    // Для расчета высоты контента
    const contentElem = useRef<HTMLDivElement>(null);
    // Раскрывающийся элемент
    const collapseElem = useRef<HTMLDivElement>(null);

    // Инициализация - открыт по умолчанию или нет
    useEffect(() => {
        if (openedByDefault && collapseElem.current) {
            collapseElem.current.style.height = `${contentElem.current!.scrollHeight}px`;
            setOpened(true);
            setTimeout(() => {
                if (collapseElem.current) {
                    collapseElem.current.style.height = 'auto';
                }
            }, 1);
        }
    }, [openedByDefault]);
 
    // Для отмены на анимации открытия
    const cancelOpen = useRef(0);
    // Для отмены анимации закрытия
    const cancelClose = useRef(0);
    const userClickHandler = () => {
        const newOpened = !opened;
        collapseElem.current!.style.transition = 'height 0.3s ease';
        if (newOpened) {
            // Отменяем анимацию закрытия
            clearTimeout(cancelClose.current);
            // Нельзя ставить сразу в auto - анимация не сработает, поэтому сперва ставим высоту контента..
            collapseElem.current!.style.height = `${contentElem.current!.scrollHeight}px`;

            // А после окончания анимации ставим auto 
            cancelOpen.current = setTimeout(() => {
                collapseElem.current!.style.transition = 'none';
                collapseElem.current!.style.height = 'auto';
            }, 300) as unknown as number;
        } else {
            // Отменяем анимацию открытия
            clearTimeout(cancelOpen.current);
            // Точно такой же принцип. Сперва с auto на высоту контента, затем в 0px
            collapseElem.current!.style.height = `${contentElem.current!.scrollHeight}px`;

            cancelClose.current = setTimeout(() => {
                collapseElem.current!.style.height = `0px`;
            }, 10) as unknown as number;
            
        }

        setOpened(newOpened);
    }

    return (
        <div className={styles.simpleCollapseGroup}>
            <div 
                className={styles.groupHeader}
                onClick={() => userClickHandler()}
            >
                <div className={styles.groupTitle}>
                    { title }
                </div>
                <ExpandMoreIcon 
                    className={cls([
                        styles.expandIcon, 
                        {[styles.expanded]: opened}
                    ])}
                />
            </div>
            <div 
                className={styles.groupCollapsable}
                ref={collapseElem}
            >
                <div 
                    className={styles.groupContent}
                    ref={contentElem}
                >
                    { children }
                </div>
            </div>
        </div>
    )
});

export const CollapsibleNavigationGroup = React.memo<Props>(
    CollapsibleNavigationGroupNoMemo, 
    (prevProps, newProps) => {
        return prevProps.title === newProps.title
        && prevProps.openedByDefault === newProps.openedByDefault
        && prevProps.children === newProps.children
    }
);