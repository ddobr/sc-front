import { observer } from "mobx-react-lite";
import { ReactNode } from "react";
import backgroundImage from '../../../../../../../../assets/img/quick-action-bg.png';

import styles from './base-action.module.scss';


interface Props {
    onClick: () => void,
    icon: JSX.Element | ReactNode
}

export const BaseAction: React.FC<Props> = observer(({
    onClick,
    icon
}) => {
    return (
        <div className={styles.baseAction}>
            <div className={styles.button} onClick={onClick}>
                {icon}
            </div>
            <div className={styles.background2}>
            </div>
            <div className={styles.background}>
            </div>
            <img src={backgroundImage} className={styles.backgroundImage} alt=''></img>
        </div>
    )
})