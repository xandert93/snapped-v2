import { makeStyles } from '@material-ui/core';

export default makeStyles(({ spacing, palette, mixins, shadows }) => ({
  'subscription-create-form': {
    padding: spacing(1),
    gap: spacing(2),
  },

  'subscription-create-button': {
    width: '80%',
  },

  'subscription-radio-group': {
    gap: spacing(1),
  },

  'subscription-radio-card': {
    padding: spacing(2, 3),

    overflow: 'hidden',
    position: 'relative',
    '&:last-child::after': {
      content: "'BEST VALUE'",
      position: 'absolute',
      top: '8%',
      right: '-8%',
      padding: spacing(1, 6),
      transform: 'rotate(35deg)',
      //
      color: 'white',
      fontWeight: 'bold',
      backgroundImage: 'linear-gradient(to right, orange, gold, orange)',
      boxShadow: shadows[4],
    },
  },

  'subscription-radio-label': {
    gap: spacing(1),
  },

  'subscription-image': {
    width: '100%',
    display: 'block',
  },

  'subscription-name': {
    ...mixins.gradientColor(palette.primary.main, palette.secondary.main),
  },

  'subscription-price': {
    fontWeight: 'bold',
  },
}));
