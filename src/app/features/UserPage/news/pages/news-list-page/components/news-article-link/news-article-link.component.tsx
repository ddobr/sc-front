import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { toNewsArticle } from '../../../../../../../common/services/routing-service/navigation-urls';

import styles from './news-article-link.module.scss';


interface Props {
    title: string,
    date: string,
    id: number
}

export const NewsArticleLink: React.FC<Props> = observer(({
    title,
    date,
    id
}) => {
    const history = useHistory();

    const clickHandler = () => {
        history.push(toNewsArticle(id));
    }

    return (
        <div className={styles.newsArticle} onClick={clickHandler}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.date}>{date}</div>
        </div>
    )
});
