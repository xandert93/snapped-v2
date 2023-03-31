import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  stepperPaper: {
    width: '100%',
    marginLeft: -theme.spacing(1.5),
    marginBottom: theme.spacing(2), //to accomodate for last action buttons

    [isVPXs]: {
      padding: theme.spacing(0, 1),
      marginBottom: theme.spacing(1),
    },
  },

  actionButtons: {
    marginTop: theme.spacing(2),
  },
}));
