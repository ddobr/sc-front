import { FormControlLabel, FormGroup } from "@material-ui/core";
import { useCallback, useState } from "react";
import { CustomCheckbox } from "./components/CustomCheckbox/CustomCheckbox.component";
import { QuestionComment } from "../QuestionComment/QuestionComment.component";
import { IQuestionAnswer, IQuestionAnswerGrade } from "../../../../../../../../../../common/models";
import { observer } from "mobx-react-lite";

import styles from './CheckboxGroup.module.scss';


interface Props {
    id: number,
    options: string[],
    onChange: (answer: IQuestionAnswer) => void,
    grades?: IQuestionAnswerGrade['user_answers']
}

export const CheckboxGroup: React.FC<Props> = observer(({
    id,
    options,
    onChange,
    grades
}) => {

    const getInitialState = useCallback(() => {
        const initialState: { [key: string]: boolean } = {};
        for (const option of options) {
            initialState[option] = false;
        }

        return initialState;
    }, [options]);

    const [answer, setAnswer] = useState<{[key: string]: boolean}>(getInitialState());

    const onMultiSelectChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        const name = e.currentTarget.name;

        const newAnswer = {...answer};
        newAnswer[name] = checked;
        setAnswer(newAnswer);
        const selected = [];
        for (const optionKey in newAnswer) {
            if (newAnswer[optionKey]) {
                selected.push(optionKey);
            }
        }

        onChange({id, answers: selected});
    }, [answer, id, onChange]);

    const optionElements = options.map((option, i) => (
        <div key={i}>
            <FormControlLabel 
                className={styles.option} 
                control={
                    <CustomCheckbox 
                        checked={grades ? (option in grades) : answer[option]} 
                        onChange={grades ? undefined : onMultiSelectChange} 
                        name={option}
                    />
                }
                label={option}
            />
            { 
                grades && grades[option] !== undefined && 
                <QuestionComment 
                    is_correct={grades[option].is_correct}
                    caption={grades[option].caption}
                />
            }
        </div>
    ))

    return (
        <FormGroup className={styles.options}>
            {optionElements}
        </FormGroup>
    )
});
