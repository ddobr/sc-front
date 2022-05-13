import { withStyles, CheckboxProps, Checkbox } from "@material-ui/core";
import { observer } from "mobx-react-lite";

export const CustomCheckbox = withStyles({
    root: {
      color: 'var(--main-orange)',
      '&$checked': {
        color: 'var(--main-orange)',
      },
    },
    checked: {},
})(observer((props: CheckboxProps) => <Checkbox color="default" {...props} />));