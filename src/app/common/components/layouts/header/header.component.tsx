import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { index } from '../../../services/routing-service/navigation-urls';
import { UserMenu } from './components/user-menu';
import { isAnyMobile } from '../../../services/is-mobile.service';
import { SearchBar } from './components/search-bar/search-bar.component';
import { observer } from 'mobx-react-lite';

import styles from './header.module.scss';


export const Header: React.FC = observer(() => {
    const [hideElements, setHideElements] = useState(false);

    const Logo = useCallback(() => (
        <div className={styles.logo}>
            <div className={styles.image}>
                <NavLink to={index()} />
            </div>
        </div>
    ), []);

    return (
        <header 
            className={styles.header}
        >
            {
                // Если не мобилка - показываем всегда
                // Если мобилка - то по условию hideElements
                (!isAnyMobile || !hideElements) &&  
                <Logo />
            }

            {
                // Если не мобилка - показываем всегда
                // Если мобилка - то по условию hideElements
                (!isAnyMobile || !hideElements) &&  
                <SearchBar
                    onEndSearch={() => {setHideElements(false)}}
                    onStartSearch={() => {setHideElements(true)}}
                />
            }   
            
            { isAnyMobile === false &&
                <UserMenu/>
            }
        </header>
    )
});
