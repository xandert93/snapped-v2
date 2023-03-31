import { Button, Grid, Typography } from '@material-ui/core';
import { RetryIcon } from '../../Icons';

export const RetryRequest = ({ message, callback }) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid item>
        <Typography variant="subtitle2" component="p" children={message} />
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={callback} children={<RetryIcon />} />
      </Grid>
    </Grid>
  );
};
