import React, { useEffect, useState } from 'react';
import { user } from '../../../common/api';
import { BaseLayout } from '../../../common/components/layouts/base-layout';
import { MobileMenu } from '../../../common/components/layouts/mobile-menu/mobile-menu.component';
import { NewsArticlePreviewCard } from '../../../common/components/navigation/news-article-preview-card/news-article-preview-card.component';
import { IShortNewsArticle } from '../../../common/models';
import { isAnyMobile } from '../../../common/services/is-mobile.service';
import { CourseListComponent } from './components/course-list/CourseListComponent';
import { UserNameComponent } from './components/user-name/UserNameComponent';
import { HomePageSection } from './components/home-page-section/home-page-section.component';
import { ScButton } from '../../../common/components/button';
import { useHistory } from 'react-router-dom';
import { toNews } from '../../../common/services/routing-service/navigation-urls';
import { Observer, observer } from 'mobx-react-lite';
import { meState, studyState } from '../../../common/root-state';
import { ActionCards } from './components/action-cards/action-cards.component';


const profile = meState.profile;

const UserHomePage: React.FC = observer(() => {
    const [news, setNews] = useState<IShortNewsArticle[]>([]);
    const history = useHistory();

    // Запросы
    useEffect(() => {
        const newsSub = user.getNewsList({ newer_first: true, limit: 1 });

        try {
            studyState.fetchAllCourses();
            newsSub.response
                .then(res => {
                    setNews(res.data)
                });
        } catch {

        }

        return () => { newsSub.cancelFn(); };
    }, []);

    const onShowAllNewsClick = () => {
        history.push(toNews());
    }
  
    return (
        <BaseLayout>
            <Observer>
            {() =>
                <UserNameComponent name={profile?.first_name} surname={profile?.last_name} role={profile?.role}/>
            }
            </Observer>
            <ActionCards />

            <HomePageSection 
                title='Новости'
                side={
                    news[0] 
                    ? <ScButton 
                        onClick={onShowAllNewsClick} 
                        appearance={ isAnyMobile ? 'secondary' : 'transparent'}
                        >Показать все</ScButton> 
                    : undefined
                }
            >
                <NewsArticlePreviewCard {...news[0]} articleId={news[0]?.id}/>
            </HomePageSection>

            {
                <CourseListComponent />
            }

            {
                isAnyMobile &&
                <MobileMenu />
            }
        </BaseLayout>
    )
});

export default UserHomePage;
