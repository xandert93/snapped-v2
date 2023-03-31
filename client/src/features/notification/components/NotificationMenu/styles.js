import { makeStyles } from '@material-ui/core';
import { isVPMinSm } from '../../../../theme/media-queries';
import { scrollbar } from '../../../../theme/pseudo-elements/scrollbar';

export default makeStyles((theme) => ({
  notifications: {
    [isVPMinSm]: {
      width: 360,
      maxHeight: '50vh',
      overflowY: 'auto',
      ...scrollbar,
    },
  },
}));
