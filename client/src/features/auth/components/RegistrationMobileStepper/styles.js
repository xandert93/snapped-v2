import { makeStyles } from '@material-ui/core';
import { pulsate } from '../../../../theme/animations/pulsate-animation';

export default makeStyles((theme) => ({
  mobileStepper: {
    background: theme.palette.background.paper,
  },

  progressBox: {
    // width: '70%',
    borderRadius: theme.shape.borderRadius * 4,
    height: theme.spacing(0.75),
  },

  ...pulsate(theme.palette, 'backgroundColor'),
  progress: {
    animation: '$pulsate 3s linear infinite alternate',
    borderRadius: theme.shape.borderRadius * 4,
  },
}));
