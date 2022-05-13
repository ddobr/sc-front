import { IStudyCourse, IShortStudyChapter } from "../../../common/models";
import { SectionCardModel, ChapterCardModel, SectionQuizCardModel } from "./SectionCardModel";


export class CourseSectionsUtils {
    /**
     * Функция, возвращающая массив объектов, необходимых для формирования компонента SectionCardComponent
     * 
     * @param course - курс
     * @param bookmark - закладка
     * @returns Массив объектов, необходимых для формирования компонента SectionCardComponent
     */
    public static pipeSectionCards(course: IStudyCourse): SectionCardModel[] {
        const sectionCards: SectionCardModel[] = [];


        course.sections.forEach((section) => {
            const courseId = course.id;

            const sectionTitle = section.title;
            const chapters: ChapterCardModel[] = [];
            const id = section.id;
            let completedChapters = 0;
            
            let openedByDefault = false;
            
            section.chapters.forEach((chapter) => {
                const chapterTitle = chapter.title;
                openedByDefault = true;
                const disabled = !chapter.is_available;
                completedChapters += disabled ? 0 : 1;
                const pagesCount = chapter.pages_number;
                const questionsCount = chapter.questionsAmount;
                const progressPercentage = chapter.percentage;
                const chapterId = chapter.id;
                const sectionId = section.id;
                
                chapters.push({sectionId, courseId, chapterId, chapterTitle, disabled, pagesCount, questionsCount, progressPercentage});
            });
            
            let quiz: SectionQuizCardModel | undefined = undefined;

            if (section.quiz) {
                quiz = {...section.quiz, disabled: true};
                quiz.disabled = !section.quiz.available

            }

            sectionCards.push({courseId, completedChapters, sectionTitle, chapters, openedByDefault, quiz, id})
        })

        return sectionCards;
    }

    /**
     * Функция, принимающая курс и возвраащающая массив всех глав в нем в правильном порядке
     * @param course - курс
     * @returns Массив глав в правильном порядке, содержащихся в переданном курсе
     */

    public static flatChaptersList(course: IStudyCourse | null): IShortStudyChapter[] {
        const chapters: IShortStudyChapter[] = [];

        if (course === null) {
            return chapters;
        }

        for (let section of course.sections) {
            for (let chapter of section.chapters) {
                chapters.push(chapter);
            }
        }

        return chapters;
    }

}