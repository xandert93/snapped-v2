import { makeStyles } from '@material-ui/core';
import { isVPMaxSm } from '../../../../theme/media-queries';

export default makeStyles((theme) => ({
  'suggested-users-card': {
    [isVPMaxSm]: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
  },
}));
