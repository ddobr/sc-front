import cls from 'classnames';
import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';

import styles from './Input.module.scss';


interface AppSearchProps {
    icon?: React.ReactNode,
    asPassword?: boolean,
    hasError?: boolean,
    errorText?: string
}


interface Props extends AppSearchProps, Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'> { }
/**
 * @param icon - Иконка справа
 * @param hasError - Хайлайт, обозначающий ошибку
 */
export const AppInput = observer(forwardRef<HTMLInputElement, Props>(({icon,asPassword,hasError,errorText, ...props}, ref) => {
    let wrapperClassName = cls([styles.appInput, props.className]);
    let inputClassName = cls([styles.input, {[styles.error]: hasError}]);

    return (
        <div 
            className={wrapperClassName}
            style={{
                marginBottom: errorText ? '0' : '16px'
            }}
        >
            <div 
                className={styles.wrapper}
            >
                <input 
                    onBlur={(e) => e.target.style.color='var(--light-orange)'} 
                    onFocus={(e) => e.target.style.color='var(--main-orange)'} 
                    ref={ref ? ref : undefined}
                    {...props} 
                    className={inputClassName}
                    type={ asPassword ? "password" : "text" }
                    value={props.value}
                />
                { icon && <div className={styles.icon}>{icon}</div> }
            </div>
            {
                errorText && 
                <div className={styles.errorText}>
                    {errorText}
                </div>
            }
        </div>
    )
}));
