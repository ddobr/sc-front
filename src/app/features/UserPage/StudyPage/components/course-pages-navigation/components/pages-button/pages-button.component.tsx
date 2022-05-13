import { observer } from "mobx-react-lite";
import { isAnyMobile } from "../../../../../../../common/services/is-mobile.service";
import { ScButton } from "../../../../../../../common/components/button";
import cls from 'classnames'
import {  ReactComponent as NextPageIcon } from '../../../../../../../../assets/img/next-page-mobile.svg'

import styles from './pages-button.module.scss';

interface Props {
    type: 'back' | 'forward',
    onClick: () => void,
    disabled: boolean
}

export const PagesButton: React.FC<Props> = observer(({
    type,
    onClick,
    disabled
}) => {
    return (
    <ScButton 
        disabled={disabled} 
        onClick={onClick} 
        appearance='secondary'
        className={cls(styles.pagesBtn, {[styles.mobile]: isAnyMobile})}
    >
        {
            type === 'back' && isAnyMobile && <NextPageIcon className={styles.mobileBack} />
        }
        {
            type === 'back' && !isAnyMobile && 'Назад'
        }
        {
            type === 'forward' && isAnyMobile && <NextPageIcon className={styles.mobileNext} />
        }
        {
            type === 'forward' && !isAnyMobile && 'Вперед'
        }
    </ScButton>);
})