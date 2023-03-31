import { alpha, makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'feed-snap-card': {
    [isVPXs]: {
      boxShadow: theme.shadows[1],
    },
  },
}));
