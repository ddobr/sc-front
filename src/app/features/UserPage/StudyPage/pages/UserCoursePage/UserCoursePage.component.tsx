import { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { user } from '../../../../../common/api';
import { MobileMenu } from '../../../../../common/components/layouts/mobile-menu/mobile-menu.component';
import { PageHeading } from '../../../../../common/components/layouts/page-heading';
import { IStudyChapter } from '../../../../../common/models';
import { isAnyMobile } from '../../../../../common/services/is-mobile.service';
import { index } from '../../../../../common/services/routing-service/navigation-urls';
import { PageContent } from './components/PageContent';
import { observer } from 'mobx-react-lite';
import { meState, studyState } from '../../../../../common/root-state';
import { CoursePagesNavigation } from '../../../../../common/components/navigation';


export const UserCoursePage: React.FC = observer(() => {
    const chapterId = Number(useParams<{chapterId: string}>().chapterId);
    const sectionId = Number(useParams<{sectionId: string}>().sectionId);
    const courseId = Number(useParams<{courseId: string}>().courseId);
    const location = useLocation();
    const [chapterContent, setContent] = useState<IStudyChapter|null>(null);
    const [openedPage, setOpenedPage] = useState(-1);
    const history = useHistory();
    const course = studyState.course;

    // Перенаправление с недоступного материала
    useEffect(() => {
        if (course) {
            const section = course.sections.find(e => e.id === sectionId);
            if (section) {
                if (section.is_available === false) {
                    history.push(index());
                }
    
                const chapter = section.chapters.find(e => e.id === chapterId)
                if (chapter?.is_available === false) {
                    history.push(index());
                }
            }
        }
    }, [chapterId, courseId, history, course, sectionId]);

    // Запрос на получение контента главы
    useEffect(() => {
        setContent(null);
        const chapterSub = user.getChapterContent(chapterId);

        try {
            chapterSub.response
                .then(chapterRes => { 
                    setContent(chapterRes.data);
                    document.title = chapterRes.data.title;
                    
                    // Открытие нужной страницы
                    if ((location.state as any)?.openedPageId) {
                        const pageIndex = chapterRes.data.pages.findIndex(page => {
                            return page.id === (location.state as any).openedPageId
                        });
                        setOpenedPage(pageIndex !== -1 ? pageIndex : 0);
                    } else if (chapterRes.data) {
                        setOpenedPage(0);
                    }
                });
        } catch { }
        
        return () => { chapterSub.cancelFn(); };
    }, [ chapterId, courseId, sectionId, location.state]);

    useEffect(() => {
        window.scrollTo({top: 0});

        if (unsubscribeReadPage.current) {
            unsubscribeReadPage.current();
            unsubscribeReadPage.current = null;
        }
    }, [openedPage])

    // Запросы на прочтение страницы и получение обновленных данных о пользователе и курсе
    const unsubscribeReadPage = useRef<null | ((message?: string | undefined) => void)>(null);
    useEffect(() => {
        if (openedPage !== -1 
            && chapterContent?.pages[openedPage]?.id !== undefined 
            && courseId !== undefined
        ) {
            try {
                const readSub = user.readPage(chapterContent.pages[openedPage].id);
                unsubscribeReadPage.current = readSub.cancelFn;

                readSub.response
                    .catch((e) => {})
                    .then(() => {
                        meState.fetchProfile();
                    })
                    .then(() => user.getCourseContent(courseId).response)
                    .then((courseResp) => {
                        studyState.setCourseInfo(courseResp.data);
                    });

                return readSub.cancelFn;
            } catch { }
        }

        return () => {
            unsubscribeReadPage.current && unsubscribeReadPage.current();
        }

    }, [chapterContent?.id, courseId, openedPage, chapterContent?.pages]);

    
    return (
        <>
            <PageHeading 
                title={chapterContent ? chapterContent.pages[openedPage]?.title : undefined}
                goBackLink
            />

            <PageContent 
                content={
                    chapterContent?.pages[openedPage] 
                        ? chapterContent.pages[openedPage].content 
                        : []
                } 
            />

            <CoursePagesNavigation setPageIdx={setOpenedPage} chapterLength={chapterContent !== null ? chapterContent.pages.length : null} />

            {
                isAnyMobile &&
                <MobileMenu />
            }
        </>
    )
});
