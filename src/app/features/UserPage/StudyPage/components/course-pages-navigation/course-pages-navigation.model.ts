import { action, computed, makeObservable, observable, reaction } from "mobx";
import { IStudyCourse } from "../../../../../common/models";
import { studyState } from "../../../../../common/root-state";
import { toChapter, toSectionQuiz } from "../../../../../common/services/routing-service/navigation-urls";
import { ILocation } from "../../interfaces/study-location.interface";

export class CoursePagesNavigationValueAccessor {

    /**
     *  Все урлки, на которые можно перейти в данном курсе. 
     *  Какие-то из них тесты, а какие-то - главы, где есть еще внутри страницы
     */
    @observable
    private _courseLocationItems: ILocationItem[] | null = null;

    /**
     * Текущая открытая урлка
     */
    @observable
    private _currentItemIdx: number | null = null;
    
    /**
     * Количество страниц в текущем ILocationItem.type === chapter. 
     * Если текущая ILocationItem.type === quiz, то страниц нет и значение null
     */
    @observable
    private _pagesCount: number | null = null;

    /**
     * Если мы на главе, то содержит индекс текущей страницы.
     * Если на тесте то null
     */
    @observable 
    private _currentPageIdx: number | null = null;

    private _canChangeCurrentPage: boolean = true;

    /** Вернулись на главу назад */
    private _previouslyRedirectedBack: boolean = false;

    private _pushHistory: (path: string, state?: unknown) => void;

    private get _currentItem(): ILocationItem | null {
        if (this._courseLocationItems === null || this._currentItemIdx === null) {
            return null;
        }

        return this._courseLocationItems[this._currentItemIdx];
    }

    /** 
     * Последний известный урл. Нужен на случай, если сперва передали урл, а затем курс 
     */
    private _lastKnownUrl: ILocation | null = null;

    constructor(pushHistory: (path: string, state?: unknown) => void) {
        makeObservable(this);
        this._pushHistory = pushHistory;
        console.log('CREATED');

        reaction(
            () => studyState.course, 
            (course) => {
                this.onCourseChange(course);
            }
        );
    }

    @computed
    public get isLoading(): boolean {
        return this._courseLocationItems === null || this._currentItem === null || (this._currentItem.type === 'chapter' && this._currentPageIdx === null);
    }

    @computed
    public get pageIdx(): number | null {
        return this._currentPageIdx;
    }

    public setPageIdx(idx: number | null): void {
        this._currentPageIdx = idx;
        this._canChangeCurrentPage = false;
    }

    @computed
    public get pages(): {
        now: number, 
        total: number
    } | null {
        if (this._pagesCount === null || this._currentPageIdx === null
            || this._pagesCount === undefined || this._currentPageIdx === undefined
            ) {
            return null;
        }

        return {
            now: this._currentPageIdx + 1,
            total: this._pagesCount
        }
    }

    @computed
    public get backBtnDisabled(): boolean {
        const currentLocation = this.getCurrentLocation();

        // Если текущий урл не найден - запрещаем
        if (currentLocation === null) {
            return true;
        }

        // Не null тк смогли найти текущий урл по массиву
        const items = this._courseLocationItems!;
        const itemIdx = this._currentItemIdx!;

        if (currentLocation.type === 'chapter') {
            // Если это глава и неизвестно количество страниц - запрещаем
            if (this._currentPageIdx === null || this._pagesCount === null) return true;
            // Если это глава и это не первая страница - разрешаем
            if (this._currentPageIdx > 0) return false;
        }

        // Если есть предыдущий урл и он доступен - разрешаем 
        if (items[itemIdx - 1] !== undefined && items[itemIdx - 1].available) return false;

        return true;
    }

    @computed
    public get forwardBtnDisabled(): boolean {
        const currentLocation = this.getCurrentLocation();

        // Если текущий урл не найден - запрещаем
        if (currentLocation === null) {
            return true;
        }

        // Не null тк смогли найти текущий урл по массиву
        const items = this._courseLocationItems!;
        const itemIdx = this._currentItemIdx!;

        if (currentLocation.type === 'chapter') {
            // Если это глава и неизвестно количество страниц - запрещаем
            if (this._currentPageIdx === null || this._pagesCount === null) return true;
            // Если это глава и это не последняя страница - разрешаем
            if (this._currentPageIdx < this._pagesCount - 1) return false;
        }

        // Если есть следующий урл и он доступен - разрешаем 
        if (items[itemIdx + 1] !== undefined && items[itemIdx + 1].available) return false;

        return true;
    }

    @action
    public backButtonClickHandler(): void {
        // Проверяем еще раз, чтобы быть уверенными что значения не null
        if (this.backBtnDisabled) {
            return;
        }
        
        this._canChangeCurrentPage = true;
        const currentLocation = this.getCurrentLocation()!;
        const pageIdx = this._currentPageIdx!;
        const itemIdx = this._currentItemIdx!;
        const items = this._courseLocationItems!;

        if (currentLocation.type === 'chapter') {
            if (pageIdx === 0) {
                const prevItem = items[itemIdx - 1];
                if (prevItem.type === 'chapter') {
                    this.redirect(toChapter(prevItem.courseId, prevItem.sectionId, prevItem.chapterId), undefined, true);
                } else {
                    this.redirect(toSectionQuiz(prevItem.courseId, prevItem.sectionId))
                }

            } else {
                this._currentPageIdx = pageIdx - 1;
            }
        }

        if (currentLocation.type === 'quiz') {
            const prevItem = items[itemIdx - 1];
            if (prevItem.type === 'chapter') {
                this.redirect(toChapter(prevItem.courseId, prevItem.sectionId, prevItem.chapterId), undefined, true);
            } else {
                this.redirect(toSectionQuiz(prevItem.courseId, prevItem.sectionId))
            }
        }
    }

    @action
    public forwardBtnClickHandler(): void {
        // Проверяем еще раз, чтобы быть уверенными что значения не null
        if (this.forwardBtnDisabled) {
            return;
        }

        this._canChangeCurrentPage = true;
        const currentLocation = this.getCurrentLocation()!;
        const pageIdx = this._currentPageIdx!;
        const itemIdx = this._currentItemIdx!;
        const items = this._courseLocationItems!;

        if (currentLocation.type === 'chapter') {
            if (pageIdx === this._pagesCount! - 1) {
                const nextItem = items[itemIdx + 1];
                if (nextItem.type === 'chapter') {
                    this.redirect(toChapter(nextItem.courseId, nextItem.sectionId, nextItem.chapterId));
                } else {
                    this.redirect(toSectionQuiz(nextItem.courseId, nextItem.sectionId))
                }
            } else {
                this._currentPageIdx = pageIdx + 1;
            }
        }

        if (currentLocation.type === 'quiz') {
            const nextItem = items[itemIdx +1];
            if (nextItem.type === 'chapter') {
                this.redirect(toChapter(nextItem.courseId, nextItem.sectionId, nextItem.chapterId));
            } else {
                this.redirect(toSectionQuiz(nextItem.courseId, nextItem.sectionId))
            }
        }
    }
    
    @action
    public setChapterLength(pagesCount: number | null): void {
        if (pagesCount !== null) {
            if (this._previouslyRedirectedBack) {
                this._currentPageIdx = pagesCount - 1;
            } else if (this._canChangeCurrentPage) {
                this._currentPageIdx = 0;
            }
        }

        this._pagesCount = pagesCount;
        this._previouslyRedirectedBack = false;
    }

    @action
    public updateLocation(courseId: string, sectionId: string, chapterId?: string): void {
        this._currentItemIdx = null;
        this._currentPageIdx = null;
        this._pagesCount = null;

        if (chapterId !== undefined) {
            this.onUrlChange({
                type: 'chapter',
                courseId: Number.parseInt(courseId),
                sectionId: Number.parseInt(sectionId),
                chapterId: Number.parseInt(chapterId)
            })
        } else {
            this.onUrlChange({
                type: 'quiz',
                courseId: Number.parseInt(courseId),
                sectionId: Number.parseInt(sectionId),
            })
        }
    }

    /**
     * При изменении курса нужно обновить все доступные урлы в этом курсе
     * 
     * Если до этого передали location, то заново вызываем onUrlChange,
     * потому что метод не смог определить текущий урл
     * @param course 
     */
    @action
    private onCourseChange(course: IStudyCourse | null): void {
        if (course === null) {
            return;
        }

        this._courseLocationItems = course.sections.map(section => {
            const items: ILocationItem[] = [];

            section.chapters.forEach(chapter => {
                items.push({
                    type: 'chapter',
                    courseId: course.id,
                    sectionId: section.id,
                    chapterId: chapter.id,
                    available: chapter.is_available
                })
            })

            if (section.quiz) {
                items.push({
                    type: 'quiz',
                    courseId: course.id,
                    sectionId: section.id,
                    available: section.quiz.available
                })
            }

            return items;
        }).flat(1);

        if (this._lastKnownUrl) {
            this.onUrlChange(this._lastKnownUrl);
        }
    }

    /**
     * Обновляет индекс текущего урла из массива урлов курса
     * Также инициализирует _currentPageIdx в зависимости от того
     * открыта глава или тест
     * 
     * Если нет массива со всеми урлами курса, то не может определить, какой урл открыт
     * @param location 
     */
    @action
    private onUrlChange(location: ILocation | null) {
        if (location === null) {
            return;
        } 

        // На случай если нет _courseLocationItems, то этот метод позже вызовут с этим урлом
        this._lastKnownUrl = location;
        this._currentItemIdx = null;

        if (location.type === 'chapter') {
            if (this._courseLocationItems) {
                const idx = this._courseLocationItems.findIndex(item => {
                    if (item.type === 'quiz') return false;
                    return item.chapterId === location.chapterId;
                });

                this._currentItemIdx = idx !== -1 ? idx : null;
            }

            return;
        }
        
        if (location.type === 'quiz') {
            this._pagesCount = null;
            this._currentPageIdx = null;

            if (this._courseLocationItems) {
                const idx = this._courseLocationItems.findIndex(item => {
                    if (item.type === 'chapter') return false;

                    return item.sectionId === location.sectionId;
                });

                this._currentItemIdx = idx !== -1 ? idx : null;
            }
        }
    }

    private getCurrentLocation(): ILocationItem | null {
        if (this._courseLocationItems && this._currentItemIdx !== null) {
            return this._courseLocationItems[this._currentItemIdx];
        }

        return null;
    }

    private redirect(path: string, state?: unknown, startChapterFromEnd: boolean = false): void {
        this._previouslyRedirectedBack = startChapterFromEnd;
        this._currentPageIdx = null;
        this._pagesCount = null;
        this._pushHistory(path, state);
    }
}

type ILocationItem = ILocation & { 
    /**
     * TODO: придумать систему дедлайнов
     * 
     * Например глава еще заблокирована, тк не пройден (или провален)
     * тест из прошло раздела. Или дедлайн по тесту прошел, а чел его еще не прошел
     */
    available: boolean;
}
