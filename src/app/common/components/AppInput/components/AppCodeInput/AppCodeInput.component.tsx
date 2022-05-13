import { useEffect, useRef, useState } from "react";
import cls from 'classnames';

import styles from './AppCodeInput.module.scss';
import { observer } from "mobx-react-lite";

interface Props {
    onCodeChange: (code: string) => void,
    defaultCode?: string,
    readonly?: boolean
}

export const AppCodeInput: React.FC<Props> = observer(({
    onCodeChange,
    defaultCode,
    readonly
}) => {

    const [value, setValue] = useState(defaultCode || '');
    const inputEl = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        setValue(defaultCode || '');
    }, [defaultCode]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (readonly) {
            return;
        }

        const newValue = e.currentTarget.value.replaceAll(/[^a-zA-Z0-9]/g, '').substring(0, 4);
        setValue(newValue);
        onCodeChange(newValue);
    }

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Space') {
            e.preventDefault();
            return false;
        }
    }

    const focusHandler = () => {
        if (inputEl.current) {
            setFocused(true);
            inputEl.current.focus();
        }
    }

    const blurHandler = () => {
        setFocused(false);
    }

    const getValueItems = () => {
        const emptyArray: string[] = Array(4).fill(' ');

        return emptyArray.map((_, index) => 
            <div 
                key={index}
                className={cls(
                    styles.item, {
                        [styles.fadeIn]: value.length > index, 
                        [styles.unfocused]: !focused
                    })
            }>
                <span className={
                    value.length <= index ? styles.noValue: ''
                }>{value.length > index ? value[index] : "•"}</span>
            </div>
        );
    }

    const items = getValueItems();

    return (
    <div
        tabIndex={0}
        onFocus={focusHandler}
        onBlur={blurHandler}
        className={styles.codeInput}
        style={{
            cursor: readonly ? 'default' : 'pointer'
        }}
    >
        <div className={styles.valueWrapper}>
            {
                items
            }
        </div>
        <input
            onChange={changeHandler}
            onBlur={blurHandler}
            className={styles.input}
            value={value}
            ref={inputEl}
            onKeyDown={keyDownHandler}
        />
    </div>);
});
