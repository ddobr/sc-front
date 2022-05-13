import cls from 'classnames';
import { ReactComponent as FinishSvg } from '../../../../../../../../../../../assets/img/finish.svg';
import { LegacyRef } from 'react';

import styles from './EndQuizLink.module.scss';
import { observer } from 'mobx-react-lite';


interface Props {
    onClickId?: (id: number) => void,
    onClickIdx?: (idx: number) => void,
    idx: number,
    current?: boolean,
    reff?: LegacyRef<HTMLDivElement>
}

export const EndQuizLink: React.FC<Props> = observer(({
    current,
    idx,
    onClickId,
    onClickIdx,
    reff
}) => {
    
    const clickHandler = () => {
        if (onClickIdx !== undefined) {
            onClickIdx(idx);
        }
    }

    const classNames = cls(
        styles.block,
        {[styles.current]: current},
    );

    return (
        <div
            className={classNames}
            onClick={clickHandler}
            ref={reff}
        >
            <FinishSvg />
        </div>
    )
});
