import cls from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './button.module.scss';

interface ButtonProps {
    appearance?: 'primary' | 'secondary' | 'transparent'
}

interface Props extends ButtonProps, React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { }

export const ScButton: React.FC<Props> = observer(({appearance, className, ...props}) => {
    const classNames = cls([
        styles.common, 
        {[styles.primary]: appearance === undefined || appearance === 'primary'},
        {[styles.secondary]: appearance === 'secondary'},
        {[styles.transparent]: appearance === 'transparent'},
        {[className!]: className !== undefined},
    ]);

    return (
        <button
            className={classNames}
            {...props}
        >
            {props.children}
        </button>
    )
});
