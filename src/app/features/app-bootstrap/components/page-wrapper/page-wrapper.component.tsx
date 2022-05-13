import { useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import { ModalEventType } from '../../../../common/services/modal-events-service/enums/modal-event.enum';
import { observer } from 'mobx-react-lite';

import styles from './page-wrapper.module.scss';


export const PageWrapper: React.FC = observer(({children}) => {
    const [locked, setLocked] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const lockedScrollPosition = useRef(0);

    useEffect(() => {
        const pageLockHandler = () => {
            if (wrapperRef.current) {
                lockedScrollPosition.current = window.scrollY;
                wrapperRef.current.style.top = `-${window.scrollY}px`;
                wrapperRef.current.style.position = 'fixed';
            }
            setLocked(true);
        }

        const pageUnlockHandler = () => {
            if (wrapperRef.current) {
                wrapperRef.current.style.position = '';
                wrapperRef.current.style.top = ``;
                window.scrollTo(0, lockedScrollPosition.current)
            }
            setLocked(false);
        }

        window.addEventListener(ModalEventType.LockPage, pageLockHandler);
        window.addEventListener(ModalEventType.UnlockPage, pageUnlockHandler);

        return () => {
            window.removeEventListener(ModalEventType.LockPage, pageLockHandler);
            window.removeEventListener(ModalEventType.UnlockPage, pageUnlockHandler);
        };
    }, []);

    return (
        <div 
            ref={wrapperRef}
            className={cls(styles.pageWrapper, {[styles.locked]: locked})} 
            id={'pageWrapper'}
        >
            {children}
        </div>
    )
});
