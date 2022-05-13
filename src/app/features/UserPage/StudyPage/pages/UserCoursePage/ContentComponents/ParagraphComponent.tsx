import { observer } from 'mobx-react-lite';
import styles from './ParagraphComponent.module.scss';

interface Props {
    text: string
}

export const ParagraphContent: React.FC<Props> = observer(({text}) => {
    return (
        <div
            className={styles.paragraph}
        >
            <p>{text}</p>
        </div>
    )
});
