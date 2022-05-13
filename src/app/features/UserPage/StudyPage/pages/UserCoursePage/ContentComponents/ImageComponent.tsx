import { observer } from 'mobx-react-lite';
import styles from './ImageComponent.module.scss';

interface Props {
    url: string,
}

export const ImageComponent: React.FC<Props> = observer(({url}) => {
    return (
        <div className={styles.imageComponent}>
            <img src={url} alt=''/>
        </div>
    )
});
