import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

import styles from './circular-progress.module.scss';


interface Props {
    percentage: number
}

export const CircularProgress: React.FC<Props> = observer(({ percentage }) => {
    const circle = useRef<SVGCircleElement>(null);

    // Изначальные значения - для анимации
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeOffset = (1 / 4) * circumference;
    const strokeDasharray = 0;


    useEffect(() => {
        const draw = () => {
            const circumference = 2 * Math.PI * radius;
            const strokeOffset = (1 / 4) * circumference;
            const strokeDasharray = (percentage / 100) * circumference;

            if (circle.current) {
                circle.current.style.strokeDasharray = `${strokeDasharray} ${circumference - strokeDasharray}`;
                circle.current.style.strokeDashoffset=`${strokeOffset}`;
            }
        }

        const timeoutId = setTimeout(() => {
            draw();
        }, 10);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [percentage])


    return (
        <div className={styles.progress}>
            <svg width="140" height="140" >
                <circle
                    cx="70" 
                    cy="70" 
                    r={radius}
                    fill="none" 
                    strokeWidth={8} 
                    stroke={getPercentageColors(percentage).background}
                />
                <circle
                    style={{
                        transition: 'stroke-dasharray ease 600ms'
                    }}
                    ref={circle}
                    cx="70" 
                    cy="70" r={radius}
                    fill="none" 
                    strokeWidth={8} 
                    stroke={getPercentageColors(percentage).main}
                    strokeDasharray={`${strokeDasharray} ${circumference - strokeDasharray}`}
                    strokeDashoffset={strokeOffset}
                />
            </svg>
            <div className={styles.digits}>{Math.round(percentage * 100) / 100}%</div>
        </div>
    )
});

function getPercentageColors(percentage: number): { main: string, background: string} {
    if (percentage >= 80) {
        return {
            main: '#5BCE00',
            background: '#EFFBE6'
        }
    }

    if (percentage >= 60) {
        return {
            main: '#E5702A',
            background: '#FDF1EA'
        }
    }

    return {
        main: '#E52A2A',
        background: '#FDEAEA'
    }
}