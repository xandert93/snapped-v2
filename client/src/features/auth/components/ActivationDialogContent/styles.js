import { alpha, makeStyles } from '@material-ui/core';
import { pulsate } from '../../../../theme/animations/pulsate-animation';

export default makeStyles((theme) => ({
  dialogContent: {
    '& .MuiDialogContentText-root:last-of-type': {
      marginBottom: 0,
    },
  },

  ...pulsate(theme.palette, 'fill'),
  'email-icon': {
    animation: '$pulsate 5s linear infinite alternate',
  },

  email: {
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  emailCorrection: {
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius * 2,
    background: alpha(theme.palette.primary.main, 0.3),
  },
}));
