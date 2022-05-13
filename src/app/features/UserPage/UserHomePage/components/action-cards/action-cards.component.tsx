import { observer } from "mobx-react-lite";
import { ToRecipes } from "./components";

import styles from './action-cards.module.scss';
import { ToSavedPages } from "./components/to-saved-pages/to-saved-pages.component";


export const ActionCards: React.FC = observer(() => {
    return (
        <section className={styles.actionCards}>  
            <ToRecipes />
            <ToSavedPages />
        </section>
    )
}) 