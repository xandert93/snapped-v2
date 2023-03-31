import { makeStyles } from '@material-ui/core';
import { isVPMinSm } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'snap-dialog-content': {
    flexGrow: 1,
  },

  'dialog-snap-card': {
    [isVPMinSm]: {
      width: 420,
      minWidth: 420,
    },
  },
}));
