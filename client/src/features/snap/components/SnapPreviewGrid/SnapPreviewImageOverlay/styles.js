import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  overlay: {
    ...theme.mixins.absCover,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    color: 'white',
    opacity: 0,
    transition: theme.transitions.create('opacity'),

    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },
  },
}));
