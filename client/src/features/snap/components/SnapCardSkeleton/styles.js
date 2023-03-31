import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'skeleton-card-media': {
    width: '100%',
    aspectRatio: '1 / 1',
    height: 'auto', // `.MuiSkeleton-root` sets height of 1.2rem

    [isVPXs]: {
      aspectRatio: '4 / 5',
    },
  },
}));
