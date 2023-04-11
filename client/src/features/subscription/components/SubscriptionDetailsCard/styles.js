import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette, mixins }) => ({
  'subscription-name': {
    ...mixins.gradientColor(palette.primary.main, palette.secondary.main),
  },
}));
