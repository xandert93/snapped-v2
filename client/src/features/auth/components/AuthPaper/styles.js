import { makeStyles } from '@material-ui/core';
import { isVPMaxSm, isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ spacing }) => ({
  'auth-paper': {
    maxWidth: 480,
    padding: spacing(5, 6),

    [isVPXs]: {
      padding: spacing(3, 4),
      boxShadow: 'initial',
    },
    '@media (max-width: 480px)': {
      padding: spacing(2, 3),
    },
    '@media (max-width: 360px)': {
      padding: 0,
    },

    position: 'relative',
  },

  'auth-logo-image': {
    width: '40%',
    [isVPMaxSm]: {
      width: '25%',
    },
    maxWidth: 180,
  },

  'theme-switch-box': {
    position: 'absolute',
    top: spacing(2),
    right: spacing(2),
  },
}));
