import { Box, Grid } from '@material-ui/core';

import useStyles from './styles';

export const ProfileHeaderContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes['profile-header-container']} // 1
    >
      <Grid
        container
        direction="column"
        spacing={1}
        // xs={12} // 2
      >
        {children}
      </Grid>
    </Box>
  );
};

/*
1) Just applies some responsive padding that doesn't interfere with <Grid>'s
spacing

2) recommended hack fix for MUI bug where `spacing` causes overflow. Magically
okay, now though...

*/
