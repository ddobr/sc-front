import { observer } from 'mobx-react-lite';
import styles from './divider.module.scss';

export const Divider: React.FC = observer(() => {
    return(
        <hr className={styles.hr}/>
    )
});
