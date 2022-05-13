import cls from 'classnames';
import { observer } from 'mobx-react-lite';
import { forwardRef, useMemo } from 'react';

import styles from './skeleton.module.scss';


interface Props {
    borderRadius?: string,
    width?: string,
    height?: string,
    className?: string,
    fullHeight?: true,
}

export const Skeleton = observer(
    // Компонент с forwardRef
    forwardRef<HTMLDivElement, Props>(({
        borderRadius,
        width,
        height,
        className
    }, ref) => {
    
        const clsName = useMemo(() => cls(className, styles.skeleton), [className]);

        return (
            <div
                ref={ref}
                className={clsName}
                style={{
                    borderRadius: borderRadius,
                    width: width,
                    height: height
                }}
            >
                <div className={styles.skeletonRunner}></div>
            </div>
        )
    })
);
