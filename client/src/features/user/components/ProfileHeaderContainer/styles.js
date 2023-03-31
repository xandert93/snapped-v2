import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ spacing }) => ({
  'profile-header-container': {
    padding: spacing(1, 3),

    [isVPXs]: {
      padding: spacing(1, 2),
    },
  },
}));
