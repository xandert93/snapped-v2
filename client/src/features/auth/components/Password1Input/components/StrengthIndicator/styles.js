import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'progress-box': {
    backgroundColor: theme.palette.text.disabled,
    marginTop: theme.spacing(1),
    borderRadius: theme.shape.borderRadius * 3,
    height: theme.spacing(1),
  },

  progress: {
    borderRadius: theme.shape.borderRadius * 4,
    backgroundColor: ({ color }) => color,
  },

  'helper-text': {
    marginTop: theme.spacing(0.75),
  },

  'strength-message': {
    fontWeight: 'bold',
    color: ({ color }) => color,
  },
}));
