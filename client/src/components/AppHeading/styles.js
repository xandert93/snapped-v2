import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, mixins }) => ({
  'app-heading': {
    letterSpacing: 3,

    ...mixins.gradientColor(palette.secondary.light, palette.primary.light),
  },
}));
