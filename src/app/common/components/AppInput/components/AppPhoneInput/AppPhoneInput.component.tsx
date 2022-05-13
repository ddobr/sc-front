import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './AppPhoneInput.module.scss';
import cls from 'classnames';
import { observer } from 'mobx-react-lite';

interface Props {
    onValueChanges?: (value: string) => void,
    readonly?: boolean,
    defaultValue?: string
}

export const AppPhoneInput: React.FC<Props> = observer(({onValueChanges = () => {}, readonly, defaultValue}) => {
    const placeholder = useMemo(() => `+7 (9**) ***-**-**`, []);
    const [value, setValue] = useState('');
    const [fvalue, setFValue] = useState('');
    const [focused, setFocused] = useState(false);
    const inputNode = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (readonly) {
            return;
        }

        const newValue = e.currentTarget.value.replaceAll(/\D/g, '');
        if (newValue.length === 11 && (newValue.startsWith('89') || newValue.startsWith('79'))) {
            onValueChanges(newValue.substring(1, 11));
            setValue(newValue.substring(1, 11));
        } else {
            onValueChanges(newValue.substring(0, 10));
            setValue(newValue.substring(0, 10));
        }
    }

    useEffect(() => {
        if (value === '' && !focused) {
            setFValue('+7 (900) 000-00-00');
            return;
        }

        const groups = value.match(/([0-9]{0,3})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})/)!;
        let result = '+7 ';

        if (groups[1].length === 3) {
            result += `(${groups[1]}) `;
            result += groups[2];
            if (groups[3].length > 0) {
                result += `-${groups[3]}`
            }
            if (groups[4].length > 0) {
                result += `-${groups[4]}`
            }
        } else {
            result += groups[1];
        }

        setFValue(result);
    }, [value, focused]);

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
        }
    }

    const focusHandler = () => {
        if (readonly) {
            return;
        }

        inputNode.current!.focus();
        setFocused(true);
    }

    const blurHandler = () => {
        setFocused(false);
    }

    const pasteHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (readonly) {
            return;
        }

        const text = e.clipboardData.getData('Text').replaceAll(/\D/g, '');

        if (text.length === 11) {
            onValueChanges(text.substring(1, 11));
            setValue(text.substring(1, 11));
        } else {
            onValueChanges(text);
            setValue(text)
        }
    }

    const wrapperClasses = cls(styles.phoneInputWrapper, {[styles.focused]: focused});
    const displayClasses = cls(styles.phoneDisplay, {[styles.notFocused]: !focused && value === ''});

    return (
        <div 
            className={wrapperClasses}
            tabIndex={0} 
            onFocus={focusHandler}
        >
            <div 
                className={displayClasses}
            >
                {fvalue}
                {focused && <>|</>}
            </div>
            <input 
                inputMode="tel"
                placeholder={placeholder}
                autoComplete={'tel'}
                className={styles.phoneInput}
                onChange={(e) => changeHandler(e)}
                onPaste={(e) => pasteHandler(e)}
                value={value}
                ref={inputNode}
                onBlur={blurHandler}
                onKeyDown={(e) => keyDownHandler(e)}
            />
        </div>
    )
});
