import { Grid } from '@material-ui/core';
import { forwardRef } from 'react';

export const CenteredGrid = forwardRef((props, ref) => {
  return <Grid ref={ref} container justifyContent="center" alignItems="center" {...props} />;
});
