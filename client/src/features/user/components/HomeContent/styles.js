import { makeStyles } from '@material-ui/core';
import { isVPMaxSm, isVPMinMd, isVPXs } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'feed-container': {
    maxWidth: 540,
  },
  'suggested-snaps-container': {
    [isVPMinMd]: {
      maxWidth: 400,
    },

    [isVPMaxSm]: {
      order: -1, // order first
    },
  },

  'suggested-users-container': {},
}));

// sx prop is used in MUI5 to change ordering
