import React, { useEffect, useRef, useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ChapterCardModel, SectionCardModel } from './SectionCardModel';

import sectionImage from '../../../../assets/img/courseAvatar.png';
import styles from './SectionCardComponent.module.scss';
import { declOfNum } from '../../../common/methods/declOfNum';
import { IShortQuiz } from '../../../common/models';
import { toChapter, toSectionQuiz } from '../../../common/services/routing-service/navigation-urls';
import { observer } from 'mobx-react-lite';


export const SectionCardComponent: React.FC<SectionCardModel> = observer(({
    openedByDefault,
    chapters,
    sectionTitle,
    completedChapters,
    quiz,
    id,
    courseId
}) => {
    const [opened, setOpened] = useState(openedByDefault);
    const contentHeight = useRef<number|undefined>(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const content = chapters.map((chapter, i) => <ChapterCardComponent {...chapter} key={i}/>);

    // Получение высоты контента открывающегося списка.
    useEffect(() => {
        contentHeight.current = contentRef.current?.clientHeight;
    }, []);

    // Открытие/закрытие элемента списка.
    useEffect(() => {
        const elem =  contentRef.current;
        if (elem) {
            elem.style.height = opened ? `${contentHeight.current}px` : '0';
        }
    }, [opened]);

    return (
        <div className={styles.sectionCard}>
            <div className={styles.cardHeader} onClick={() => setOpened(!opened)}>
                <div className={styles.leftSide}>
                    <img className={styles.sectionImage} alt={'Section'} src={sectionImage}/>
                    <h3 className={styles.sectionTitle}>{sectionTitle}</h3>
                </div>

                <div className={styles.rightSide}>
                    <p className={styles.progress}>{completedChapters}/{chapters.length}</p>
                    <ArrowBackIosIcon
                        className={styles.button}
                        style={{
                            'transform': opened ? 'rotate(90deg)' : 'rotate(270deg)',
                            marginTop: opened ? '8px' : '-5px',
                        }} 
                    />
                </div>
            </div>

            <div ref={contentRef} className={styles.contentWrapper}>
                { content }
                {
                    quiz && 
                    <SectionQuizComponent 
                        courseId={courseId}
                        available={quiz.available} 
                        id={quiz.id} 
                        title={quiz.title} 
                        percentage={quiz.percentage} 
                        sectionId={id}
                    />
                }
                
            </div>
        </div>
    )
});



const ChapterCardComponent: React.FC<ChapterCardModel>  = observer(({
    disabled, chapterId, chapterTitle, progressPercentage, pagesCount, questionsCount, courseId, sectionId,
}) => {
    const articleDecls = ['статья', 'статьи', 'статей'];

    const url = disabled ? `` : toChapter(courseId, sectionId, chapterId);

    return (
        <a href={url} style={{opacity: disabled ? 0.7 : 1, cursor: disabled ? 'default' : 'pointer'}} className={styles.chapterCard}>
            <div className={styles.chapterHeader}>
                <h4 className={styles.chapterTitle}>{chapterTitle}</h4>
                <p className={styles.percentage}>{progressPercentage}%</p>
            </div>

            <div className={styles.chapterFooter}>
                <p>
                    {pagesCount || 0} {declOfNum(pagesCount || 0, articleDecls)}
                </p>

            </div>

        </a>
    )
});

interface SectionQuizProps extends IShortQuiz {
    sectionId: number,
    courseId: number
}

const SectionQuizComponent: React.FC<SectionQuizProps> = observer(({title, percentage, sectionId, courseId, available}) => {
    const url = available ? toSectionQuiz(courseId, sectionId) : '';

    return (
        <a className={styles.sectionQuizCard} href={url} style={{opacity: available ? '' : '0.7'}}>
            <h4 className={styles.quizTitle}>{title}</h4>
            <p className={styles.percentage}>{percentage}/100</p>
        </a>
    )
});
