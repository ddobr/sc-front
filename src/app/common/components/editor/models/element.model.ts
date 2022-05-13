import { ContentElementType, StyleType } from "../enums";
import { getLeftRightBorders, getTags } from "../functions";


export class ElementModel {

    
    public static applyStyleToSelection(div: HTMLDivElement, selection: Selection, type: StyleType): string {
        if (selection.isCollapsed) {
            return div.innerHTML
        }

        const root = ElementModel.fromDiv(div);
        const { left, right } = getLeftRightBorders(selection);

        return root.addTypeToSelection(left, right, type as unknown as ContentElementType).toHTMLString();
    }

    /**
     * Создает рутовый элемент из DIV
     * @param div 
     * @returns 
     */
    public static fromDiv(div: HTMLDivElement): ElementModel {
        if (div.nodeName.toUpperCase() !== 'DIV') {
            throw new Error('fromDiv() function only works with DIV elements');
        }

        const root = new ElementModel(ContentElementType.div, 0);
        root.setChildren(Array.from(div.childNodes));
        root._prevLength = root.contentLength;

        return root;
    }

    /**
     * Создает массив ElementModel из переданного Node 
     * @param node Node
     * @returns Т.к. нода может иметь неизвестные тэги, то берутся уже ее дети. Поэтому возвращается массив
     */
    private static getElementsFromNode(node: Node, leftOffset: number): ElementModel[] {
        if (node.nodeName.toUpperCase() === '#TEXT') {
            return [ElementModel.createTextChild(leftOffset, node.textContent || '')];
        }

        if (node.nodeName.toUpperCase() === 'B') {
            const type = ContentElementType.bold;
            const newChild = ElementModel.createContainerChild(leftOffset, type, Array.from(node.childNodes));

            return [newChild];
        }

        if (node.nodeName.toUpperCase() === 'I') {
            let type = ContentElementType.italic;
            const newChild = ElementModel.createContainerChild(leftOffset, type, Array.from(node.childNodes));

            return [newChild];
        }

        const childList: (ElementModel[])[] = [];
        Array.from(node.childNodes).forEach(childNode => {
            const newChildren = this.getElementsFromNode(childNode, leftOffset);
            // Увеличиваем offset для следующего элемента. Т.к. может вернуться несколько, то считаем их сумму.
            leftOffset += newChildren.map(e => e.contentLength).reduce((a, b) => a + b);

            childList.push(newChildren);
        });

        return childList.filter(e => e.length !== 0).flat(1);
    }

    /**
     * Создает текстовый элемент
     * @param leftOffset отступ слева от начала дива до этого элемента
     * @param text текст
     * @returns 
     */
    private static createTextChild(leftOffset: number, text: string): ElementModel {
        const child = new ElementModel(ContentElementType.text, leftOffset);
        child._innerText = text;
        // тупо для того чтобы в след раз не пересчитывать
        child._prevLength = child.contentLength;

        return child;
    }

    /**
     * Создает стилизованный элемент-контейнер
     * @param leftOffset отступ слева от начала дива до этого элемента
     * @param type тип элемента
     * @param children массив нод или элементов, которые будут детьми этого контейнера
     * @returns 
     */
    private static createContainerChild(
        leftOffset: number, 
        type: ContentElementType, 
        children: Node[] | ElementModel[]
    ): ElementModel {

        const child = new ElementModel(type, leftOffset);
        child.setChildren(children);

        // тупо для того чтобы в след раз не пересчитывать
        child._prevLength = child.contentLength;

        return child;
    }

    /**
     * Сшивает переданный массив элементов с одинаковым типом в один элемент
     * @param elements массив элементов с одинаковым типом
     * @returns 
     */
    private static joinElements(elements: ElementModel[]): ElementModel {
        if (elements.length === 0 || elements.length === 1) {
            throw new Error(`Can't join ${elements.length} elements `)
        }

        const type = elements[0].elementType;

        // Проверяем все ли одного типа
        if (!elements.every(e => e.elementType === type)) {
            throw new Error(`Can't join elements with different type`);
        }

        const firstElement = elements[0];

        // ДЛЯ КОНТЕЙНЕРОВ
        if (type !== ContentElementType.text) {
            let newChildren = [...firstElement.children];
    
            for (let i = 1; i < elements.length; i++) {
                const element = elements[i];
                newChildren.push(...element.children);
            }
            
            firstElement.setChildren(newChildren);
            return firstElement;

        // ДЛЯ ТЕКСТОВЫХ ЭЛЕМЕНТОВ
        } else {
            const newText = elements.map(element => element._innerText).reduce((t1, t2) => t1! + t2!);
            firstElement._innerText = newText;
        }

        return firstElement;
    }

    /** Тип элемента */
    public get elementType(): ContentElementType {
        return this._elementType;
    }

    /** 
     * Длина этого элемента (количество символов в этом элементе) 
     * 
     * Дорогая операция, поэтому кэшируем предыдущее значение, если не изменились children
     * */
    public get contentLength(): number {
        if (this.elementType === ContentElementType.text) {
            this._prevLength = -1;
            this._childrenModified = false;

            return this._innerText!.length || 0;
        }

        if (this._childrenModified || this._prevLength === -1) {
            let length = 0;
            this.children.forEach(element => {
                length += element.contentLength;
            });
    
            this._childrenModified = false;
            this._prevLength = length;
            
            return length;
        }

        return this._prevLength;
    }

    /**  Отступ от начала дива до правого конца элемента */
    private get _rightOffset(): number {
        return this._leftOffset + this.contentLength;
    }

    /** Дочерние элементы */
    private set children(newChildren: ReadonlyArray<ElementModel>) {
        this._childrenModified = true;
        this._children = newChildren;
    }

    /** Дочерние элементы */
    private get children(): ReadonlyArray<ElementModel> {
        return this._children;
    }

    /** Дочерние элементы. НЕ ПРИСВАИВАТЬ ЗНАЧЕНИЕ - ТОЛЬКО ЧЕРЕЗ SETTER */
    private _children: ReadonlyArray<ElementModel> = [];
    /** Изменился ли массив дочерних элементов */
    private _childrenModified: boolean = false;
    /** Кэшированная длина */
    private _prevLength: number = -1;
    /** Текст текстового элемента. ТОЛЬКО ДЛЯ ContentElementType.text */
    private _innerText: string | null = null;
    /** Тип элемента */
    private _elementType: ContentElementType;
    /** ??? */
    private _parent: ElementModel | null = null;
    /**  Отступ от начала дива до левого края элемента */
    private _leftOffset: number;

    /** Создает пустой элемент переданного типа с заданным отступом */
    private constructor(type: ContentElementType, leftOffset: number) {
        this._elementType = type;
        this._leftOffset = leftOffset;
    }

    /** Парсит элемент в HTML */
    public toHTMLString(): string {
        if (this._elementType === ContentElementType.text) {
            return this._innerText || '';
        }

        if (this.children.length === 0) {
            return '';
        }

        const [openTag, closeTag] = getTags(this.elementType);
        const content = this.children.map(child => child.toHTMLString()).join('');

        return `${openTag}${content}${closeTag}`;
    }

    /**
     * Задает себе и всем дочерним элементам (учитывая их длину) отступ от начала дива до левого края элемента
     * @param leftOffset отступ от начала дива до левого края элемента
     */
    private setLeftOffset(leftOffset: number) {
        this._leftOffset = leftOffset;

        let leftOffsetCounter = leftOffset;
        this.children.forEach(element => {
            element.setLeftOffset(leftOffsetCounter);
            leftOffsetCounter += element.contentLength;
        });
    }

    /**
     * Задает дочерние элементы. Также указывает им leftOffset
     * @param children дочерние элементы
     */
    private setChildren(children: Node[] | ElementModel[]) {
        let leftOffsetCounter = this._leftOffset;

        const newChildren: ElementModel[] = [];
        
        children.forEach((rawChild: ElementModel | Node) => {
            if (rawChild instanceof ElementModel) {
                rawChild.setLeftOffset(leftOffsetCounter);
                leftOffsetCounter += rawChild.contentLength;

                newChildren.push(rawChild);
            } else {
                const childrenToFlat = ElementModel.getElementsFromNode(rawChild, leftOffsetCounter);
                // Увеличиваем offset для следующего элемента. Т.к. может вернуться несколько, то считаем их сумму.
                leftOffsetCounter += childrenToFlat.map(e => e.contentLength).reduce((a, b) => a + b);
                
                newChildren.push(...childrenToFlat);
            }
        });

        this.children = newChildren;
        this.zipChildren();
    }

    /**
     * Разрезает элемент на три части по указанным индексам разреза.
     * 
     * Возвращает: левую часть разреза, центр, правую часть разреза.
     * 
     * Любой из элементов может быть undefined если он оказался пустым при разрезе
     * (например chops.left === chops.right то центр undefined или chops.left оказался равен левой границе
     * тогда левая часть undefined).
     * 
     * Можно передавать грани разреза undefined, тогда будет браться соответствующая граница 
     * (если left и right undefined то возвращается [undefined, element, undefined])
     * @param chops левая и правая части разреза
     * @returns [leftChop, centerChop, rightChop]
     */
    private chopElement(
        chops: {left?: number, right?: number}
    ): [ElementModel | undefined, ElementModel | undefined, ElementModel | undefined] {
        
        const leftChop = (chops.left === undefined || chops.left < this._leftOffset) ? this._leftOffset : chops.left;
        const rightChop = (chops.right === undefined || chops.right > this._rightOffset) ? this._rightOffset : chops.right;

        // Если правыйЧоп меньше левогоКрая или левыйЧоп больше правогоКрая
        if (leftChop > this._rightOffset || rightChop < this._leftOffset) {
            throw new Error('Incorrect offsets passed to chopElement()')
        }

        // Надо обрезать на три части (в центре сердцевина)
        const [left, temp] = this.chopInHalf(leftChop);
        if (temp !== undefined) {
            const [center, right] = temp.chopInHalf(rightChop);
            
            return [left, center, right];
        }

        // Попросили центр пустой т.к. left === right. И правая часть пустая т.к. temp === undefined
        return [left, undefined, undefined];
    }

    /**
     * Обрезает элемент на две части на заданном индексе. Индекс должен влезать в границы элемента.
     * Если индекс совпадает с одной из сторон, то возвращается undefined у соответствующей стороны.
     * @param cutIndex индекс разреза, между границами элемента
     * @returns Массив из двух элементов. Один из элементов равен undefined если индекс совпал с одной из границ исходного элемента
     */
    private chopInHalf(cutIndex: number): [ElementModel | undefined, ElementModel | undefined] {
        if (cutIndex < this._leftOffset || cutIndex > this._rightOffset) {
            throw new Error('Out of offsets');
        }

        // ДЛЯ ТЕКСТОВОЙ НОДЫ
        if (this._elementType === ContentElementType.text) {
            const textCutIndex = cutIndex - this._leftOffset; 

            const leftTextElementOffset = this._leftOffset;
            const leftText = this._innerText!.substring(0, textCutIndex);

            const rightTextElementOffset = leftTextElementOffset + leftText?.length;
            const rightText = this._innerText!.substring(textCutIndex);

            return [
                leftText !== '' ? ElementModel.createTextChild(leftTextElementOffset, leftText) : undefined, 
                rightText !== '' ? ElementModel.createTextChild(rightTextElementOffset, rightText) : undefined
            ];
        }

        // ДЛЯ КОНТЕЙНЕР НОДЫ
        // Левая часть обрезанного элемента
        const leftPart = new ElementModel(this.elementType, this._leftOffset);
        // Дети левой части
        const leftPartChildren: ElementModel[] = [];

        // Правая часть обрезанного элемента
        const rightPart = new ElementModel(this.elementType, cutIndex);
        // Дети правой части
        const rightPartChildren: ElementModel[] = [];

        this.children.forEach((child) => {
            // Если правая граница левее или на разрезе
            if (child._rightOffset <= cutIndex) {
                leftPartChildren.push(child);
            } else if (child._leftOffset < cutIndex && cutIndex < child._rightOffset) {
                // Если разрез посередине элемента
                const [leftChild, rightChild] = child.chopInHalf(cutIndex);
                leftChild !== undefined && leftPartChildren.push(leftChild);
                rightChild !== undefined && rightPartChildren.push(rightChild);
            } else {
                // Если левая граница правее или на разрезе
                rightPartChildren.push(child);
            }
        });

        leftPart.setChildren(leftPartChildren);
        rightPart.setChildren(rightPartChildren);

        return [
            leftPart.contentLength !== 0 ? leftPart : undefined, 
            rightPart.contentLength !== 0 ? rightPart : undefined
        ];
    }

    /**
     * Рекурсивно проходится по дочерним элементам и "сшивает" элементы одного типа.
     */
    private zipChildren(): ElementModel[] {
        /** тип предыдущего дочернего элемента */
        let prevType: ContentElementType | null = null;
        /** Временный массив, в который добавляются одинаковые элементы */
        let tempSameChildList: ElementModel[] = [];
        /** Новые дочерние элементы после преобразования */
        const newChildren: ElementModel[] = [];

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            
            // Если такой же тип - добавляем в массив схожих элементов
            if (child.elementType === prevType) {
                tempSameChildList.push(child);
            // Иначе обнуляем массив схожих элементов на текущий элемент и обновляем предыдущий тип
            } else {
                // Если есть похожие то их надо соединить и добавить в новый массив
                if (tempSameChildList.length > 1) {
                    newChildren.push(ElementModel.joinElements(tempSameChildList));
                // Если похожих нет то просто в новый массив закинуть прошлый элемент
                } else if (tempSameChildList.length === 1) {
                    newChildren.push(...tempSameChildList);
                }
                
                tempSameChildList = [child];
                prevType = child.elementType;
            }
        }

        // Если есть похожие то их надо соединить и добавить в новый массив
        if (tempSameChildList.length > 1) {
            newChildren.push(ElementModel.joinElements(tempSameChildList));
        // Если похожих нет то просто в новый массив закинуть прошлый элемент
        } else if (tempSameChildList.length === 1) {
            newChildren.push(...tempSameChildList);
        }

        this.children = newChildren;

        return newChildren;
    }

    private addType(type: ContentElementType): ElementModel {
        if (type === ContentElementType.text) {
            return ElementModel.createTextChild(this._leftOffset, this.getText());
        }

        if (this._elementType === ContentElementType.text) {
            return ElementModel.createContainerChild(this._leftOffset, type, [this]);
        }

        return ElementModel.createContainerChild(
            this._leftOffset, 
            type, 
            this.clearType(type)
        );
    }

    /**
     * Убирает тэг с себя и дочерних элементов
     * @param type тэг который нужно убрать
     * @returns массив элементов без тэга
     */
    private clearType(type: ContentElementType): ElementModel[] {
        if (this.elementType === ContentElementType.text) {
            return [this];
        }

        if (this.elementType === type) {
            return this.children.map(e => e.clearType(type)).flat(1);
        }

        const newChildren = this.children.map(e => e.clearType(type)).flat(1);
        this.setChildren(newChildren);

        return [this];
    }

    /**
     * Возвращает текст внутри элемента
     * @returns 
     */
    private getText(): string {
        if (this.elementType === ContentElementType.text) {
            return this._innerText || '';
        }

        const innerTexts: string[] = [];

        this.children.forEach(element => {
            innerTexts.push(element.getText());
        });

        return innerTexts.join('');
    }

    /**
     * Добавляет стиль к выделению и возвращает элемент со стилем
     * @param left 
     * @param right 
     * @param type 
     * @returns 
     */
    private addTypeToSelection(left: number, right: number, type: ContentElementType): ElementModel {
        const [leftEl, centerEl, rightEl] = this.chopElement({ left, right });

        const newChildren: ElementModel[] = [];

        leftEl && newChildren.push(...leftEl.children);
        centerEl && newChildren.push(...centerEl.children.map(e => e.addType(type)));
        rightEl && newChildren.push(...rightEl.children);
        this.setChildren(newChildren);

        return this;
    }
}
