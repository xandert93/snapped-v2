import useStyles from './styles';

import { Snackbar as MuiSnackbar, Grow, useMediaQuery } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { isVPMaxSm } from '../../../../theme/media-queries';
import { closeSnackbar, selectSnackbar } from '../../state';

export const Snackbar = () => {
  const isMaxSm = useMediaQuery(isVPMaxSm);
  const dispatch = useDispatch();

  const { isOpen, type, message } = useSelector(selectSnackbar);
  const isRequesting = type === 'info';

  const handleClose = !isRequesting ? () => dispatch(closeSnackbar()) : null; //<Snackbar> cannot be dismissed if type === "info"

  const isObject = typeof message === 'object';
  const classes = useStyles();
  return (
    <MuiSnackbar
      key={type}
      className={classes.snackbar}
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: isMaxSm ? 'center' : 'left' }} //at ~400px, "horizontal" alignment ignored and Snackbar is entire screen width
      autoHideDuration={!isRequesting ? 7000 : Infinity}
      onClose={handleClose} // clickaway
      // TransitionComponent={Grow*}
    >
      <Alert
        severity={type} //determines icon used + snackbar color
        onClose={handleClose} //if provided and no "action" button prop specified, displays <CloseIcon /> as action button
      >
        {!isObject ? (
          message
        ) : (
          <>
            <AlertTitle>{message.title}</AlertTitle>
            {message.text}
          </>
        )}
      </Alert>
    </MuiSnackbar>
  );
};

/*

While the <Snackbar> can also accept basic "message=node" and "action=node" props, today's API
recommends instead applying these to a <SnackbarContent /> child. We can also provide a custom 
child, as above.

I have provided the <Snackbar> with a "key" prop, passing in the "type". This is particularly 
useful when we need to display the <Snackbar> multiple times in quick succession. For example, 
when account activation is link is being checked, isOpen=true, displaying the "info" version. 
Once checked, we then want to show the "success" or "error" version, however, given that the 
<Snackbar> is already mounted, the "autoHideDuration" and the "onClose" call will apply to the 
entire cycle. So, if the link check takes 5 seconds to complete, the "success" or "error" version
will only display for 2 seconds which is clearly sub-optimal. Similarly, if the client had manually
closed the <Snackbar> during the check, it will not display again when the "success" or "error" version
is meant to be showing. Setting a dynamic "key" prop ensures that the autoHideDurations + onClose calls 
are independent of the "type".

According to documentation, <Alert> child should be wrapped in a MUI5 <Stack> component. 
Check it out later. Might do away with the gutterBottom on the title.


*/
