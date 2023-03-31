import { makeStyles } from '@material-ui/core';
import { isVPMinSm } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'relation-dialog-paper': {
    [isVPMinSm]: {
      height: '40vh',
    },
  },
}));
