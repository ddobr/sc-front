import cls from 'classnames';
import styles from './QuestionLink.module.scss';
import { IQuestionLink } from '../../interfaces/question-link.interface';
import { LegacyRef } from 'react';
import { observer } from 'mobx-react-lite';
import { studyState } from '../../../../../../../../../../common/root-state';


interface Props extends IQuestionLink {
    onClickId?: (id: number) => void,
    onClickIdx?: (idx: number) => void,
    idx: number,
    current?: boolean,
    reff?: LegacyRef<HTMLDivElement>
}

export const QuestionLink: React.FC<Props> = observer(({
    idx,
    id,
    answered,
    grade,
    current,
    onClickId,
    onClickIdx,
    reff
}) => {
    
    const isAnswered = answered || studyState.quizAnswers?.find(e => e.id === id)?.answers.length !== 0;

    const clickHandler = () => {
        if (onClickId !== undefined) {
            onClickId(id);
        }

        if (onClickIdx !== undefined) {
            onClickIdx(idx);
        }
    }

    const classNames = cls(
        styles.block,
        {[styles.current]: current},
        {[styles.answered]: isAnswered || grade},
        {[styles.mistake]: grade && grade.correct === false}
    );

    return (
        <div
            className={classNames}
            onClick={clickHandler}
            ref={reff}
        >
            <span className={styles.index}>{idx + 1}</span>
        </div>
    )
});
