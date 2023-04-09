import { makeStyles } from '@material-ui/core';
import { isVPMaxSm } from '../../../../theme/media-queries';

export default makeStyles(({ spacing, mixins }) => ({
  'subscription-create-card': {
    maxWidth: 640,
    margin: '0 auto',
    padding: spacing(3),
    gap: spacing(2),

    [isVPMaxSm]: {
      boxShadow: 'initial',
      backgroundColor: 'initial',
      padding: 'initial',
      gap: spacing(1.5),
    },
  },

  'subscription-create-app-logo': {
    width: '10%',
  },

  'subscription-create-heading': {
    ...mixins.gradientColor('orange', 'gold'),
  },
}));