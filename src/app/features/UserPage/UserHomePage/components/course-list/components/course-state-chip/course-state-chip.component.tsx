import { observer } from "mobx-react-lite";
import { ReactComponent as StarSvg } from '../../../../../../../../assets/img/orange-star-icon.svg';
import { ReactComponent as DoneSvg } from '../../../../../../../../assets/img/green-done-icon.svg';
import { ReactComponent as ExpiredSvg } from '../../../../../../../../assets/img/red-expired-icon.svg';
import cls from 'classnames';
import { useEffect, useState } from "react";
import { isAnyMobile } from "../../../../../../../common/services/is-mobile.service";

import styles from './course-state-chip.module.scss';

interface Props {
    /** На сколько процентов курс пройден  */
    percentage: number,
    /** Просрочен ли курс */
    isExpired?: boolean,
    /** Завершен ли курс */
    isFinished?: boolean,
}

export const CourseStateChip: React.FC<Props> = observer(({
    percentage,
    isExpired = false,
    isFinished = false
}) => {

    const [theme, setTheme] = useState<{ color: 'red' | 'green' | 'orange', icon?: JSX.Element }>(getColorAndIcon(percentage, isExpired, isFinished));

    useEffect(() => {
        setTheme(getColorAndIcon(percentage, isExpired, isFinished));
    }, [percentage, isExpired, isFinished])

    return <div
        className={cls(styles.chip, {
            [styles.done]: theme.color === 'green',
            [styles.inProgress]: theme.color === 'orange',
            [styles.expired]: theme.color === 'red',
        })}
    >
        {
            theme.icon &&
            <div className={styles.icon}>
                {theme.icon}
            </div>
        }
        {
            getText(percentage, isExpired, isFinished) !== '' &&
            <div className={styles.text}>
                {getText(percentage, isExpired, isFinished)}
            </div>
        }
    </div>
});

function getColorAndIcon(
    percentage: number,
    isExpired: boolean,
    isFinished: boolean
): { color: 'red' | 'green' | 'orange', icon?: JSX.Element } {

    if (isExpired) {
        return { color: 'red', icon: <ExpiredSvg /> };
    }

    if (isFinished) {
        return { color: 'green', icon: <DoneSvg /> };
    }

    return { color: 'orange', icon: percentage > 0 ? undefined : <StarSvg /> };
}

function getText(
    percentage: number,
    isExpired: boolean,
    isFinished: boolean,
): string {
    percentage = Math.round(percentage);

    if (!isAnyMobile) {
        if (isExpired) {
            return `Просрочен, ${percentage}%`
        }

        if (isFinished) {
            return `Завершен, ${percentage}%`
        }

        if (percentage === 0) {
            return 'Новый';
        }
    }

    if (percentage !== 0 && !isExpired && !isFinished) {
        return `${percentage}%`;
    }

    return '';
}