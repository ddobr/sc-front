import cls from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './previous-attempt.module.scss';


interface Props {
    percentage: number,
    date: string
}

export const PreviousAttempt: React.FC<Props> = observer(({percentage, date}) => {
    return (
        <div className={cls(
            styles.attempt,
            {[styles.good]: percentage >= 80},
            {[styles.ok]: percentage >= 60},
            {[styles.bad]: true},
        )}>
            <span className={styles.percentage}>{percentage}%</span>
            <span className={styles.date}>{date}</span>
        </div>
    )
});
