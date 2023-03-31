import { Box, CircularProgress } from '@material-ui/core';
import { RoundedButton } from '../RoundedButton';

import useStyles from './styles';
import clsx from 'clsx';

export const LoadingButton = ({ children, className, isLoading, ...props }) => {
  const classes = useStyles();

  return (
    <RoundedButton
      className={clsx(className, classes['loading-button'])}
      disabled={isLoading}
      {...props}>
      {children}
      {isLoading && (
        <Box className={classes['circular-progress-container']}>
          <CircularProgress size="1.2em" />
        </Box>
      )}
    </RoundedButton>
  );
};

/*
1) This works well, because depending on the `size` prop we pass to <Button>, the font-size
   adapts accordingly. The <CircularProgress> doesn't have a font-size set, so it inherits 
   this dynamic value from <Button>.

2) Unfortunately, we can't apply the centering via a `transform` on <CircularProgress>, as
   it clashes with it's own `transform`. So we've wrapped it in a <div> and centered that
   instead.
*/
