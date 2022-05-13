import { observer } from 'mobx-react-lite';
import { isAnyMobile } from '../../../../../common/services/is-mobile.service';
import styles from './home-page-section.module.scss';


interface Props {
    title: string | undefined,
    side: JSX.Element | undefined
}

export const HomePageSection: React.FC<Props> = observer(({
    title,
    side,
    children
}) => {

    if (isAnyMobile) {
        return <section className={styles.homePageSection}>
            <div className={styles.headerMobile}>
                <h2 className={styles.title}>{title}</h2>
            </div>
            { children }
            <div className={styles.downMobile}>
                { side }
            </div>
        </section>
    }

    return (
        <section className={styles.homePageSection}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.side}>
                    { side }
                </div>
            </div>
            { children }
        </section>
    )
});
