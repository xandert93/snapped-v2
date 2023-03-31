import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
      display: 'block',
      '&:first-child': {
        marginTop: theme.spacing(4),
      },
    },
  },
}));
