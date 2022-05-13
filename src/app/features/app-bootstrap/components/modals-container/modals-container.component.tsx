import { observer } from 'mobx-react-lite';
import { FeatureModalsContainer } from './components/feature-modals-container/feature-modals-container.component';

import styles from './modals-container.module.scss';


export const ModalsContainer: React.FC = observer(() => {
    return (
        <div className={styles.modalsContainer} id={'modalsContainer'}>
            <FeatureModalsContainer />
        </div>
    );
});
