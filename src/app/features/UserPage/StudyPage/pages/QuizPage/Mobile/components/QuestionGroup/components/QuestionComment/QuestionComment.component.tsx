import { useQuestionComment } from './hooks/useQuestionComment';
import cls from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './QuestionComment.module.scss';


interface Props {
    is_correct: boolean,
    caption: string | null,
}

export const QuestionComment: React.FC<Props> = observer(({is_correct, caption}) => {
    const comment = useQuestionComment(is_correct);

    return (
        <div className={cls(
                styles.comment, 
                {[styles.correct]: is_correct},
                {[styles.incorrect]: !is_correct},
            )}>
            <h4 className={styles.commentHeader}>{comment}</h4>
            <p className={styles.commentFooter}>{caption}</p>
        </div>
    )
});
