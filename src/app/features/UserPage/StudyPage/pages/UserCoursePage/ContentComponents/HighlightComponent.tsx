import { observer } from 'mobx-react-lite';
import styles from './HighlightComponent.module.scss';

interface Props {
    text: string
}

export const HighlightComponent: React.FC<Props> = observer(({text}) => {
    return (
        <div className={styles.highlightComponent}>{text}</div>
    )
});
