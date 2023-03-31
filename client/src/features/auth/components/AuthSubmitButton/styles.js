import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'auth-submit-button': {
    letterSpacing: 3,

    [isVPXs]: {
      letterSpacing: 2,
    },
  },
}));
