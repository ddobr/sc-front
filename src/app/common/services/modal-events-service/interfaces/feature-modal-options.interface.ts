export interface IFeatureModalOptions {
    /** Цвет фона */
    color?: 'white' | 'orange',
    /** Нужно ли блокировать страницу */
    lockPage?: boolean,
    /** Нужно ли закрывать модалку если кликнули по странице  */
    closeOnBlur: boolean,
    /** Содержимое модалки */
    modal: React.ReactElement,
    /** Идентификатор вызова модалки */
    token: string,
    /** Хэндлер закрытия */
    onClose?: () => void,
    /** Хэндлер открытия */
    onOpen?: () => void,
} 