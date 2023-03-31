import { makeStyles } from '@material-ui/core';
import { isVPSm, isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'loading-screen': ({ isLoggedIn }) => ({
    position: 'fixed',
    zIndex: 1600,
    ...theme.mixins.absCover,

    ...(isLoggedIn && {
      top: 64,

      [isVPSm]: {
        bottom: 64,
      },

      [isVPXs]: {
        top: 56,
        bottom: 56,
      },
    }),
  }),

  'linear-progress': {
    height: 3,
  },

  'logo-image': {
    ...theme.mixins.absCenter,
    maxWidth: '8vh',
  },
}));
