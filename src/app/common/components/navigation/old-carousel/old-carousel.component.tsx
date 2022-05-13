import { ReactComponent as CarouselArrow } from "../../../../../assets/img/carouselArrow.svg";
import { ReactComponent as CarouselArrowBack } from "../../../../../assets/img/carouselArrowBack.svg";
import { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from "mobx-react-lite";

import styles from './old-carousel.module.scss';

interface Props {
    children: JSX.Element[],
    title: string
}

export const OldCarousel: React.FC<Props> = observer(({children, title}) => {
    const [articleInd, setArticleInd] = useState(0);
    const movable = useRef<HTMLDivElement>(null);
    const elemWidth = useRef<HTMLDivElement>(null);


    const clickBack = () => {
        setArticleInd(Math.max(0, articleInd - 1));
    }

    const clickFwd = () => {
        setArticleInd(Math.min(articleInd + 1, children.length - 1));
    }

    const getOffset = useCallback(() => {
        if (elemWidth !== null && elemWidth.current !== null) {
            return (-1 * elemWidth.current.clientWidth - 10) * articleInd;
        }

        return 0;
    }, [articleInd]);


    useEffect(() => {
        const onResize = () => {
            if (movable !== null && movable.current !== null) {
                movable.current.style.left = `${getOffset()}px`;
            }
        }

        window.addEventListener('resize', onResize);

        return () => { window.removeEventListener('resize', onResize) }
    }, [getOffset])


    return (
        <div className={styles.newsBlock}>

            <div className={styles.blockHeader}>
                <h2>{title}</h2>
                <div className={styles.controls}>
                    <CarouselArrowBack
                        onClick={clickBack}
                        className={styles.arrow} 
                    />
                    <CarouselArrow 
                        onClick={clickFwd}
                        className={styles.arrow}
                    />
                </div>
            </div>
            { // mobile: сstyle={{width: '100vw', marginLeft: '-5vw'}}
            }
            <div className={styles.itemsContainer} ref={elemWidth}>
                <div
                    ref={movable}
                    style={{left: `${getOffset()}px`}}
                    className={styles.movable}
                >
                    { children }
                </div>
            </div>
        </div>
    )
});
