import cls from 'classnames';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import styles from './minimal-link.module.scss';

interface Props {
    title: string,
    available?: boolean,
    special?: boolean,
    path: string,
}

export const MinimalLink: React.FC<Props> = observer(({available = true, special = false, title, path}) => {
    const location = useLocation();
    const history = useHistory();
    const [selected, setSelected] = useState(location.pathname === path);
    
    useEffect(() => {
        setSelected(location.pathname === path);
    }, [location.pathname, path]);

    const clickHandler = () => {
        if (available) {
            history.push(path);
        }
    }

    const classNames = useMemo(() => cls([
        styles.navItemCommon,
        {[styles.special]: special},
        {[styles.selected]: selected},
        {[styles.locked]: !available},
    ]), [special, selected, available]);

    return (
        <div
            className={classNames}
            onClick={clickHandler}
        >
            {title}
        </div>
    )
});
