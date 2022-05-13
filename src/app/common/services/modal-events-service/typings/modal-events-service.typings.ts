import { ModalEventType } from "../enums/modal-event.enum";
import { IFeatureModalOptions } from "../interfaces/feature-modal-options.interface";

declare global {
    interface WindowEventMap {
        [ModalEventType.ShowFeatureModal]: CustomEvent<IFeatureModalOptions>;
        [ModalEventType.CloseFeatureModal]: CustomEvent<string>;
    }
}
