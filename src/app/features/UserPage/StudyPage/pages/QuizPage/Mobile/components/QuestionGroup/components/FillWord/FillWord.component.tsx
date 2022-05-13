import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { AppInput } from "../../../../../../../../../../common/components/AppInput";
import { IQuestionAnswer, IQuestionAnswerGrade } from "../../../../../../../../../../common/models";
import { QuestionComment } from "../QuestionComment/QuestionComment.component";

import styles from './FillWord.module.scss';


interface Props {
    id: number,
    options: string[],
    onChange: (answer: IQuestionAnswer) => void,
    grades?: IQuestionAnswerGrade['user_answers']
}

export const FillWord: React.FC<Props> = observer(({
    id, 
    onChange, 
    grades
}) => {
    const [answer, setAnswer] = useState<string>('');

    const getUserAnswer = useCallback(() => {
        for (const answer in grades) {
            return answer;
        }

        return '';
    }, [grades]);

    const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const option = e.currentTarget.value;
        setAnswer(option);
        onChange({id, answers: [option]});
    }, [id, onChange]);

    return (
        <div className={styles.options}>
            <AppInput 
                placeholder={'Впишите ответ'}
                className={styles.input}
                value={grades ? getUserAnswer() : answer}
                id={`${id}`} 
                name={`${id}`}
                onChange={grades ? undefined : inputChangeHandler}
            />
            {grades &&
                <QuestionComment {...grades[getUserAnswer()]}/>
            }
        </div>
    )
});
