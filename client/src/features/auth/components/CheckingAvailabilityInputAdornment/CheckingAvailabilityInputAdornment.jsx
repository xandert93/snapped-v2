import { CircularProgress, Fade, InputAdornment } from '@material-ui/core';

import { CheckIcon, ErrorIcon, Icon } from '../../../../components';

import useStyles from './styles';

export const CheckingAvailabilityInputAdornment = ({ isChecking, hasErr, isAvailable }) => {
  const classes = useStyles();
  return (
    <InputAdornment position="end">
      <Fade in={isChecking || hasErr || isAvailable} timeout={300}>
        {hasErr ? (
          <Icon variant="h5" component={ErrorIcon} className={classes['error-icon']} />
        ) : isAvailable ? (
          <Icon variant="h5" component={CheckIcon} className={classes['success-icon']} />
        ) : (
          <CircularProgress size="1.4em" />
        )}
      </Fade>
    </InputAdornment>
  );
};
