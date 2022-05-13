import { observer } from "mobx-react-lite";
import { BaseAction } from "../base-action/base-action.component";
import { ReactComponent as FavoritesIcon} from '../../../../../../../../assets/img/to-favorites-action.svg';

export const ToSavedPages: React.FC = observer(() => {
    return (
        <BaseAction icon={<FavoritesIcon />} onClick={() => {}}  />
    )
})