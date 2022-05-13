import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ScButton } from '../../../../../../../../common/components/button';
import { Skeleton } from '../../../../../../../../common/components/ui-no-interact';
import { Divider } from '../../../../../../../../common/components/ui-no-interact/divider';
import { secondsToTextDate } from '../../../../../../../../common/services';
import { getWordNumeral } from '../../../../../../../../common/services/words-numeral.service';
import { Percentage } from './components/percentage/percentage.component';
import { PreviousAttempt } from './components/previous-attempt/previous-attempt.component';

import styles from './quiz-preface.module.scss';


interface Props {
    onClickStartQuiz: () => void,
    onClickContinueLearning: () => void,
    questionsCount: number | undefined,
    timeInMinutes: number | undefined,
    attemptsRemaining: number | undefined,
    cooldownTimestamp: number | undefined,
    previousAttempts: { percentage: number, datetime: string }[] | undefined;
    onCooldownExpires: undefined | (() => void);
}

export const QuizPreface: React.FC<Props> = observer(({
    onClickStartQuiz,
    onClickContinueLearning,
    onCooldownExpires,
    questionsCount,
    timeInMinutes,
    attemptsRemaining,
    cooldownTimestamp,
    previousAttempts,
}) => {

    /** Пытался ли пройти раньше */
    const triedToPass = useMemo(
        () => previousAttempts !== undefined && previousAttempts.length !== 0,
        [previousAttempts]);

    /** Остались ли попытки */
    const hasAttempts = useMemo(
        () => attemptsRemaining !== undefined && attemptsRemaining > 0,
        [attemptsRemaining]);

    /** Получить сколько МИНУТ осталось до таймстемпа */
    const getCooldownInMinutes = (timestamp: number) => {
        const now = Date.now();
        return (timestamp - now) / (1000 * 60);
    }

    /** Сколько минут осталось то появления новых попыток */
    const [minCooldownTimer, setMinCooldownTimer] = useState<number | null>(
        cooldownTimestamp
            ? getCooldownInMinutes(cooldownTimestamp)
            : null);

    /** Результат последней попытки если есть */
    const lastAttempt = useMemo(
        () => previousAttempts !== undefined && previousAttempts.length > 0 ? previousAttempts[0] : null,
        [previousAttempts]);

    /** Получить комментарий для последней попытки */
    const getCommentToPercentage = (percentage: number) => {
        if (percentage >= 80) {
            return 'Отлично!';
        }

        if (percentage >= 60) {
            return 'Хорошая работа';
        }

        return 'Почти получилось';
    }

    /** Получить напутствие для последней попытки */
    const getWishesToPercentage = (percentage: number) => {
        if (percentage >= 80) {
            return 'Можешь двигаться дальше.';
        }

        if (percentage >= 60) {
            return 'Можешь двигаться дальше, но повтори эту тему.';
        }

        return 'Повтори материал для успешной сдачи теста.';
    }

    // Обратный отсчет до новой попытки
    let cooldownIntervalId: React.MutableRefObject<null | number> = useRef(null);
    useEffect(() => {
        if (cooldownIntervalId.current !== null) {
            clearInterval(cooldownIntervalId.current);
            cooldownIntervalId.current = null;
        }

        if (cooldownTimestamp) {
            cooldownIntervalId.current = setInterval(() => {
                const newMinCooldown = getCooldownInMinutes(cooldownTimestamp);

                if (newMinCooldown <= 0) {
                    clearInterval(cooldownIntervalId.current!);
                    onCooldownExpires && onCooldownExpires();

                    if (newMinCooldown === 0) {
                        setMinCooldownTimer(newMinCooldown);
                    }
                }

                if (newMinCooldown > 0) {
                    setMinCooldownTimer(newMinCooldown);
                }
            }, 1000) as unknown as number;
        }

        return () => {
            if (cooldownIntervalId.current !== null) {
                clearInterval(cooldownIntervalId.current);
                cooldownIntervalId.current = null;
            }
        }
    }, [cooldownTimestamp, onCooldownExpires])

    // Скелетон если еще не прокинули пропсы
    if (questionsCount === undefined || timeInMinutes === undefined || attemptsRemaining === undefined) {
        return (
            <section>
                <Skeleton 
                    height='16rem'
                />
            </section>
        )
    }

    return (
        <>
        <section className={styles.preface}>
            {
                /* Если пробовал раньше */
                triedToPass &&
                <div className={styles.blockAgain}>
                    <div className={styles.main}>
                        <Percentage percentage={lastAttempt!.percentage} />
                        <div className={styles.side}>
                            <h1 className={styles.comment}>{getCommentToPercentage(lastAttempt!.percentage)}</h1>
                            <div className={styles.texts}>
                                <b className={styles.warning}>
                                    Ниже отображены ваши ответы на последней попытке
                                </b>
                                <p>{getWishesToPercentage(lastAttempt!.percentage)}</p>
                            </div>
                            <div className={styles.buttons}>
                                {
                                    // Если набрал 60 баллов - пускаем дальше
                                    lastAttempt!.percentage >= 60 &&
                                    <ScButton
                                        className={styles.button}
                                        onClick={onClickContinueLearning}
                                    >Едем дальше</ScButton>
                                }
                                {
                                    <ScButton
                                        className={styles.button}
                                        onClick={onClickStartQuiz}
                                        disabled={!hasAttempts}
                                        appearance='secondary'
                                    >{
                                        (hasAttempts || minCooldownTimer === null || (minCooldownTimer !== null && minCooldownTimer <= 0))
                                        ? 'Ещё раз' 
                                        : secondsToTextDate(minCooldownTimer * 60, true)
                                    }</ScButton>
                                }
                                {
                                    // Сколько попыток осталось
                                    hasAttempts &&
                                    <span className={styles.attempts}>
                                        {getWordNumeral(attemptsRemaining, ['Осталась', 'Осталось', 'Осталось'])}
                                        <b>{` ${attemptsRemaining} `}</b>
                                        {getWordNumeral(attemptsRemaining, ['попытка', 'попытки', 'попыток'])}
                                    </span>
                                }
                            </div>
                            {
                                !hasAttempts && minCooldownTimer !== null && minCooldownTimer > 0 &&
                                <>
                                    <p className={styles.noAttemptsLeftMessage}>
                                        Попытки кончились, но тест откроется снова, готовьтесь.
                                    </p>
                                </>
                            }
                        </div>
                    </div>
                    <div>
                        <p className={styles.prevAttemptsText}>Результаты предыдущих попыток:</p>
                        {
                            previousAttempts?.map(
                                (attempt, i) => <PreviousAttempt key={i} percentage={attempt.percentage} date={attempt.datetime} />
                            )
                        }
                    </div>
                </div>
            }
            {
                // Проходит тест впервые
                !triedToPass &&
                <div className={styles.firstAttempt}>
                    <h1>Внимание!</h1>
                    <p>
                        Тест имеет ограничение по времени <b>{timeInMinutes} мин.</b> и 
                        <b>{` ${questionsCount}`} {getWordNumeral(questionsCount, ['вопрос', 'вопроса', 'вопросов'])}</b>.
                        У вас <b>{attemptsRemaining} {getWordNumeral(attemptsRemaining, ['попытка', 'попытки', 'попыток'])}</b>.
                    </p>
                    <p>
                        На все ваши ответы будут даны комментарии, объясняющие, почему
                        они верны или нет.
                        <br />
                        Обратите внимание: после использования последней попытки следующая возможность сдачи появится
                        только через <b>24 часа</b>. 
                    </p>

                    <ScButton
                        onClick={onClickStartQuiz}
                    >Начать прохождение</ScButton>
                </div>
            }
        </section>
        {
            triedToPass &&
            <Divider />
        }
        </>
    )
});
