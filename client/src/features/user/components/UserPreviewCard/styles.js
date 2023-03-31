import { makeStyles } from '@material-ui/core';

export default makeStyles(({ shape, palette, spacing }) => ({
  'user-preview-card': {
    cursor: 'pointer',
    borderRadius: shape.borderRadius * 2,

    '&:hover': {
      backgroundColor: palette.background.default,
    },
  },

  'user-preview-card-content': {
    minWidth: 0, // so that when we use "no-wrap", the text truncates: https://css-tricks.com/flexbox-truncated-text/
  },
}));
