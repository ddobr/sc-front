import { useControlGroup } from './hooks/useControlGroup';
import { QuestionType, IQuestionAnswer, IQuestionAnswerGrade } from '../../../../../../../../common/models';
import { StretchedCard } from '../stretched-card/stretched-card.component';
import { observer } from 'mobx-react-lite';

import styles from './QuestionGroup.module.scss';


interface Props {
    id: number,
    type: QuestionType,
    title: string,
    description: string,
    image: string,
    answer_options: string[],
    onChange: (answer: IQuestionAnswer) => void,
    grade?: IQuestionAnswerGrade,
    index?: number
}

export const QuestionGroup: React.FC<Props> = observer(({
    id,
    type,
    title,
    description,
    image,
    answer_options,
    onChange,
    grade,
    index
}) => {

    const group = useControlGroup(id, answer_options, onChange, type, grade?.user_answers);
    
    return (
        <StretchedCard header={
            <div className={styles.mobileHeader}>
                <span className={styles.mobileIndex}>Вопрос {index}</span>
                <span className={styles.mobileIndex}></span>
            </div>
        }>
            <div className={styles.questionBlock}>
                <h3 className={styles.title}>{title}</h3>
                {
                    grade !== undefined &&
                    <p className={styles.grade}>{grade.is_correct ? 'Верно!' : 'Неверно'}</p>
                }
                { image !== '' && image !== undefined && <img className={styles.image} src={image} alt=''/> }
                { description !== '' && description !== undefined && <p className={styles.description}>{description}</p> }
                { group }
            </div>
        </StretchedCard>
    )
});
