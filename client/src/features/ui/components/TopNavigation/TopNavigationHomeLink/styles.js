import { makeStyles } from '@material-ui/core';
import { isVPMaxMd, isVPMaxSm, isVPXs } from '../../../../../theme/media-queries';

export default makeStyles(({ spacing }) => ({
  'top-navigation-home-link': {
    display: 'flex',
    alignItems: 'center',

    [isVPMaxSm]: {
      pointerEvents: 'none', // so that <Link> isn't clickable for xs, sm and md devices
    },
  },

  'header-title': {
    marginLeft: spacing(2),

    [isVPMaxMd]: {
      display: 'none', // leave <h1> in DOM for SEO...(?)
    },
  },

  'header-logo-image': {
    display: 'block',
    height: spacing(6),

    [isVPMaxMd]: {
      marginLeft: spacing(2),
    },
    [isVPXs]: {
      height: spacing(5),
      marginLeft: spacing(1.5),
    },
  },
}));
