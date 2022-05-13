import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { ReactComponent as GoBackIcon } from '../../../../../assets/img/goBackArrow.svg';
import { Skeleton } from '../../ui-no-interact';

import styles from './page-heading.module.scss';

interface Props {
    goBackLink?: boolean,
    title: string|undefined,
    description?: string,
    sideButtons?: JSX.Element[],
}

export const PageHeading: React.FC<Props> = observer(({goBackLink, title, description, sideButtons}) => {
    const history = useHistory();

    const onClickBack = () => {
        history.goBack();
    }

    return (
        
        <div className={styles.pageHeadingContainer}>
            {
                (goBackLink && title !== undefined) &&
                <GoBackIcon 
                    onClick={onClickBack} 
                    className={styles.goBackIcon}
                />
            }

            {
                title !== undefined 
                ?   <div className={styles.pageHeading}>
                        <h1 className={styles.pageHeadingText}>{title}</h1>

                        {
                            sideButtons !== undefined && 
                            <div className={styles.sideButtons}>
                                {sideButtons}
                            </div>
                        }
                    </div>

                :   <Skeleton className={styles.skeleton}/>
            }
            
            
            { description !== undefined && <p className={styles.description}>{description}</p> }
        </div>
    )
});
