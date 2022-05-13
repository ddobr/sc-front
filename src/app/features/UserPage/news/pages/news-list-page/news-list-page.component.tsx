import { useEffect, useState } from 'react';
import { user } from '../../../../../common/api';
import { MobileMenu } from '../../../../../common/components/layouts/mobile-menu/mobile-menu.component';
import { NewsArticlePreviewCard } from '../../../../../common/components/navigation/news-article-preview-card';
import { PageHeading } from '../../../../../common/components/layouts/page-heading';
import { SortingButtons } from '../../../../../common/components/navigation/sorting-buttons/sorting-buttons.component';
import { Skeleton } from '../../../../../common/components/ui-no-interact';
import { IShortNewsArticle } from '../../../../../common/models';
import { isAnyMobile } from '../../../../../common/services/is-mobile.service';
import { NewsArticleLink } from './components/news-article-link/news-article-link.component';
import { observer } from 'mobx-react-lite';

import styles from './news-list-page.module.scss';


export const NewsListPage: React.FC = observer(() => {
    const [newerFirst, setNewerFirst] = useState(true);
    const [news, setNews] = useState<IShortNewsArticle[]>([]);

    useEffect(() => {
        setNews([]);
        const newsSub = user.getNewsList({ newer_first: newerFirst });

        try {         
            newsSub.response
                .then(res => {
                    setNews(res.data)
                });
        } catch {

        }

        return () => { newsSub.cancelFn(); };
    }, [newerFirst]);

    const changeSortTypeHandler = (type: string, ascending: boolean) => {
        setNewerFirst(ascending);
    }


    return (
        <>
        <PageHeading 
            title='Новости' 
            goBackLink
            sideButtons={[<SortingButtons key='sorting' onChangeSortType={changeSortTypeHandler} sortTypes={['новизне']} />]}
        />

        <NewsArticlePreviewCard {...news[0]} articleId={news[0]?.id}/>

        {
            news.length > 0 &&
            news.map(e => <NewsArticleLink key={e.id} title={e.title} id={e.id} date={e.date} />)
        }

        {
            news.length === 0 &&
            <>
            <Skeleton className={styles.skeleton}/>
            <Skeleton className={styles.skeleton}/>
            <Skeleton className={styles.skeleton}/>
            </>
        }
        
        {
            isAnyMobile &&
            <MobileMenu />
        }
        </>
    )
});
