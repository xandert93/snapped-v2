import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette }) => ({
  'app-heading': {
    fontWeight: 700,
    letterSpacing: 3,
    backgroundImage: `linear-gradient(135deg, ${palette.secondary.light}, ${palette.primary.light})`,
    color: 'transparent',
    '-webkit-background-clip': 'text',
  },
}));
