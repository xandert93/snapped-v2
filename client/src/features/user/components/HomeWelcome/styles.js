import { makeStyles } from '@material-ui/core';
import { isVPMinSm, isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ spacing, shadows }) => ({
  'welcome-card': {
    maxWidth: 640,
    padding: spacing(4),

    [isVPXs]: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      padding: spacing(1),
    },
  },

  'suggested-users-container': {
    width: '100%',

    [isVPMinSm]: {
      // to get vertical scrolling dynamically on flex-item. Read here for expl: https://stackoverflow.com/a/14964944/13169785
      // not applying on mobile because screen is too small for this to be effective
      flex: '1 1 auto',
      height: 0,
      overflowY: 'auto',
    },

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));
