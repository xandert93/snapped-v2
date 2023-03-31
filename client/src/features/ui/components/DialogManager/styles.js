import { makeStyles } from '@material-ui/core';
import { isVPMinSm } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'activation-dialog': {
    textAlign: 'center',
  },

  'snap-likes-dialog-paper': {
    [isVPMinSm]: {
      height: '40vh',
    },
  },
}));
