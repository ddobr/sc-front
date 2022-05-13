import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef } from "react"
import { EndQuizLink } from "./components/EndQuizLink/QndQuizLink.component";
import { QuestionLink } from "./components/QuestionLink/QuestionLink.component";
import { IQuestionLink } from "./interfaces/question-link.interface";

import styles from './QuizNavigation.module.scss';


interface Props {
    questions: IQuestionLink[],
    currentQuestionIdx: number,
    onItemClickIdx?: (idx: number) => void,
}

export const QuizNavigation: React.FC<Props> = observer(({
    questions, 
    currentQuestionIdx,
    onItemClickIdx,
}) => {

    const currentLinkRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const items = useMemo(() => {
        const links = questions.map((question, idx) => 
        <QuestionLink 
            reff={currentQuestionIdx === idx ? currentLinkRef : undefined}
            key={question.id}
            id={question.id}
            idx={idx}
            answered={question.answered}
            current={currentQuestionIdx === idx}
            grade={question.grade}
            onClickIdx={onItemClickIdx}
        />);

        links.push(
            <EndQuizLink 
                key={'endQuizLink'}
                idx={questions.length}
                current={currentQuestionIdx === questions.length}
                reff={currentQuestionIdx === questions.length ? currentLinkRef : undefined}
                onClickIdx={onItemClickIdx}
            />
        );

        return links;
    }, [currentQuestionIdx, onItemClickIdx, questions]);

    useEffect(() => {
        if (containerRef.current && currentLinkRef.current) {
            const halfWidth = containerRef.current.clientWidth / 2;
            const itemHalfWidth = currentLinkRef.current.clientWidth / 2;
            if (currentLinkRef.current.offsetLeft !== halfWidth) {
                const offsetDiff = currentLinkRef.current.offsetLeft - halfWidth + itemHalfWidth;
                containerRef.current.scroll({left: offsetDiff, behavior: 'smooth'});
            }
        }
    }, [currentQuestionIdx])

    return (
        <nav 
            className={styles.navigation}
            ref={containerRef}
        >
            { items }
            <div className={styles.border}>
            </div>
        </nav>
    )
});
