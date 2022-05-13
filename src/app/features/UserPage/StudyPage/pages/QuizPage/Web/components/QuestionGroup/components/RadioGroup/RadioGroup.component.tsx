import { FormControlLabel } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { IQuestionAnswer, IQuestionAnswerGrade } from "../../../../../../../../../../common/models";
import { QuestionComment } from "../QuestionComment/QuestionComment.component";
import { CustomRadioButton } from "./components/CustomRadioButton/CustomRadioButton.component";

import styles from './RadioGroup.module.scss';


interface Props {
    id: number,
    options: string[],
    onChange: (answer: IQuestionAnswer) => void,
    grades?: IQuestionAnswerGrade['user_answers']
}

export const RadioGroup: React.FC<Props> = observer(({
    id, 
    options, 
    onChange, 
    grades
}) => {
    
    const [answer, setAnswer] = useState<string>('');

    const choiceChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const option = e.currentTarget.name;
        const checked = e.currentTarget.checked;
        
        if (checked && answer !== option) {
            setAnswer(option);
        }

        onChange({id, answers: [option]});
    }, [answer, id, onChange]);

    const optionElements = options.map((option, i) => (
        <div key={i}>
            <FormControlLabel 
                className={styles.option} 
                control={
                    <CustomRadioButton 
                        checked={grades ? (option in grades) : answer === option}
                        onChange={grades ? undefined : choiceChangeHandler} 
                        name={`${option}`}
                    />
                }
                label={option}
            />
            {grades && grades[option] !== undefined &&
                <QuestionComment 
                    is_correct={grades[option].is_correct}
                    caption={grades[option].caption}
                />
            }
        </div>
    ))

    return (
        <div className={styles.options}>
            {optionElements}
        </div>
    )
});
