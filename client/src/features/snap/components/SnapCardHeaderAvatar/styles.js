import { makeStyles } from '@material-ui/core';
import { isVPMinMd, isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ spacing }) => ({
  'snap-card-header-avatar': {
    [isVPMinMd]: {
      borderRadius: '10px 3px 3px',
    },

    [isVPXs]: {
      height: spacing(5),
      width: spacing(5),
    },
  },
}));
