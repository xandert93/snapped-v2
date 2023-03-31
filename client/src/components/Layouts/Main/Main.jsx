import useStyles from './styles';

import { Container, Fade } from '@material-ui/core';

import clsx from 'clsx';

// props => { children, onDragOver? }
export const Main = ({ className, maxWidth = false, children, ...props }) => {
  const classes = useStyles();

  return (
    <Fade in timeout={2000}>
      <Container
        className={clsx(className, classes.main)}
        component="main"
        maxWidth={maxWidth}
        {...props}>
        {children}
      </Container>
    </Fade>
  );
};
