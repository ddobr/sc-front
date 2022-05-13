import React, { useEffect } from 'react';
import { Header } from '../header';
import styles from './base-layout.module.scss';

import { useLocation } from 'react-router';
import { observer } from 'mobx-react-lite';

interface Props {
    sideBar?: any,
}


export const BaseLayout: React.FC<Props> = observer(({sideBar, children}) => {
    let location = useLocation();
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [location]);


    return(
        <>
            <Header />
            <div className={styles.layout}>
                <aside className={styles.aside}>
                    <div className={styles.asideContent}>
                        {sideBar}
                    </div>
                </aside>
                <main className={styles.main} id={'main'}>
                    {children}
                </main>
            </div>
        </>
    )
});
