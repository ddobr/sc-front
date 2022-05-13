import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { IFeatureModalOptions, ModalEventType } from '../../../../../../common/services/modal-events-service';
import { FeatureModalWrapper } from './components/feature-modal-wrapper/feature-modal-wrapper.component';

import styles from './feature-modals-container.module.scss';


export const FeatureModalsContainer: React.FC = observer(() => {
    const [modals, setModals] = useState<IFeatureModalOptions[]>([]);

    useEffect(() => {
        const showFeatureModalHandler = (e: CustomEvent<IFeatureModalOptions>) => {
            const modalOptions: IFeatureModalOptions = e.detail;
            setModals((oldModals) => [...oldModals, modalOptions]);
        }

        window.addEventListener(ModalEventType.ShowFeatureModal, showFeatureModalHandler);

        const closeFeatureModalHandler = (e: CustomEvent<string>) => {
            const callerGui: string = e.detail;
            const newModalOptions = modals.filter(m => m.token !== callerGui);
            setModals(newModalOptions);
        }

        window.addEventListener(ModalEventType.CloseFeatureModal, closeFeatureModalHandler);

        return () => {
            window.removeEventListener(ModalEventType.ShowFeatureModal, showFeatureModalHandler);
            window.removeEventListener(ModalEventType.CloseFeatureModal, closeFeatureModalHandler);
        }
    }, [modals]);
    
    return (
        <div className={styles.featureModalsContainer}>
            {
                modals.map((modalOptions, idx) => 
                <FeatureModalWrapper
                    key={modalOptions.token}
                    color={modalOptions.color}
                    zIndex={idx + 1}
                    token={modalOptions.token}
                    onOpen={modalOptions.onOpen}
                    onClose={modalOptions.onClose}
                    closeOnBlur={modalOptions.closeOnBlur}
                >{modalOptions.modal}</FeatureModalWrapper>)
            }
        </div>
    )
});
