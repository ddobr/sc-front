import cls from 'classnames';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import courseImage from '../../../../../assets/img/courseAvatar.png';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import styles from './link-card.module.scss';


interface Props extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'title'> {
    title: string,
    sideText?: string | JSX.Element[] | JSX.Element,
    imageUri?: string,
    linkPath?: string,
    available?: boolean,
}

export const LinkCard: React.FC<Props> = observer(({ title, imageUri, className, available = true, sideText, linkPath, ...props }) => {
    const history = useHistory();
    imageUri = (imageUri === undefined) ? courseImage : imageUri;
    const linkCardClassName = cls(styles.linkCard, { [styles.disabled]: !available, [styles.active]: available }, className);


    const linkHandler = () => {
        if (linkPath && available) {
            history.push(linkPath);
        }
    }

    return (
        <div onClick={linkHandler} className={linkCardClassName} {...props}>
            <img className={styles.image} alt={title} src={imageUri} />
            <h3 className={styles.title}>{title}</h3>

            {sideText && <div className={styles.sideText}>{sideText}</div>}

            <ArrowBackIosIcon
                className={styles.arrow}
                style={{ 'fontSize': '1rem', 'transform': 'rotate(180deg)' }}
            />
        </div>
    )
});
