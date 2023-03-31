import { makeStyles } from '@material-ui/core';

export default makeStyles(({ palette }) => ({
  'gradient-app-bar': {
    backgroundImage: `linear-gradient(135deg, ${palette.secondary.dark}, ${palette.primary.dark})`,
    color: 'white',
  },
}));
