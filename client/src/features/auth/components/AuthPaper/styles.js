import { makeStyles } from '@material-ui/core';
import { isVPMaxSm, isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ palette, spacing }) => ({
  'auth-paper': {
    position: 'relative', // for <ThemeSwitch>
    maxWidth: 480,
    gap: spacing(2),
    padding: spacing(5, 6),

    [isVPXs]: {
      boxShadow: 'none',
      padding: spacing(3, 4),
    },

    '@media (max-width: 480px)': {
      padding: spacing(2, 3),
    },
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

  'auth-container': {
    gap: spacing(1.5),
  },
}));
