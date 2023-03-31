import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'socket-snaps-button': {
    position: 'fixed',
    top: theme.spacing(12),
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1200,
  },
}));
