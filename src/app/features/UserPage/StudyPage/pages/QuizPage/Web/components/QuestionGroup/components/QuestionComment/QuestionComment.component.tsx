import { observer } from 'mobx-react-lite';
import { useQuestionComment } from './hooks/useQuestionComment';
import styles from './QuestionComment.module.scss';

interface Props {
    is_correct: boolean,
    caption: string | null,
}

export const QuestionComment: React.FC<Props> = observer(({is_correct, caption}) => {
    const comment = useQuestionComment(is_correct);

    return (
        <div className={styles.comment}>
            <h4 className={styles.commentHeader}>{comment}</h4>
            <p className={styles.commentFooter}>{caption}</p>
        </div>
    )
});
