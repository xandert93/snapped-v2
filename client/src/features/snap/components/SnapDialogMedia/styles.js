import { makeStyles } from '@material-ui/core';
import { isVPMaxSm } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'snap-media-carousel': {
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [isVPMaxSm]: {
      minHeight: 'initial',
    },
  },

  'snap-media-container': {
    position: 'relative',
  },

  'snap-media': {
    width: '100%',
    maxHeight: '85vh',
    display: 'block',

    [isVPMaxSm]: {
      maxHeight: '40vh',
    },
  },
}));
