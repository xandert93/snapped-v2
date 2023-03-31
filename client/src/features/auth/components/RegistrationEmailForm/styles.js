import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  helperText: ({ isAvailable }) => ({
    fontWeight: 'bold',
    color: isAvailable ? theme.palette.success.main : theme.palette.error.main,
  }),
}));
