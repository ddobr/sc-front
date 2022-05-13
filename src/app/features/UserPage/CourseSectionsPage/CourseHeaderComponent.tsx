import { observer } from 'mobx-react-lite';
import { PageHeading } from '../../../common/components/layouts/page-heading';

import styles from './CourseHeaderComponent.module.scss';

interface Props {
    title: string,
    onClickBack: () => void,
    description: string,
    passedPercentage: number
}

export const CourseHeaderComponent: React.FC<Props> = observer(({title, onClickBack, description, passedPercentage}) => {


    return (
        <>
            <PageHeading title={title} goBackLink description={description} sideButtons={
                [
                    <div className={styles.userInfoSide}>
                        <div className={styles.progressBar}>
                            <div style={{width: `calc(${passedPercentage}% + 5px)`}} className={styles.progress}></div>
                        </div>
                        <div className={styles.percentage}>{passedPercentage}%</div>
                    </div>
                ]
            }/>
            
        </>
    )
});
