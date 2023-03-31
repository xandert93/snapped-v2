import { makeStyles } from '@material-ui/core';
import { isVPMaxSm } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  snackbar: {
    [isVPMaxSm]: {
      textAlign: 'center',
    },
  },
}));
