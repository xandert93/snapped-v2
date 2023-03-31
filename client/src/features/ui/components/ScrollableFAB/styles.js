import { makeStyles } from '@material-ui/core';
import { isVPMaxSm, isVPSm, isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ spacing }) => ({
  'fab-container': {
    position: 'fixed',
    zIndex: 100,
    bottom: spacing(3),
    right: spacing(3),

    //***a more scalable way of doing this? - getting it to be fixed to the <main>, which already has responsive padding?
    [isVPMaxSm]: {
      right: spacing(2),
    },

    [isVPSm]: {
      bottom: spacing(10),
    },
    [isVPXs]: {
      bottom: spacing(9),
    },
  },
}));
