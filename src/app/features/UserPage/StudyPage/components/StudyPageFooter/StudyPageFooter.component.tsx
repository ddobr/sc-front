import { observer } from 'mobx-react-lite';
import { ScButton } from '../../../../../common/components/button';
import styles from './StudyPageFooter.module.scss';


interface Props {
    onClickBack?: () => void,
    backButtonDisabled?: boolean,
    pages?: { current: string, total: string } 
    onClickForward?: () => void,
    forwardButtonDisabled?: boolean,
}

export const StudyPageFooter: React.FC<Props> = observer(({
    onClickBack, 
    onClickForward, 
    pages,
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
            {
                pages &&
                <div>
                    {pages.current}/{pages.total}
                </div>
            }
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
