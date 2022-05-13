import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef, useState } from 'react';
import { secondsToTime } from '../../../services';
import styles from './countdown-line.module.scss';


interface Props {
    totalSeconds: number,
    endTimestamp: number,
    onExpire?: () => void,
}

export const CountdownLine: React.FC<Props> = observer(({
    totalSeconds,
    endTimestamp,
    onExpire
}) => {

    const getSecondsRemain = useCallback(() => {
        const now = Date.now();
        const diff = endTimestamp - now

        return (diff) / 1000;
    }, [endTimestamp]);

    const [secondsRemain, setSecondsRemain] = useState(getSecondsRemain());

    const intervalId = useRef<number | null>(null);
    useEffect(() => {
        if (intervalId.current !== null) {
            clearInterval(intervalId.current);
        }

        const onSecondTick = () => {
            const newSecondsRemain = getSecondsRemain();

            if (newSecondsRemain >= 0) {
                setSecondsRemain(newSecondsRemain);
            } else {
                onExpire && onExpire();
                if (intervalId.current !== null) {
                    clearInterval(intervalId.current)
                }
            }
        }

        intervalId.current = setInterval(() => {
            onSecondTick();
        }, 500) as unknown as number;

        return () => {
            if (intervalId.current !== null) {
                clearInterval(intervalId.current);
            }
        }
    }, [onExpire, getSecondsRemain])

    return (
        <div className={styles.countdownWrapper}>
            <div className={styles.lineWrapper}>
                <div 
                    className={styles.line}
                    style={{
                        width: `${(totalSeconds - secondsRemain) / totalSeconds * 100}%`
                    }}
                ></div>
            </div>
            <div className={styles.timer}>{ secondsRemain >= 0 ? secondsToTime(secondsRemain) : '...'}</div>
        </div>
    )

});
