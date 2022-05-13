import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { user } from '../../../../../api';
import { sessionsState } from '../../../../../root-state';
import { secondsToTime } from '../../../../../services';
import modalEventsService from '../../../../../services/modal-events-service/modal-events-service';
import { toSectionQuiz } from '../../../../../services/routing-service/navigation-urls';
import { ScButton } from '../../../../button';

import styles from './quiz-session-modal.web.module.scss';


export const QuizSessionModalWebComponent: React.FC = observer(() => {
    const session = sessionsState.quizSession;
    const [willShow, setWillShow] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const history = useHistory();
    const location = useLocation();

    // Нужно ли показывать модалку в зависимости от того, находится ли мы в разрешенном path
    useEffect(() => {
        let newWillShow = true;
        if (session?.in_progress) {
            newWillShow = location.pathname !== toSectionQuiz(session.course_id, session.section_id);
        }

        setWillShow(newWillShow);
    }, [location.pathname, session]);

    /** Таймер до конца квиза */
    useEffect(() => {
        if (session?.in_progress) {
            const onSecondTick = () => {
                const nowTimeStamp = Date.now();
                const newSecondsRemaining = (session.end_timestamp - nowTimeStamp) / 1000;
    
                setSecondsRemaining(newSecondsRemaining);

                if (newSecondsRemaining <= 0) {
                    modalEventsService.hideQuizSessionModal();
                }
            }
    
            const timer = setInterval(onSecondTick, 1000);
    
            return () => {
                clearInterval(timer);
            }
        }
    }, [session?.end_timestamp, session?.in_progress]);

    // Получение названия теста
    useEffect(() => {
        if (session?.in_progress) {
            const sub = user.getCourseContent(session.course_id);
    
            sub.response.then(courseRes => {
                const course = courseRes.data;
                const title = course.sections.find(section => section.id === session.section_id)!.quiz?.title;
    
                setQuizTitle(title || '');
            }).catch()
    
            return () => {
                sub.cancelFn()
            }
        }
    }, [session?.course_id, session?.section_id, session?.in_progress]);

    const clickHandler = () => {
        if (session) {
            history.push(toSectionQuiz(session.course_id, session.section_id));
        }
    }

    return (
        <>
        {
            willShow && session?.in_progress && secondsRemaining > 0 &&
            <div className={styles.quizSessionModal}>
                <b className={styles.header}>
                    Тест <span className={styles.boldColored}>{quizTitle}</span> запущен
                </b>
                <p className={styles.main}>
                    До завершения: 
                    <span className={styles.boldColored}>
                        {` ${secondsToTime(secondsRemaining)}`}
                    </span>
                </p>
                <ScButton appearance='secondary' onClick={clickHandler}>Вернуться к тесту</ScButton>
            </div>
        }
        </>
    )
});
