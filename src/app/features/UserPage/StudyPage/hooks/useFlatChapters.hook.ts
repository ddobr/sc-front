import { useEffect, useRef } from "react";
import { IStudyCourse } from "../../../../common/models";
import { toChapter, toSectionQuiz } from "../../../../common/services/routing-service/navigation-urls";
import { ICourseItem } from "../interfaces/course-item.interface";


export function useFlatChapters(
    course: IStudyCourse | null, 
    itemId: number | undefined, 
    itemType: 'chapter' | 'quiz'
    ): [React.MutableRefObject<ICourseItem | null>, () => void, () => void] {
    
    const item = useRef<ICourseItem | null>(null);

    useEffect(() => {
        if (course?.id === null || course?.id === undefined) {
            return;
        } 

        let prevItem: ICourseItem | null = null;
        for (let sectionIdx = 0; sectionIdx < course.sections.length; sectionIdx++) {
            const section = course.sections[sectionIdx];

            for (let chapterIdx = 0; chapterIdx < section.chapters.length; chapterIdx++) {
                const chapter = section.chapters[chapterIdx];

                prevItem = createItem(
                    'chapter', 
                    chapter.id, 
                    toChapter(course.id, section.id, chapter.id),
                    prevItem
                );
            }

            if (section.quiz) {
                prevItem = createItem(
                    'quiz', 
                    section.id, 
                    toSectionQuiz(course.id, section.id),
                    prevItem
                );
            }
        }

        while (prevItem !== null && prevItem !== undefined) {
            if (prevItem.type === itemType && prevItem.id === itemId) {
                item.current = prevItem;
                break;
            } else {
                prevItem = prevItem.prevItem;
            }
        }
    // eslint-disable-next-line
    }, [course?.id, itemId, itemType]);

    const setPrevious = (): void => {
        item.current = item.current?.prevItem ? item.current.prevItem : null;
    }

    const setNext = (): void => {
        item.current = item.current?.nextItem ? item.current.nextItem : null;
    }

    return [item, setPrevious, setNext];
}

function createItem(type: 'chapter' | 'quiz', id: number, url: string, prevItem: ICourseItem | null) {
    const item: ICourseItem = {
        type: type,
        id: id,
        url: url,
        prevItem: prevItem,
        nextItem: null
    }

    if (prevItem !== null) {
        prevItem.nextItem = item;
    }

    return item;
}