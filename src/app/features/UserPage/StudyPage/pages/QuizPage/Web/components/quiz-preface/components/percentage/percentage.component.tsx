import cls from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './percentage.module.scss';


interface Props {
    percentage: number | undefined,
}

export const Percentage: React.FC<Props> = observer(({percentage}) => {
    return (
        <div className={cls(
                styles.percentageBlock, 
                {[styles.good]: percentage && percentage >= 80},
                {[styles.ok]: percentage && percentage >= 60},
                {[styles.bad]: true},
            )}>
            <h1>{percentage}%</h1>
        </div>
    )
});
