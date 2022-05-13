import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { StretchedCard } from "../stretched-card/stretched-card.component";
import { CircularProgress } from "./components/circular-progress/circular-progress.component"

import styles from './quiz-result-card.module.scss';


interface Props {
    percentage: number
}

export const QuizResultCard: React.FC<Props> = observer(({percentage}) => {

    const title = useMemo(() => {
        return getTitle(percentage);
    }, [percentage]);

    return (
        <StretchedCard>
            <div className={styles.resultCard}>
                <h2 className={styles.title}>{title}</h2>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '30px'}}>
                    <CircularProgress percentage={percentage} />
                </div>
                { percentage < 80 &&
                    <>
                    <p className={styles.focusText}>
                        Вопросы, на которые вы ответили неверно, помечены. Уделите им особое внимание
                    </p>
                    <p className={styles.text}>
                        Изучите по-подробнее темы из этого раздела. И попробуйте еще раз. У вас все получится!
                    </p>
                    </>
                }
            </div>
        </StretchedCard>
    )
});

function getTitle(percentage: number) {
    if (percentage >= 80) {
        return 'Отлично!'
    }

    if (percentage >= 60) {
        return 'Уже почти!'
    }

    return 'Бывает'
}