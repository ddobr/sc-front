/**
 * Возвращает количество символов слева до ближайшего DIV для правой и левой границы выделения
 * @param selection выделение
 * @returns количество символов слева до ближайшего DIV для правой и левой границы выделения
 */ 
export function getLeftRightBorders(selection: Selection): { left: number, right: number } {
    let left: number = 0;
    if (selection.anchorNode) {
        left = getAbsoluteOffsetForText(selection.anchorNode, selection.anchorOffset)
    }

    let right: number = 0;
    if (selection.focusNode) {
        right = getAbsoluteOffsetForText(selection.focusNode, selection.focusOffset)
    }

    if (left <= right) {
        return { left: left, right: right };
    }

    return { left: right, right: left };
}

/** Возвращает количество символов слева для текстовой ноды до ближайшего DIV */
function getAbsoluteOffsetForText(node: Node, offset: number): number {
    // Плюсуем офсет
    let position = offset;

    // Плюсуем длины предыдущих родственников
    let prevSibling = node.previousSibling;
    while (prevSibling !== null) {
        position += getLengthOfNode(prevSibling);
        prevSibling = prevSibling.previousSibling;
    }

    // идем вверх налево - плюсуем длины предыдущих родителей
    let parentNode = node.parentNode;
    while (parentNode !== null && parentNode.nodeName.toUpperCase() !== 'DIV') {
        let parentPrevSibling = parentNode.previousSibling;

        while (parentPrevSibling !== null) {
            position += getLengthOfNode(parentPrevSibling);
            parentPrevSibling = parentPrevSibling.previousSibling;
        }

        parentNode = parentNode.parentNode;
    }

    return position;
}

/**
 * Возвращает количество символов в ноде 
 * @param node нода
 * @returns 
 */
function getLengthOfNode(node: Node): number {
    return node.textContent?.length || 0;
}