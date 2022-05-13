import { AppInput } from '../../../../../AppInput';
import  SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect, useMemo, useRef } from 'react';
import { ReactComponent as CloseSearchBarSvg } from '../../../../../../../../assets/img/closeSearchBar.svg';
import { user } from '../../../../../../api';
import { debounce } from '../../../../../../methods/debounce';
import { ISearchResult } from '../../../../../../models';
import { useHistory } from 'react-router';
import { toChapter, toNewsArticle } from '../../../../../../services/routing-service/navigation-urls';
import modalEventsService from '../../../../../../services/modal-events-service/modal-events-service';
import { observer } from 'mobx-react-lite';

import styles from './search-bar.mobile.module.scss';

const MOBILE_SEARCH_MODAL_CALLER_GUI = 'MOBILE_SEARCH_MODAL_CALLER_GUI';

interface Props {
    onStartSearch: () => void,
    onEndSearch: () => void
}

export const MobileSearchBar: React.FC<Props> = observer(({
    onEndSearch,
    onStartSearch,
}) => {

    const clickHandler = () => {
        const modalCloseHandler = () => {
            onEndSearch();

            if (modalEventsService.isModalOpen(MOBILE_SEARCH_MODAL_CALLER_GUI)) {
                modalEventsService.closeFeatureModal(MOBILE_SEARCH_MODAL_CALLER_GUI);
            }
        } 

        onStartSearch();
        const modal = <ModalSearchBar 
            onClose={modalCloseHandler} 
            onItemClick={modalCloseHandler}
        />

        modalEventsService.showFeatureModal({
            token: MOBILE_SEARCH_MODAL_CALLER_GUI,
            modal: modal,
            color: 'orange',
            lockPage: true,
            onClose: modalCloseHandler,
            closeOnBlur: true
        })
    }

    return (
        <SearchIcon 
            onClick={clickHandler}
            className={styles.openSearchIcon}
        />
    )
});

interface ModalSearchBarProps {
    onClose: () => void,
    onItemClick: () => void,
}

const ModalSearchBar: React.FC<ModalSearchBarProps> = observer(({ onClose, onItemClick }) => {
    const [showResults, setShowResults] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState<ISearchResult[]>([]);
    const history = useHistory();
    const inputEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputEl.current) {
            inputEl.current.focus();
        }
    },[inputEl]);

    const searchForResults = useMemo(() => debounce((query: string) => {
        if (query.trim() !== '') {
            user.searchOnSite(query).response
            .then(results => {
                setShowResults(true);
                setResults(results.data)
            })
            .catch();
        }
    }, 300), []);
    
    useEffect(() => {
        setResults([]);
        searchForResults(inputValue);
    }, [inputValue, searchForResults])

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        console.log(inputEl.current)
        setShowResults(false);
        if (value.trim() === '') {
            setResults([]);
        }

        setInputValue(value);
    }

    const handleBlur = () => {
        setShowResults(false);
    }

    const handleFocus = () => {
        if (results.length !== 0) {
            setShowResults(true);
        }
    }

    const clickHandler = (item: ISearchResult) => {
        handleBlur();
        onItemClick();
        if (item.type === 'news' && 'news_id' in item.ids) {
            history.push(
                toNewsArticle(item.ids.news_id)
            )
        } else if (item.type === 'page' && !('news_id' in item.ids)) {
            history.push(
                toChapter(
                    item.ids.course_id, 
                    item.ids.section_id, 
                    item.ids.chapter_id
                ),
                { openedPageId: item.ids.page_id}
            )
        }
    }

    const searchResults = useMemo(
    () => results.map((e, i) => <SearchResult 
            key={i} 
            onClick={clickHandler} 
            searchResult={e} 
            query={inputValue}
        />
    // eslint-disable-next-line
    ), [inputValue, results]);

    return (
        <div className={styles.searchWrapper}>
            <AppInput 
                className={styles.search} placeholder='Как сделать латте?' 
                icon={
                    <CloseSearchBarSvg 
                        onClick={() => onClose()} 
                        style={{
                            color: 'var(--main-orange)'
                        }}
                    />
                } 
                onBlur={() => handleBlur()} 
                onFocus={() => handleFocus()}
                onInput={handleInput}
                ref={inputEl}
                value={inputValue}
                style={{
                    borderBottomRightRadius: showResults ? '0px' : '',
                    borderBottomLeftRadius: showResults ? '0px' : '',
                }}
            />
            {
                showResults && 
                <div className={styles.searchResults}>
                    {searchResults}
                </div>
            }
        </div>
    )
});

interface SearchResultProps {
    onClick: (value: ISearchResult) => void,
    searchResult: ISearchResult,
    query: string,
}

const SearchResult: React.FC<SearchResultProps> = observer(({searchResult, onClick, query}) => {
    const text = searchResult.words;

    const normalizedQuery = query.trim().toLowerCase();
    const normalizedText = text.toLowerCase();

    const queryStart = normalizedText.indexOf(normalizedQuery);
    const queryEnd = queryStart + normalizedQuery.length;

    let preQuery = text; 
    let postQuery = text; 
    let originalQuery = '';

    if (queryStart !== -1) {
        preQuery = text.substring(0, queryStart);
        postQuery = text.substring(queryEnd);
        originalQuery = text.substring(queryStart, queryEnd);
    }

    return (
        <div className={styles.searchResult} onMouseDown ={() => {onClick(searchResult)}}>
            <SearchIcon className={styles.icon} />
            <div>
            {
                queryStart !== -1 &&
                <>
                {preQuery}
                <span className={styles.queryHighlight}>{originalQuery}</span>
                {postQuery}
                </>
            }
            {
                queryStart === -1 &&
                <span>{text}</span>
            }
            </div>
        </div>
    )

});
