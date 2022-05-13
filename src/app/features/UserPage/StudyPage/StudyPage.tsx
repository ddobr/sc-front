import { useEffect, useMemo } from "react";
import { Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom"
import { BaseLayout } from "../../../common/components/layouts/base-layout";
import { MinimalLink, CollapsibleNavigationGroup } from "../../../common/components/navigation/collapsible-navigation";
import { isAnyMobile } from "../../../common/services/is-mobile.service";
import { toChapter, toSectionQuiz } from "../../../common/services/routing-service/navigation-urls";
import { QuizPage } from "./pages/QuizPage";
import { UserCoursePage } from "./pages/UserCoursePage";
import { observer } from "mobx-react-lite";
import { studyState } from "../../../common/root-state";
import { user } from "../../../common/api";

export const StudyPage: React.FC = observer(() => {
    const { path } = useRouteMatch();
    const location = useLocation();
    const courseId = Number.parseInt(useParams<{courseId: string}>().courseId);
    const {sectionId} = useParams<{sectionId: string}>();
    const stateCourseInfo = studyState.course;

    
    // Запросы
    useEffect(() => {
        let cancelFn: null | (() => void) = null;

        try {
            const req = user.getCourseContent(courseId)
            cancelFn = req.cancelFn;
            req.response.then(e => { 
                studyState.setCourseInfo(e.data); 
            });
        } catch {

        }
        
        return () => {
            cancelFn && cancelFn();
        }
    }, [courseId, location]);

    const getOpenedGroupIndex = (): number => {
        if (stateCourseInfo) {
            return stateCourseInfo.sections.findIndex(e => e.id === Number.parseInt(sectionId));
        }
        
        return 0;
    }
    
    const openedGroupIndex = useMemo(getOpenedGroupIndex, [stateCourseInfo, sectionId]);

    return (
        <BaseLayout
            sideBar={
                !isAnyMobile && 
                stateCourseInfo?.sections.map((section, sectionIndex) => (
                    <CollapsibleNavigationGroup
                        key={section.id}
                        title={section.title}
                        openedByDefault={sectionIndex === openedGroupIndex}
                    >
                        { 
                            section.chapters.map((chapter) => (
                                <MinimalLink
                                    key={chapter.id}
                                    title={chapter.title}
                                    available={chapter.is_available}
                                    path={toChapter(courseId, section.id, chapter.id)}
                                />
                            )) 
                        }
                        {
                            section.quiz &&
                            <MinimalLink 
                                title={section.quiz.title}
                                path={toSectionQuiz(courseId, section.id)}
                                available={section.quiz.available}
                                special
                            />
                        }
                    </CollapsibleNavigationGroup>
                ))
            }
        >
            <Switch>
                <Route exact path={`${path}/quiz`}>
                    <QuizPage />
                </Route>
                <Route exact path={`${path}/chapter/:chapterId`}>
                    <UserCoursePage />
                </Route>
            </Switch>
        </BaseLayout>
    )
});
