import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { index } from '../../../common/services/routing-service/navigation-urls';

import { CourseHeaderComponent } from './CourseHeaderComponent';
import { BaseLayout } from '../../../common/components/layouts/base-layout';
import { AppLoading } from '../../../common/components/ui-no-interact/AppLoading';
import { SectionCardComponent } from './SectionCardComponent';
import { CourseSectionsUtils as utils } from './PageUtils';

// eslint-disable-next-line
import styles from './CourseSectionsPage.module.scss';
import { IStudyCourse } from '../../../common/models';
import { isAnyMobile } from '../../../common/services/is-mobile.service';
import { MobileMenu } from '../../../common/components/layouts/mobile-menu/mobile-menu.component';
import { observer } from 'mobx-react-lite';
import { studyState } from '../../../common/root-state';


export const CourseSectionsPage: React.FC = observer(() => {
    const courseId = Number(useParams<{courseId: string}>().courseId);
    const selectedCourseInfo = studyState.course;
    const history = useHistory();

    // Запросы
    useEffect(() => {

        try {
            studyState.fetchCourse(courseId)
        } catch { }
        
    }, [courseId]);

    const isLoaded = () => {
        return selectedCourseInfo !== null;
    }

    if (!isLoaded())
        return <AppLoading />;


    const sectionCards = selectedCourseInfo !== undefined 
        ? utils.pipeSectionCards((selectedCourseInfo as IStudyCourse)).map((sectionCardInfo, i) => (
            <SectionCardComponent {...sectionCardInfo} key={i} /> 
        ))
        : 'Курс недоступен. Пройдите предыдущие курсы и возвращайтесь :)';

    return (
        <BaseLayout>
            <CourseHeaderComponent 
                title={(selectedCourseInfo as IStudyCourse ).title}
                onClickBack={() => {history.push(index())}}
                description={(selectedCourseInfo as IStudyCourse ).description} 
                passedPercentage={(selectedCourseInfo as IStudyCourse ).percentage}
            />
            { sectionCards }
            {
                isAnyMobile &&
                <MobileMenu />
            }
        </BaseLayout>
    )
});
