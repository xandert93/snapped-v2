import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'progress-track': ({ height }) => ({
    borderRadius: theme.shape.borderRadius * 3,
    // backgroundColor: theme.palette.background.paper,

    // border: `2px solid ${theme.palette.text.primary}`,
    // height: theme.spacing(height),
  }),

  'progress-indicator': {
    borderRadius: theme.shape.borderRadius * 3,
    // backgroundColor: ({ color }) => color,
  },
}));
