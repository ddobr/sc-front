import { useHistory } from "react-router-dom";
import { index, myCourses } from "../../../services/routing-service/navigation-urls";
import cls from 'classnames';
import { ReactComponent as Home } from '../../../../../assets/img/home.svg';
import { ReactComponent as HomeSelected } from '../../../../../assets/img/homeSelected.svg';
import { ReactComponent as Study } from '../../../../../assets/img/study.svg';
import { ReactComponent as StudySelected } from '../../../../../assets/img/studySelected.svg';
import { MobileMenuItem } from "./enums/mobile-menu-item.enum";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import styles from './mobile-menu.module.scss';


const menuState = {
    selectedItem: MobileMenuItem.Home,

    home: {
        url: '/'
    },
    study: {
        url: ''
    }
};

export const MobileMenu: React.FC = observer(() => {
    const history = useHistory();

    useEffect(() => {
        const main = document.getElementById('main');
        if (main) {
            document.getElementById('main')!.style.marginBottom = '7rem';
        }

        return () => {
            const main = document.getElementById('main');
            if (main) {
                document.getElementById('main')!.style.marginBottom = '0';
            }
        }
    }, []);

    const homeBtnStyles = cls(styles.icon, { [styles.active]: menuState.selectedItem === MobileMenuItem.Home });
    const homeClickHandler = () => {
        if (menuState.selectedItem !== MobileMenuItem.Home) {
            menuState.selectedItem = MobileMenuItem.Home;
            history.push(index());
        }
    }
    
    const studyBtnStyles = cls(styles.icon, { [styles.active]: menuState.selectedItem === MobileMenuItem.Study });
    const studyClickHandler = () => {
        if (menuState.selectedItem !== MobileMenuItem.Study) {
            menuState.selectedItem = MobileMenuItem.Study;
            history.push(myCourses());
        }
    }

    return (
        <nav className={styles.mobileMenu}>
            <div onClick={homeClickHandler} className={homeBtnStyles}>
                {
                    menuState.selectedItem === MobileMenuItem.Home
                        ? <HomeSelected />
                        : <Home />
                }
            </div>

            <div onClick={studyClickHandler} className={studyBtnStyles}>
                {
                    menuState.selectedItem === MobileMenuItem.Study
                        ? <StudySelected />
                        : <Study />
                }
            </div>
        </nav>
    )
});
