import { useState, useMemo } from 'react';
import { PageHeading } from '../../../../../../common/components/layouts/page-heading';
import { Swiper } from '../../../../../../common/components/navigation/swiper';
import { IQuiz, IQuizGrade, IQuestionAnswer, IQuizPreface } from '../../../../../../common/models';
import { QuestionGroup } from './components/QuestionGroup';
import { IQuestionLink } from './components/QuizNavigation/interfaces/question-link.interface';
import { QuizNavigation } from './components/QuizNavigation/QuizNavigation.component';
import { QuizStage } from '../enums';
import { CountdownLine } from '../../../../../../common/components/ui-no-interact';
import { QuizDescription } from './components/QuizDescription/QuizDescription.mobile.component';
import { QuizResultCard } from './components/quiz-result-card/quiz-result-card.component';
import { EndQuizCard } from './components/end-quiz-card/end-quiz-card.component';
import { observer } from 'mobx-react-lite';
import { studyState } from '../../../../../../common/root-state';

// import styles from './QuizPage.mobile.module.scss';


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

export const QuizPageMobile: React.FC<Props> = observer(({
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

    // const sectionId = Number(useParams<{sectionId: string}>().sectionId);
    // const courseId = Number(useParams<{ courseId: string }>().courseId);
    const answers = studyState.quizAnswers;
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

    const questionComponents = useMemo(() => {
        if (quiz === null) {
            return [];
        }
        
        const questionComponents: JSX.Element[] = [];  
        let index = 0;      
        for (const question of quiz.questions) {
            const grade = quizResult?.answers.find(answer => answer.question_id === question.id);
            questionComponents.push(
                <QuestionGroup 
                    {...question} 
                    key={question.id} 
                    onChange={inputHandler} 
                    grade={grade}
                    index={++index}
                />
            );
        }

        if (quizStage === QuizStage.finished) {
            questionComponents.push(
                <QuizResultCard key={'QuizResultCard'} percentage={25}/>
            )
        }

        if (quizStage === QuizStage.inProgress) {
            questionComponents.push(
                <EndQuizCard 
                    key={'EndQuizCard'} 
                    onEndQuizClick={onSubmitQuiz} 
                    onReviewClick={() => setCurrentQuestionIdx(0)}
                />
            )
        }

        return questionComponents;
    }, [inputHandler, quiz, quizResult?.answers, quizStage, onSubmitQuiz]);

    const questionLinks: IQuestionLink[]  = useMemo(() => {
        if (quiz) {
            return quiz.questions.map<IQuestionLink>(question => {
                let grade: {
                    correct: boolean
                } | undefined = undefined;

                if (quizResult) {
                    const result = quizResult.answers.find(e => e.question_id === question.id);
                    if (result !== undefined) {
                        grade = { correct: result.is_correct };
                    }
                }

                const answered = answers?.find(e => e.id === question.id)?.answers.length;

                return {
                    id: question.id,
                    answered: answered !== undefined && answered !== 0,
                    grade: grade
                }
            });
        }

        return [];
    }, [answers, quiz, quizResult]);

    const QuizPrefaceWithProps = useMemo(() => <QuizDescription
        timeMinutes={quizPreface?.time_in_minutes}
        questionsCount={quizPreface?.questions_count}
        attemptsCount={quizPreface?.attempts_remaining}
        onStartQuiz={startQuizClickHandler}
    />, [quizPreface, startQuizClickHandler]);

    if (quizStage === QuizStage.loading) {
        return (
            <>
                <PageHeading
                    title={quizPreface ? quizPreface.title : undefined}
                    goBackLink
                />
                <QuizDescription
                    timeMinutes={undefined}
                    questionsCount={undefined}
                    attemptsCount={undefined}
                    onStartQuiz={undefined}
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
            </>
        );
    }

    return (
        <>
            <PageHeading 
                title={quizPreface?.title}
            />
            {
                quiz &&
                <CountdownLine 
                    totalSeconds={quiz?.quiz_duration_seconds} 
                    endTimestamp={quizStage === QuizStage.inProgress ? quiz?.end_timestamp : 0}
                    onExpire={onSubmitQuiz}
                />
            }
            <QuizNavigation 
                questions={questionLinks}
                currentQuestionIdx={currentQuestionIdx}
                onItemClickIdx={setCurrentQuestionIdx}
            />
            <Swiper
                fullWidth
                openedIdx={currentQuestionIdx}
                openedItemChange={setCurrentQuestionIdx}
            >
            { questionComponents }
            </Swiper>
        </>
    )
});

