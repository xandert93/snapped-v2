import { Fade } from '@material-ui/core';
import { CenteredGrid } from '../../../../components';

import useStyles from './styles';

export const AuthMain = ({ children }) => {
  const classes = useStyles();

  return (
    <Fade in timeout={1200}>
      <CenteredGrid component="main" className={classes['auth-main']}>
        {children}
      </CenteredGrid>
    </Fade>
  );
};
