import cls from 'classnames';
import { observer } from 'mobx-react-lite';
import { ReactElement, useEffect } from 'react';
import { IFeatureModalOptions } from '../../../../../../../../common/services/modal-events-service';
import modalEventsService from '../../../../../../../../common/services/modal-events-service/modal-events-service';

import styles from './feature-modal-wrapper.module.scss';


interface Props extends Omit<IFeatureModalOptions, 'modal'> {
    zIndex: number,
    children: ReactElement  
}

export const FeatureModalWrapper: React.FC<Props> = observer(({
    children,
    color,
    zIndex,
    token,
    onClose,
    onOpen,
    closeOnBlur: closeOnUnfocus
}) => {

    useEffect(() => {
        if (onOpen) {
            onOpen();
        }
    }, [onOpen])

    const modalBlurHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.currentTarget === e.target) {
            modalEventsService.bgClickHandler(token);
        }
    }

    return (
        <div
            style={{
                zIndex: zIndex,
            }}
            onClick={(e) => modalBlurHandler(e)}
            className={cls(
                styles.featureModalWrapper,
                {[styles.orangeBg]: color === 'orange'},
                {[styles.whiteBg]: color === 'white'},
                {[styles.hasPointerEvents]: closeOnUnfocus}
                )}
        >
            {children}
        </div>
    )
});
