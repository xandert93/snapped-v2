import { makeStyles } from '@material-ui/core';
import { isVPXs } from '../../../../theme/media-queries';

export default makeStyles(({ palette }) => ({
  'profile-avatar': {
    width: '100%', // else will be 56px (sm+) or 40px (xs)
    height: 'auto', // else will be 56px (sm+) or 40px (xs)
    maxWidth: '125px',
    border: `3px solid ${palette.text.primary}`,

    [isVPXs]: {
      borderWidth: 2,
    },
  },
}));
