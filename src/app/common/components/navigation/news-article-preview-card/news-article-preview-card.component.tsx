import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { toNewsArticle } from '../../../services/routing-service/navigation-urls';
import { Skeleton } from '../../ui-no-interact';
import styles from './news-article-preview-card.module.scss';

interface Props {
    title: string,
    description: string,
    date: string,
    articleId: number,
    img?: string
}

export const NewsArticlePreviewCard: React.FC<Props> = observer(({title, description, date, articleId, img}) => {
    const history = useHistory();

    const clickHandler = () => {
        history.push(toNewsArticle(articleId));
    }

    if (title === undefined || articleId === undefined) {
        return (
            <Skeleton height='180px'/>
        )
    }

    return (
        <div onClick={clickHandler} className={styles.newsPreview}>
            <h3 className={styles.newsTitle}>{title}</h3>

            <div className={styles.bottom}>
                <p className={styles.newsDesc}>{description}</p>
                <p className={styles.newsDate}>{date}</p>

                <div className={styles.filter}></div>
                <div className={styles.filter2}></div>
                <img className={styles.img} src={img} alt=''></img>
            </div>
        </div>
    )
});
