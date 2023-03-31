import { alpha, makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../theme/media-queries';

export default makeStyles((theme) => ({
  'icon-button': {
    padding: theme.spacing(1.5),

    [isVPXs]: {
      padding: theme.spacing(1),
    },

    backgroundColor: alpha(theme.palette.text.primary, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.text.primary, 0.2),
    },

    // backgroundColor: alpha(theme.palette.primary.light, 0.2),
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.primary.light, 0.4),
    // },
  },
}));
