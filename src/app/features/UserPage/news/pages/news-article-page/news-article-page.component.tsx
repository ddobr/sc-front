import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { user } from '../../../../../common/api';
import { MobileMenu } from '../../../../../common/components/layouts/mobile-menu/mobile-menu.component';
import { PageHeading } from '../../../../../common/components/layouts/page-heading';
import { IFullNewsArticle } from '../../../../../common/models';
import { isAnyMobile } from '../../../../../common/services/is-mobile.service';
import { PageContent } from '../../../StudyPage/pages/UserCoursePage/components/PageContent';

import styles from './news-article-page.module.scss';


export const NewsArticlePage: React.FC = observer(() => {
    const newsId = Number.parseInt(useParams<{newsId: string}>().newsId);
    const [content, setContent] = useState<IFullNewsArticle | null>(null);

    useEffect(() => {
        const articleSub = user.getNewsArticle(newsId);

        try {
            articleSub.response
                .then((articleResp) => setContent(articleResp.data!));
        } catch { }
        
        return () => { 
            articleSub.cancelFn() 
        };
    }, [newsId]);


    return (
        <>
        <PageHeading 
            title={content ? content.title : undefined}
            goBackLink
            sideButtons={ content ? [<b className={styles.date}>{content.date}</b>] : undefined}
        />
        <PageContent 
            content={content ? content.content : []}
        />
        {
            isAnyMobile &&
            <MobileMenu />
        }
        </>
    )
});
