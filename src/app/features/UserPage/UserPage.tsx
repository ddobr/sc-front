import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { sessionsState } from '../../common/root-state';
import { sessionsService } from '../../common/services';
import modalEventsService from '../../common/services/modal-events-service/modal-events-service';
import { index } from '../../common/services/routing-service/navigation-urls';
import { CourseSectionsPage } from './CourseSectionsPage';
import { StudyPage } from './StudyPage';
import { TestPage } from './TestPage/TestPage.component';

const UserHomePage = React.lazy(() => import('./UserHomePage/UserHomePage'));
const NewsPage = React.lazy(() => import('./news/news-page.component'));
const RecipesPage = React.lazy(() => import('./recipes-module/recipes-module.component'))

export const UserPage: React.FC = observer(() => {
    const location = useLocation();
    const session = sessionsState.quizSession;

    useEffect(() => {
        document.title = 'Главная'
    }, [])

    /** Получение сессии квиза на каждой новой странице */
    useEffect(() => {
        sessionsService.getQuizSession();
    }, [location]);

    /** Добавление модалки с сессией квиза */
    useEffect(() => {
        if (session?.in_progress) {
            modalEventsService.showQuizSessionModal();
        }
    }, [session?.in_progress]);

    return (
        <Switch>
            <Route
                path={'/test'}
                component={TestPage}
            />
            <Route
                exact
                path={index()}
                component={UserHomePage}
            />
            <Route
                exact
                path={'/course/:courseId'}
                component={CourseSectionsPage}
            />
            <Route
                exact
                path={'/courses'}
            >
                тут будут курсы
            </Route>
            <Route
                path={'/course/:courseId/section/:sectionId'}
                component={StudyPage}
            />
            <Route
                path={'/news'}
                component={NewsPage}
            />
            <Route
                path={'/recipes'}
                component={RecipesPage} 
            />


            {/* Редиректы */}
            <Redirect 
                exact
                path={'/course/'}
                to={index()}
            />
            <Redirect 
                exact
                path={'/section/'}
                to={index()}
            />
            <Redirect 
                exact
                path={'/quiz/'}
                to={index()}
            />
            <Route>
                <h1>404 NOT FOUND</h1>
            </Route>
        </Switch>
    )
});
