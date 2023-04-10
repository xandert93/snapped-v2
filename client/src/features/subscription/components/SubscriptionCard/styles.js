import { makeStyles } from '@material-ui/core';
import { isVPMaxSm } from '../../../../theme/media-queries';

export default makeStyles(({ spacing }) => ({
  'subscription-card': {
    maxWidth: 640,

    padding: spacing(3),
    gap: spacing(2),

    [isVPMaxSm]: {
      padding: spacing(1),
      gap: spacing(1.5),

      borderRadius: 'initial',
      boxShadow: 'initial',
      backgroundColor: 'initial',
    },
  },
}));
