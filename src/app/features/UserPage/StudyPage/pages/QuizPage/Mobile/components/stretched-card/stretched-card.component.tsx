import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';
import { fillRemainingSpace } from '../../hooks/use-remaining-space.hook';
import styles from './stretched-card.module.scss';

interface Props {
    header?: JSX.Element
}

export const StretchedCard: React.FC<Props> = observer(({ children, header }) => {

    const card = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fillRemainingSpace(card.current);
    // eslint-disable-next-line
    }, [card.current]);

    return (
        <div className={styles.card} ref={card}>
            <div className={styles.header}>{header}</div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
});
