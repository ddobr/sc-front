import { useMemo } from "react";
import { ScButton } from "../../../../../../common/components/button";
import { PageHeading } from "../../../../../../common/components/layouts/page-heading";
import { IQuestionAnswer, IQuiz, IQuizGrade, IQuizPreface } from "../../../../../../common/models";
import { StudyPageFooter } from "../../../components";
import { QuestionGroup } from "./components/QuestionGroup";
import { CountdownLine, Skeleton } from "../../../../../../common/components/ui-no-interact";
import { QuizPreface } from "./components/quiz-preface/quiz-preface.component";
import { QuizStage } from "../enums";
import { observer } from "mobx-react-lite";

import styles from './QuizPage.module.scss';


interface Props {
    inputHandler: (answer: IQuestionAnswer) => void,
    clickForwardHandler: () => void,
    startQuizClickHandler: () => void,
    quizStage: QuizStage,
    quizPreface: IQuizPreface | null,
    cooldownExpiresHandler: () => void,
    clickBackHandler: () => void,
    backButtonActive: () => boolean,
    forwardButtonActive: () => boolean,
    quiz: IQuiz | null,
    quizResult: IQuizGrade | null,
    onSubmitQuiz: () => void,
}

export const QuizPageWeb: React.FC<Props> = observer(({
    inputHandler,
    clickForwardHandler,
    forwardButtonActive,
    clickBackHandler,
    backButtonActive,
    startQuizClickHandler,
    cooldownExpiresHandler,
    onSubmitQuiz,
    quizStage,
    quizPreface,
    quiz,
    quizResult,
}) => {
    
    //const courseId = Number(useParams<{ courseId: string }>().courseId);

    const createQuestionComponents = (quiz: IQuiz | null, results: IQuizGrade | null) => {
        if (quiz === null) {
            return [];
        }

        const questionComponents: JSX.Element[] = [];
        for (const question of quiz.questions) {
            const grade = results?.answers.find(answer => answer.question_id === question.id);
            questionComponents.push(
                <QuestionGroup
                    {...question}
                    key={question.id}
                    onChange={inputHandler}
                    grade={grade} />
            );
        }

        return questionComponents;
    }
    
    const QuizPrefaceWithProps = useMemo(() => {
        return <QuizPreface
            onClickContinueLearning={clickForwardHandler}
            onClickStartQuiz={startQuizClickHandler}
            onCooldownExpires={quizStage === QuizStage.inactive || quizStage === QuizStage.finished ? cooldownExpiresHandler : undefined}
            questionsCount={quizPreface?.questions_count}
            timeInMinutes={quizPreface?.time_in_minutes}
            attemptsRemaining={quizPreface?.attempts_remaining}
            cooldownTimestamp={quizPreface?.cooldown_timestamp}
            previousAttempts={quizPreface?.previous_attempts}
        />
    }, [quizPreface, startQuizClickHandler, cooldownExpiresHandler, quizStage, clickForwardHandler]);

    const FooterWithProps = <StudyPageFooter
        onClickBack={clickBackHandler}
        backButtonDisabled={!backButtonActive()}
        onClickForward={clickForwardHandler}
        forwardButtonDisabled={!forwardButtonActive()}
    />

    if (quizStage === QuizStage.loading) {
        return (
            <>
                <PageHeading
                    title={quizPreface ? quizPreface.title : undefined}
                    goBackLink
                />
                <Skeleton 
                    height="10rem"
                />
                <Skeleton 
                    height="10rem"
                />
                <Skeleton 
                    height="8rem"
                />
            </>
        );
    }

    if (quizStage === QuizStage.forbidden) {
        return (
            <h1>Вы уже проходите другой тест</h1>
        )
    }

    if (quizStage === QuizStage.inactive) {
        return (
            <>
                <PageHeading
                    title={quizPreface ? quizPreface.title : undefined}
                    goBackLink
                />
                { QuizPrefaceWithProps }
                { FooterWithProps }
            </>
        );
    }

    if (quizStage === QuizStage.inProgress) {
        let sideButtons = [];

        if (quizPreface && quiz) {
            sideButtons.push(
                <CountdownLine 
                    key='countdown1'
                    totalSeconds={quiz?.quiz_duration_seconds} 
                    endTimestamp={quiz?.end_timestamp}
                    onExpire={onSubmitQuiz}
                />);
        }

        return (
            <>
                <PageHeading
                    title={quizPreface ? quizPreface.title : undefined}
                    goBackLink
                    sideButtons={sideButtons}
                />
                { createQuestionComponents(quiz, quizResult) }
                <ScButton
                    className={styles.submitBtn}
                    onClick={onSubmitQuiz}
                >Завершить тест</ScButton>
            </>
        );
    }

    if (quizStage === QuizStage.finished || true) {
        return (
            <>
                <PageHeading
                    title={quizPreface ? quizPreface.title : undefined}
                    goBackLink
                />
                { QuizPrefaceWithProps }
                { createQuestionComponents(quiz, quizResult) }
                { FooterWithProps }
            </>
        )
    }
});
