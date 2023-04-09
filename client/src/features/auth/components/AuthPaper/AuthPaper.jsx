import { Box, Paper } from '@material-ui/core';
import { AppHeading, AppLogo, CenteredGrid } from '../../../../components';
import { ThemeSwitch } from '../../../ui/components';

import useStyles from './styles';

// props => { children }
export const AuthPaper = ({ children }) => {
  const classes = useStyles();

  return (
    <Paper
      className={classes['auth-paper']}
      elevation={10}
      component={CenteredGrid}
      direction="column">
      <Box className={classes['theme-switch-box']}>
        <ThemeSwitch />
      </Box>
      <AppLogo className={classes['auth-logo-image']} />
      <AppHeading variant="h3" />
      <CenteredGrid className={classes['auth-container']}>{children}</CenteredGrid>
    </Paper>
  );
};
