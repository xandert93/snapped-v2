import { makeStyles } from '@material-ui/core';

export default makeStyles(({ spacing }) => ({
  'flex-box': {
    gap: ({ gap }) => spacing(gap),
  },
}));
