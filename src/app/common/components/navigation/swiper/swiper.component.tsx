import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo, useRef, useState, Children } from 'react';
import styles from './swiper.module.scss';

interface Props {
    itemSize?: string,
    fullWidth?: boolean,
    openedItemChange?: (index: number) => any,
    openedIdx?: number
}

export const Swiper: React.FC<Props> = observer(({itemSize, fullWidth, openedItemChange, children, openedIdx = 0}) => {
    // Подвижный элемент, в котором хранятся айтемы
    const movableElem = useRef<HTMLDivElement>(null);
    const container = useRef<HTMLDivElement>(null); 
    const itemElem = useRef<HTMLDivElement>(null);

    // Проверка на null прежде чем получить ширину
    const getItemWidth = useCallback(() => Number.parseFloat(itemElem.current !== null 
        ? window.getComputedStyle(itemElem.current).width 
        : '0'), [itemElem]
    );
    
    const items = useMemo(() => Children.map(children, (child, i) => (
        <div 
            key={i}
            className={styles.child}    
            ref={itemElem}
            style={{
                width: itemSize !== undefined 
                    ? itemSize 
                    : fullWidth ? `calc(100vw * 0.9)` : '100%',
            }}
        >
            { child }
        </div>
    )), [children, itemSize, fullWidth]);

    // Текущий открытый айтем
    const [itemIndex, setItemIndex] = useState(openedIdx);
    // Небольшой костыль. При первом рендере на полную ширину карусель немного дергается
    // Это вызвано тем, что мы сперва делаем left а затем с анимацией делаем transform
    // Поэтому вводим такую переменную чтобы при первом рендере отключить transition
    const initialized = useRef(false);
    // При изменении openedIdx снаружи нужно анимацией прогнать на нужную карточку
    useEffect(() => {
        if (items) {
            if (initialized.current === true) {
                movableElem.current!.style.transition = 'transform 300ms ease';
            }
            initialized.current = true;
            setItemIndex(Math.max(Math.min(openedIdx, items.length - 1), 0));
        }
    }, [openedIdx, items]);



    // Задание координат подвижного контейнера
    const increaseTranslate = useCallback((px: number) => {
        let offset = -itemIndex * (getItemWidth() + 10);
        if (fullWidth) {
            offset += mainLeftOffset();
        }
        movableElem.current!.style.transform = `translate(${px + offset}px, 0px)`; 
    }, [itemIndex, fullWidth, getItemWidth]);

    // подписка на ресайз окна - нужно изменить отступы
    useEffect(() => {
        const onResize = () => {
            movableElem.current!.style.transition = '';
            increaseTranslate(0);
            const offset = mainLeftOffset()
            container.current!.style.left = fullWidth ? `${-offset}px` : '0';
        }

        window.addEventListener('resize', onResize, true);

        return () => {
            window.removeEventListener('resize', onResize, true);
        }
    }, [increaseTranslate, fullWidth]);

    // Для fullwidth - выставление ширины контейнера в 100% окна и смещение его влево
    useEffect(() => {
        const offset = mainLeftOffset();
        container.current!.style.left = fullWidth ? `${-offset}px` : '0';
        container.current!.style.width = fullWidth ? '100vw' : '';

        increaseTranslate(0);
    }, [children, fullWidth, increaseTranslate])

    useEffect(() => {
        const handler = (e: TouchEvent) => isDirectionSet.current && !isVertical.current && e.preventDefault()
        // Оч важный прикол. Не разобрался, почему именно на окно этот обработчик вешать надо.
        window.addEventListener(
            'touchmove', 
            handler, 
            { passive: false }
        );

        return () => window.removeEventListener('touchmove', handler);
    }, [])


    const touchStartPosX = useRef(0);
    const touchStartPosY = useRef(0);
    // Для расчета скорости скролла
    const touchStartTime = useRef(0);
    const touchStartHandler = (event: React.TouchEvent<HTMLDivElement>): void => {
        touchStartTime.current = event.timeStamp;
        // Отключение незавершенной анимации
        clearTimeout(timeoutId.current);
        movableElem.current!.style.transition = '';

        touchStartPosX.current = event.touches[0].clientX;
        touchStartPosY.current = event.touches[0].clientY;
        swipeDiff.current = 0;
    }

    const isVertical = useRef(false);
    // Флаг, была ли уже вызвана функция setDirectionOnce
    const isDirectionSet = useRef(false);
    const setDirectionOnce = (event: React.TouchEvent<HTMLDivElement> | TouchEvent): void => {
        if (isDirectionSet.current) {
            return;
        }

        const touchCurrentPosY = event.touches[0].clientY;
        const diffY = Math.abs(touchCurrentPosY - touchStartPosY.current);

        const touchCurrentPosX = event.touches[0].clientX;
        const diffX = Math.abs(touchCurrentPosX - touchStartPosX.current);

        isVertical.current = diffY >= diffX;
        isDirectionSet.current = true;
    }

    const swipeDiff = useRef(0);
    const touchMoveHandler = (event: React.TouchEvent<HTMLDivElement> | TouchEvent): void => {
        // Один раз вызываем функцию чтобы получить направление скролла
        setDirectionOnce(event);

        // Если скролл вертикальный то ничего не делаем
        if (isVertical.current) {
            return;
        }
        
        const touchCurrentPosX = event.touches[0].clientX;
        // Разность между предыдущим и текущим значением
        const diffX = touchCurrentPosX - touchStartPosX.current;
        // Увеличиваем текущее значение на разность, помноженную на замедляющий множитель
        swipeDiff.current += getSwipeMultiplier(swipeDiff.current) * diffX;
        // Присваиваем предыдущему значение текущее
        touchStartPosX.current = touchCurrentPosX;
        increaseTranslate(swipeDiff.current);
    }

    const getSwipeMultiplier = (diff: number): number => {
        const max = getItemWidth();
        const x = Math.abs(diff) / max;

        return Math.max(-((x - 1) ** 5), 0);
    }

    // Для отписки на отключение анимации
    const timeoutId = useRef(0);
    const touchEndHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        movableElem.current!.removeEventListener('touchmove', touchMoveHandler);
        movableElem.current!.style.transition = 'transform 300ms ease';
        const speed = swipeDiff.current / (event.timeStamp - touchStartTime.current);
        if ((swipeDiff.current > getItemWidth() * 0.20 || speed > 0.2) && itemIndex > 0) {
            openedItemChange && openedItemChange(itemIndex - 1);
            setItemIndex(itemIndex - 1);
            increaseTranslate(getItemWidth() + 10);
        } else if ((swipeDiff.current < -getItemWidth() * 0.20 || speed < -0.2) && itemIndex + 1 < items!.length) {
            openedItemChange && openedItemChange(itemIndex + 1);
            setItemIndex(itemIndex + 1);
            increaseTranslate(-(getItemWidth() + 10));
        } else {
            increaseTranslate(0);
        }

        // Когда анимация кончится удаляем свойство transition
        timeoutId.current = setTimeout(() => { 
            if (movableElem.current) {
                movableElem.current.style.transition = ''; 
            }
        }, 300) as unknown as number;
        // Скролл кончился, на следующий скролл заново находим направление
        isDirectionSet.current = false;
    }


    return (
        <div 
            ref={container}
            className={styles.swipeContiner} 
        >
            <div 
                className={styles.row}
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler}
                ref={movableElem}
            >
                { items }
            </div>
        </div>
    )
});

function mainLeftOffset() {
    const main = document.querySelector('main')!;
    const mainWidth = main.getBoundingClientRect().width;
    const rootWidth = document.getElementById('root')!.getBoundingClientRect().width
    return (rootWidth - mainWidth) / 2;
}
