import { Box, Fade, LinearProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../state/user-selectors';
import { AppLogo } from '../../../../components';

import useStyles from './styles';

export const LoadingScreen = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn); // having to do it this way because the appl

  const classes = useStyles({ isLoggedIn });
  return (
    <Fade in timeout={1500}>
      <Box className={classes['loading-screen']}>
        <LinearProgress className={classes['linear-progress']} />
        <AppLogo className={classes['logo-image']} />
      </Box>
    </Fade>
  );
};

/*
1) Having to do it this way because protected pages will have a <TopNavigation> which
   will need to be accounted for in the <LinearProgress>'s position. 

*/
