import { observer } from 'mobx-react-lite';
import { memo} from 'react';
import { useHistory } from 'react-router';
import { ScButton } from '../../../../../../../../common/components/button';
import { Skeleton } from '../../../../../../../../common/components/ui-no-interact';
import { getWordNumeral } from '../../../../../../../../common/services/words-numeral.service';
import { StretchedCard } from '../stretched-card/stretched-card.component';

import styles from './QuizDescription.mobile.module.scss';


interface Props {
    timeMinutes: number | undefined,
    questionsCount: number | undefined,
    attemptsCount: number | undefined,
    onStartQuiz: undefined | (() => void)
}

const QuizDescriptionNoMemo: React.FC<Props> = observer(({
    timeMinutes,
    questionsCount,
    attemptsCount,
    onStartQuiz
}) => {

    const history = useHistory();

    // Скелетон если еще не прокинули пропсы
    if (questionsCount === undefined || timeMinutes === undefined || attemptsCount === undefined) {
        return (
            <StretchedCard>
                <Skeleton
                />
                <Skeleton
                    height='10rem'
                />
            </StretchedCard>
        )
    }

    return (
        <StretchedCard>
            <div
                className={styles.quizDescription}
            >
                <div
                    className={styles.text}
                >
                    <h1
                        className={styles.heading}
                    >Внимание!</h1>

                    <p
                        className={styles.description}
                    >
                        Тест имеет ограничение по времени <br />
                        <b> {timeMinutes} мин.</b> и
                        <b> {questionsCount} {getWordNumeral(questionsCount, ['вопрос', 'вопроса', 'вопросов'])}. </b>
                        У вас
                        <b> {attemptsCount} {getWordNumeral(attemptsCount, ['попытка', 'попытки', 'попыток'])}.</b>
                    </p>

                    <p
                        className={styles.about}
                    >
                        На все ваши ответы будут даны комментарии, объясняющие, почему
                        они верны или нет.
                        <br />
                        Обратите внимание: после использования последней попытки следующая возможность сдачи появится
                        только через 24 часа.
                    </p>
                </div>

                <div
                    className={styles.buttons}
                >
                    <ScButton
                        appearance={'secondary'}
                        onClick={onStartQuiz}
                    >Начать тестирование</ScButton>
                    <ScButton
                        style={{ marginBottom: '11px' }}
                        appearance={'transparent'}
                        onClick={() => { history.goBack() }}
                    >Потом</ScButton>
                </div>
            </div>
        </StretchedCard>
    )
});

export const QuizDescription = memo(QuizDescriptionNoMemo, (prevProps, newProps) => {
    return (
        prevProps.timeMinutes === newProps.timeMinutes
        && prevProps.attemptsCount === newProps.attemptsCount
        && prevProps.questionsCount === newProps.questionsCount
        && prevProps.onStartQuiz === newProps.onStartQuiz
    )
})