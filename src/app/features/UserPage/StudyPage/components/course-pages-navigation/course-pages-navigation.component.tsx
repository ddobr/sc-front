import { Observer, observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { CoursePagesNavigationValueAccessor as CoursePagesNavigationModel } from "./course-pages-navigation.model";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { PagesButton } from "./components/pages-button/pages-button.component";
import { reaction } from "mobx";

import styles from './course-pages-navigation.module.scss';

interface Props {
    setPageIdx?: (page: number) => void,
    chapterLength: number | null,
}

export const CoursePagesNavigation: React.FC<Props> = observer(({
    setPageIdx,
    chapterLength
}) => {

    const history = useHistory();
    const location = useLocation();
    const { courseId, sectionId, chapterId } = useParams<{ courseId: string, sectionId: string, chapterId: string}>();

    // Создание модели
    const model = useMemo(() => {
        return new CoursePagesNavigationModel(history.push);
    }, [history]);

    // Подписка на изменение страницы
    useEffect(() => {
        const unsubscribe = reaction(() => model.pageIdx, (pageIdx: number | null) => {
            if (pageIdx !== null && setPageIdx) {
                setPageIdx(pageIdx);
            }
        });

        return () => {
            unsubscribe();
        }
    }, [setPageIdx, model]);

    // Прокидывание страницы из стейта
    useEffect(() => {
        if ((location.state as any)?.openedPageId !== undefined) {
            model.setPageIdx((location.state as any).openedPageId);
        }
    }, [location.state, model])

    useEffect(() => {
        if (chapterLength){
            model.setChapterLength(chapterLength);
        }
    }, [model, chapterLength]);

    useEffect(() => {
        if (courseId !== undefined && chapterId === undefined) {
            model.updateLocation(courseId, sectionId);
        } 

        if (courseId !== undefined && chapterId !== undefined) {
            model.updateLocation(courseId, sectionId, chapterId);
        }
    }, [model, courseId, sectionId, chapterId]);

    if (model.isLoading) {
        return null;
    }

    return (
    <section className={styles.courseNavigationButtons}>
        <Observer>
        {
            () => 
            <PagesButton type='back' onClick={() => model.backButtonClickHandler()} disabled={model.backBtnDisabled}/>
        }
        </Observer>
        <Observer>
        {
            () => 
            model.pages && <div>{model.pages.now} / {model.pages.total}</div>
        }
        </Observer>
        <Observer>
        {
            () => 
            <PagesButton type='forward' onClick={() => model.forwardBtnClickHandler()} disabled={model.forwardBtnDisabled}/>
        }
        </Observer>
    </section>)
})