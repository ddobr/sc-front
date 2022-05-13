import cls from 'classnames';
import { useMemo, useRef } from 'react';
import { useControlGroup } from './hooks/useControlGroup';
import { QuestionType, IQuestionAnswer, IQuestionAnswerGrade } from '../../../../../../../../common/models';
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
    const groupCls = useMemo(() => cls(
        styles.questionBlock,
        {[styles.incorrect]: grade !== undefined && grade.is_correct === false}
    ), [grade]);

    const group = useControlGroup(id, answer_options, onChange, type, grade?.user_answers);
    const groupRef = useRef<HTMLDivElement>(null);

    return (
        <div className={groupCls} ref={groupRef}>
            <h3 className={styles.title}>{title}</h3>
            { image !== '' && image !== undefined && <img className={styles.image} src={image} alt=''/> }
            { description !== '' && description !== undefined && <p className={styles.description}>{description}</p> }
            { group }
        </div>
    )
});
