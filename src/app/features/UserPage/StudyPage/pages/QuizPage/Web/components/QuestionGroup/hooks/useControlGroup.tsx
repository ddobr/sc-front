import { useEffect, useState } from "react"
import { IQuestionAnswer, QuestionType, IQuestionAnswerGrade } from "../../../../../../../../../common/models";
import { CheckboxGroup } from "../components/CheckboxGroup/CheckboxGroup.component";
import { FillWord } from "../components/FillWord/FillWord.component";
import { RadioGroup } from "../components/RadioGroup/RadioGroup.component";

export function useControlGroup(
    id: number,
    answer_options: string[],
    onChange: (answer: IQuestionAnswer) => void,
    type: QuestionType,
    grades?: IQuestionAnswerGrade['user_answers']
): JSX.Element {

    const [group, setGroup] = useState<JSX.Element | null>(<></>);

    useEffect(() => {
        switch (type) {
            case QuestionType.Multiple:
                setGroup(
                    <CheckboxGroup 
                        id={id}
                        options={answer_options}
                        onChange={onChange}
                        grades={grades}
                    />
                );
                break;
            case QuestionType.Single:
                setGroup(
                    <RadioGroup 
                        id={id}
                        options={answer_options}
                        onChange={onChange}
                        grades={grades}
                    />
                );
                break;
            case QuestionType.Fill:
                setGroup(<FillWord 
                    id={id}
                    options={answer_options}
                    onChange={onChange}
                    grades={grades}
                />);
                break;
            default:
                setGroup(<FillWord 
                    id={id}
                    options={answer_options}
                    onChange={onChange}
                    grades={grades}
                />);
        }
    }, [answer_options, grades, id, onChange, type]);
    
    return group!;
}