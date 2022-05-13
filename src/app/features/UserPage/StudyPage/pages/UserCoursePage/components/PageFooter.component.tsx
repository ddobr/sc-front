import { observer } from 'mobx-react-lite';
import { ScButton } from '../../../../../../common/components/button';
import styles from './PageFooter.module.scss';

interface Props {
    onClickBack?: () => void,
    backButtonDisabled?: boolean,
    onClickForward?: () => void,
    forwardButtonDisabled?: boolean,
    currentPage: number,
    totalPages: number,
}

export const PageFooter: React.FC<Props> = observer(({
    onClickBack, 
    onClickForward, 
    currentPage, 
    totalPages,
    backButtonDisabled = false,
    forwardButtonDisabled = false
}) => {
    return (
        <nav
            className={styles.pageFooter}
        >
            <ScButton
                appearance={'secondary'}
                onClick={onClickBack}
                disabled={backButtonDisabled}
                className={styles.button}
            >
                Назад
            </ScButton>
            <div>
                {currentPage}/{totalPages}
            </div>
            <ScButton
                appearance={'secondary'}
                onClick={onClickForward}
                disabled={forwardButtonDisabled}
                className={styles.button}
            >
                Вперед
            </ScButton>
        </nav>
    )
});
