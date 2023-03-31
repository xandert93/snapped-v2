import { Box, Grid, Paper } from '@material-ui/core';

import { AppHeading, AppLogo } from '../../../../components';

import { ThemeSwitch } from '../../../../features/ui/components';

import useStyles from './styles';

// props => { children }
export const AuthPaper = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      spacing={3}
      component={Paper}
      className={classes['auth-paper']}
      elevation={10}>
      <Box className={classes['theme-switch-box']}>
        <ThemeSwitch />
      </Box>

      <Grid item container justifyContent="center">
        <AppLogo className={classes['auth-logo-image']} />
      </Grid>

      <Grid item>
        <AppHeading variant="h3" />
      </Grid>

      <Grid item container justifyContent="center" spacing={2}>
        {children}
      </Grid>
    </Grid>
  );
};
