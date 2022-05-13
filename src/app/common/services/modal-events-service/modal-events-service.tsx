import { QuizSessionModal, QUIZ_SESSION_MODAL_TOKEN } from "../../components/modals";
import { isAnyMobile } from "../is-mobile.service";
import { ModalEventType } from "./enums";
import { IFeatureModalOptions } from "./interfaces";

class ModalEventsService {
    private _pageLockers: Set<string> = new Set();
    private _featureModals: {
        [token: string]: IFeatureModalOptions 
    } = {}

    /**
     * Показывает модальное окно-фичу. Для закрытия окна вызовите closeFeatureModal
     * с тем же token
     * @param options опции для модалки
     */
    public showFeatureModal(options: IFeatureModalOptions): void {
        if (this.isModalOpen(options.token)) {
            throw new Error(`Modal with Token ${options.token} is already showing`);
        }

        if (options && options.lockPage) {
            this.lockPage(options.token);
        }

        this._featureModals[options.token] = options;
        window.dispatchEvent(
            new CustomEvent<IFeatureModalOptions>(ModalEventType.ShowFeatureModal, {detail: options})
        );
    }

    /**
     * Закрывает модальное окно-фичу. Вызывать с тем же token, с которым вызывался метод
     * showFeatureModal()
     * @param token уникальный идентификатор, который определяет, что открыло модалку
     */
    public closeFeatureModal(token: string): void {
        if (!this.isModalOpen(token)) {
            throw new Error(`Modal with Token ${token} was closed or has never been opened`);
        }

        const modal = Object.values(this._featureModals).find(modalOptions => modalOptions.token === token);
        delete this._featureModals[token];

        if (this._pageLockers.has(token)) {
            this.unlockPage(token);
        }

        window.dispatchEvent(
            new CustomEvent<string>(ModalEventType.CloseFeatureModal, {detail: token})
        );

        modal && modal.onClose && modal.onClose();
    }

    /**
     * Открыта ли модалка с переданным идентификатором
     * @param token идентификатор модального окна
     * @returns true если открыта
     */
    public isModalOpen(token: string): boolean {
        return this._featureModals.hasOwnProperty(token);
    }

    /**
     * Хэндлер события нажатия на контент страницы, закрывает модалку, если в опциях 
     * модалки разрешено закрытие при нажатии на фон
     */
    public bgClickHandler(token: string): void {
        const modal = Object.values(this._featureModals).find(modalOptions => modalOptions.token === token);
        if (modal?.closeOnBlur) {
            this.closeFeatureModal(modal.token);
        }
    }

    /**
     * Показывать модалку с инфой о сессии с квизом (работает только на web)
     */
    public showQuizSessionModal(): void {
        if (!this.isModalOpen(QUIZ_SESSION_MODAL_TOKEN) && !isAnyMobile) {
            const modal = <QuizSessionModal />;
            this.showFeatureModal({token: QUIZ_SESSION_MODAL_TOKEN, closeOnBlur: false, modal: modal});
        }
    }

    /**
     * Закрыть модалку с инфой о сессии с квизом
     */
    public hideQuizSessionModal(): void {
        if (this.isModalOpen(QUIZ_SESSION_MODAL_TOKEN)) {
            this.closeFeatureModal(QUIZ_SESSION_MODAL_TOKEN);
        }
    }

    /**
     * Заблокировать события скрола и клика у страницы.
     * Для разблокировки вызвать unlockPage с тем же token
     * @param token ключ, по которому определяется, кто заблокировал страницу
     */
     private lockPage(token: string): void {
        if (this._pageLockers.size === 0) {
            window.dispatchEvent(new CustomEvent(ModalEventType.LockPage));
        }

        if (this._pageLockers.has(token)) {
            throw new Error(`Page locker with Token ${token} already locking the page`);
        }

        this._pageLockers.add(token);
    }

    /**
     * Разблокировать события скрола и клика у страницы.
     * Страница будет разблокирована только если все вызывающие метод lockPage()
     * разблокируют страницу
     * @param token ключ, по которому определяется, кто заблокировал страницу
     */
    private unlockPage(token: string): void {
        if (!this._pageLockers.has(token)) {
            throw new Error(`Page locker with Token ${token} is not locking the page`);
        }

        this._pageLockers.delete(token);

        if (this._pageLockers.size === 0) {
            window.dispatchEvent(new CustomEvent(ModalEventType.UnlockPage));
        }
    }
}


const modalEventsService = new ModalEventsService();
export default modalEventsService;
