import { alpha, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'snap-media-counter': {
    position: 'absolute',
    top: '.5rem',
    right: '.5rem',

    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    fontWeight: 'bold',

    borderRadius: 20,
    padding: theme.spacing(0, 1),
  },
}));
