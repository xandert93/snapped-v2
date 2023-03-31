import { Grid, Typography } from '@material-ui/core';

export const FormTitle = ({ children }) => {
  return (
    <Grid item>
      <Typography
        variant="body1"
        component="h2"
        align="center"
        style={{ fontWeight: 600 }}
        gutterBottom>
        {children}
      </Typography>
    </Grid>
  );
};
