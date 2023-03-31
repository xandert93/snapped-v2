import { makeStyles } from '@material-ui/core';
import { isVPMinSm } from '../../../theme/media-queries';

export default makeStyles((theme) => ({
  'compact-paper': {
    [isVPMinSm]: {
      height: '40vh',
      maxWidth: 480,
    },
  },
}));
