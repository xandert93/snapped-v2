import { Grid, Typography } from '@material-ui/core';

import { Alert } from '@material-ui/lab';
import useStyles from './styles';

export const EmailWarningAlert = (props) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Alert
        variant="standard"
        severity="warning"
        color="error"
        elevation={0}
        children={
          <Typography variant="body2" className={classes.warning} children={props.children} />
        }
      />
    </Grid>
  );
};

//<Alert> inherits <Paper>...
