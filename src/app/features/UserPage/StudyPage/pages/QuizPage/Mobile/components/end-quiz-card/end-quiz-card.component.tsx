import { observer } from "mobx-react-lite";
import { ScButton } from "../../../../../../../../common/components/button";
import { StretchedCard } from "../stretched-card/stretched-card.component";

import styles from './end-quiz-card.module.scss';

interface Props {
    onEndQuizClick: () => void,
    onReviewClick?: () => void,
}

export const EndQuizCard: React.FC<Props> = observer(({
    onEndQuizClick,
    onReviewClick
}) => {

    return <StretchedCard>
        <div  className={styles.card}>
            <h2>Почти все</h2>
            <p className={styles.info}>
                У тебя осталось еще немного времени, можешь вернуться и перепроверить ответы
            </p>
            <ScButton className={styles.btnTop} onClick={onEndQuizClick}>Завершить тест</ScButton>
            <ScButton appearance="transparent" onClick={onReviewClick} className={styles.btnBottom}>Лучше все перепроверю</ScButton>
        </div>
    </StretchedCard>
});
