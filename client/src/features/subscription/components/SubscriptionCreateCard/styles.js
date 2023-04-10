import { makeStyles } from '@material-ui/core';

export default makeStyles(({ mixins }) => ({
  'subscription-create-heading': {
    ...mixins.gradientColor('orange', 'gold'),
  },
}));
