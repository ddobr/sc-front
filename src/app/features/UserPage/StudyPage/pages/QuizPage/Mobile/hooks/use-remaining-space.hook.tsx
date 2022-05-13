/**
 * Хук для "вытягивания" элемента до конца страницы
 * @param element элемент
 * @param marginBottom отступ снизу от конца страницы
 */
export function fillRemainingSpace(element: HTMLElement | null, marginBottom: number = 10): void {
    if (element !== null) {
        const windowSize = window.innerHeight;
        const groupHeight = windowSize - element.getBoundingClientRect().top - marginBottom;
        
        element.style.height = `${groupHeight}px`;
    }
}