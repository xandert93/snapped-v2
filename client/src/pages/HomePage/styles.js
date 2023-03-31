import { makeStyles } from '@material-ui/core';
import { isVPMaxSm, isVPMinMd } from '../../theme/media-queries';

export default makeStyles((theme) => ({
  'feed-container': {
    maxWidth: 540,
  },
  'suggestions-container': {
    [isVPMinMd]: {
      maxWidth: 400,
    },

    [isVPMaxSm]: {
      order: -1, // order first
    },
  },
}));

// sx prop is used in MUI5 to change ordering
