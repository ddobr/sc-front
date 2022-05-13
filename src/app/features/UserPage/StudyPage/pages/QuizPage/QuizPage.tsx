import { observer } from 'mobx-react-lite';
import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { user } from '../../../../../common/api';
import { IQuiz, IQuizGrade, IQuizPreface, IQuestionAnswer } from '../../../../../common/models';
import { sessionsState, studyState } from '../../../../../common/root-state';
import { sessionsService } from '../../../../../common/services';
import { isAnyMobile } from '../../../../../common/services/is-mobile.service';
import { index } from '../../../../../common/services/routing-service/navigation-urls';
import { useFlatChapters } from '../../hooks/useFlatChapters.hook';
import { QuizStage } from './enums';
import { QuizPageMobile } from './Mobile/QuizPage.mobile.component';
import { QuizPageWeb } from './Web/QuizPage.web.component';


export const QuizPage: React.FC = observer(() => {
    const courseId = Number(useParams<{courseId: string}>().courseId);
    const sectionId = Number(useParams<{ sectionId: string }>().sectionId);
    const history = useHistory();
    const selectedCourseInfo = studyState.course;
    const answers = studyState.quizAnswers;
    const course = studyState.course;

    /** Вопросы теста */
    const [quiz, setQuiz] = useState<IQuiz | null>(null);
    /** Результаты теста */
    const [quizResult, setResult] = useState<IQuizGrade | null>(null);
    /** Стадия теста */
    const [quizStage, setQuizStage] = useState(QuizStage.loading);
    /** Информация о тесте */
    const [quizPreface, setQuizPreface] = useState<IQuizPreface | null>(null);

    /** Сессия с информацией о текущем тесте */
    const quizSession = sessionsState.quizSession;
    let [items, setPrevItem, setNextItem] = useFlatChapters(
        selectedCourseInfo,
        sectionId,
        'quiz'
    );

    // Перенаправление с недоступного теста
    useEffect(() => {
        if (course) {
            const section = course.sections.find(e => e.id === sectionId);
            if (section) {
                if (section.is_available === false) {
                    history.push(index());
                }
    
                const quiz = section.quiz;
                if (quiz?.available === false) {
                    history.push(index());
                }
            }
        }
    }, [courseId, history, course, sectionId]);

    // Получение информации о тесте (не вопросов)
    useEffect(() => {
        const quizPreface = user.getQuizPreface(sectionId);

        try {
            quizPreface.response
                .catch(() => { return null })    
                .then((prefaceResponse => {
                    if (prefaceResponse && prefaceResponse.data) {
                        setQuizPreface(prefaceResponse.data);
                    }
                }));
        } catch {
        }

        return () => {
            quizPreface.cancelFn();
        }
    }, [quiz?.id, sectionId]);

    // Ожидание информации о сессии и выставление соответствующего stage
    useEffect(() => {
        let startedQuizCancelFn: null | ((message?: string | undefined) => void) = null;

        // После отправки квиза мы запрашиваем новую сессию, что приводит к повторному выставлению 
        // forbidden inactive или inProgress поэтому тут делаем такой костыль
        const changeQuizStage = (prevQs: QuizStage, newQs: QuizStage) => {
            if (prevQs === QuizStage.finished) {
                return prevQs;
            }
            
            return newQs
        }

        if (quizSession?.in_progress !== undefined && quizSession?.in_progress !== null ) {
            if (quizSession.in_progress) {
                if (quizSession.section_id === sectionId) {
                    setQuizStage((qs) => changeQuizStage(qs, QuizStage.inProgress));
                    const req = user.getStartedSectionQuiz(sectionId);
                    startedQuizCancelFn = req.cancelFn;
                    req.response
                        .catch((err) => { console.log(err); return null; })
                        .then(response => {
                            if (response) {
                                setQuiz(response.data);
                            }
                        })

                } else {
                    setQuizStage((qs) => changeQuizStage(qs, QuizStage.forbidden));
                }
            } else {
                setQuizStage((qs) => changeQuizStage(qs, QuizStage.inactive));
            }
        }

        return () => {
            if (startedQuizCancelFn !== null) {
                startedQuizCancelFn();
            }
        }
    }, [quizSession?.section_id, quizSession?.in_progress, sectionId]);

    /** Хэндлер события окончания ожидания появления новых попыток */
    const cooldownExpiresHandler = useCallback(() => {
        const quizPreface = user.getQuizPreface(sectionId);

        try {
            quizPreface.response
                .catch(() => { return null })    
                .then((prefaceResponse => {
                    if (prefaceResponse && prefaceResponse.data) {
                        setQuizPreface(prefaceResponse.data);
                        setQuizStage(QuizStage.inactive);
                    }
                }));
        } catch {
        }
    }, [sectionId]);

    /** Ввод ответа */
    const inputHandler = useCallback((answer: IQuestionAnswer) => {
        studyState.setAnswer(answer);
    }, []);

    /** Отправка теста */
    const onSubmitQuiz = useCallback(() => {
        if (quizStage === QuizStage.inProgress) {
            user.answerSectionQuiz(sectionId, answers || []).response
                .then((res) => { 
                    setResult(res.data);
                    setQuizStage(QuizStage.finished);
                    sessionsService.getQuizSession();
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                })
        }
    }, [answers, quizStage, sectionId]);

    /** Хэндлер события нажатия на кнопку "Начать тест" */
    const startQuizClickHandler = useCallback(() => {
        setQuiz(null);
        setResult(null);
        const quizSub = user.startSectionQuiz(sectionId);
        setQuizStage(QuizStage.loading);

        try {
            quizSub.response
                .then(quizResponse => {
                    setQuiz(quizResponse.data);
                    studyState.setQuiz(quizResponse.data);
                    setQuizStage(QuizStage.inProgress);
                });
        } catch { }
    }, [sectionId]);

    /** Нажатие на кнопку "Вперед" */
    const clickForwardHandler = useCallback(() => {
        if (items.current?.nextItem) {
            setNextItem();
            history.push(items.current.url);
        }
    }, [history, items, setNextItem]);

    /** Можно ли нажать на кнопку "Вперед" */
    const forwardButtonActive = useCallback(() => {
        if (items.current?.nextItem) {
            return true;
        }

        return false;
    }, [items]);

    /** Нажатие на кнопку "Назад" */
    const clickBackHandler = () => {
        if (items.current?.prevItem) {
            setPrevItem();
            history.push(items.current.url);
        }
    }

    /** Можно ли нажать на кнопку "Назад" */
    const backButtonActive = useCallback(() => {
        if (items.current?.prevItem) {
            return true;
        }

        return false;
    }, [items]);
    

    if (!isAnyMobile) {
        return (
            <QuizPageWeb
                inputHandler={inputHandler}
                clickBackHandler={clickBackHandler}
                clickForwardHandler={clickForwardHandler}
                cooldownExpiresHandler={cooldownExpiresHandler} 
                startQuizClickHandler={startQuizClickHandler} 
                quizStage={quizStage} 
                quizPreface={quizPreface} 
                backButtonActive={backButtonActive} 
                forwardButtonActive={forwardButtonActive} 
                quiz={quiz} 
                quizResult={quizResult} 
                onSubmitQuiz={onSubmitQuiz}            
            />
        );
    }

    return (
        <QuizPageMobile
            inputHandler={inputHandler}
            clickBackHandler={clickBackHandler}
            clickForwardHandler={clickForwardHandler}
            cooldownExpiresHandler={cooldownExpiresHandler} 
            startQuizClickHandler={startQuizClickHandler} 
            quizStage={quizStage} 
            quizPreface={quizPreface} 
            backButtonActive={backButtonActive} 
            forwardButtonActive={forwardButtonActive} 
            quiz={quiz} 
            quizResult={quizResult} 
            onSubmitQuiz={onSubmitQuiz}            
        />
    );
});
