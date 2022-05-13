import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { isAnyMobile } from '../../../services/is-mobile.service';
import styles from './Loading.module.scss';

export const AppLoading: React.FC = observer(() => {
    const Logo: React.FC = () => (
        <div className={styles.logo}>
            <div className={styles.image}>
            </div>
        </div>
    );
    
    return (
        <div className={styles.loadingWrapper}>
            <Logo />
            { !isAnyMobile && <CircularProgress className={styles.loading} />}
        </div>
    )
});

export const AppSpinner: React.FC = observer(() => {
    
    return (
        <div className={styles.loadingWrapper}>
            <CircularProgress className={styles.loading} />
        </div>
    )
});
