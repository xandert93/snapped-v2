import { makeStyles } from '@material-ui/core';

export default makeStyles(({ spacing, palette, mixins, shadows, typography }) => ({
  'subscription-create-form': {
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
      width: 200,
      position: 'absolute',
      top: '14px',
      right: '-60px',
      padding: spacing(1, 0),
      transform: 'rotate(35deg)',
      //
      color: '#f5efe4',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
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
    display: 'inline-block',
    ...mixins.gradientColor(palette.primary.main, palette.secondary.main),
  },

  'subscription-feature': {
    padding: 0, // 8px 16px*
  },

  'subscription-price': {
    fontWeight: 'bold',
  },
}));
