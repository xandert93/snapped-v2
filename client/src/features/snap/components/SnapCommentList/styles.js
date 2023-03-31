import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  'comment-avatar': {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },

  'delete-comment-button': {
    display: 'none',
    fontSize: '1rem',
    marginLeft: theme.spacing(0.5),
    verticalAlign: -4,
  },

  comment: {
    '&:hover $delete-comment-button': {
      display: 'initial',
    },
  },
}));
