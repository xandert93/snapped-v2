import { Button, DialogContent, DialogContentText, Fade } from '@material-ui/core';

// import useStyles from './styles';
import { DialogHeader, DialogTitle } from '../../../../components/Dialog';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/auth-actions';

export const SessionExpiredDialog = (props) => {
  // const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(logout.fulfilled({ message: 'Logged out' }));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle children="Session Expired" />
      </DialogHeader>
      <Fade in>
        <DialogContent>
          <DialogContentText variant="h6" children="Unable to process request..." />
          <DialogContentText
            variant="h6"
            chilren="Your session has expired. Please log in again."
          />
          <Button onClick={handleClick} children="Ok" />
        </DialogContent>
      </Fade>
    </>
  );
};
