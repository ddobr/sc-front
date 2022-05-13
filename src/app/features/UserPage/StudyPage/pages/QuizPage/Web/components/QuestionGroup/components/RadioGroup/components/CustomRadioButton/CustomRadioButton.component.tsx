import { withStyles, RadioProps, Radio } from "@material-ui/core";
import { observer } from "mobx-react-lite";

export const CustomRadioButton = withStyles({
    root: {
      color: 'var(--main-orange)',
      '&$checked': {
        color: 'var(--main-orange)',
      },
    },
    checked: {},
})(observer((props: RadioProps) => <Radio color="default" {...props} />));