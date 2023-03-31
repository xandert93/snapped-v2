import { useDispatch, useSelector } from 'react-redux';

import { DialogContent, DialogContentText, Fade, Typography } from '@material-ui/core';
import { Close as CloseIcon, Email as EmailIcon, Refresh } from '@material-ui/icons';

import useStyles from './styles';

import { rerequestActivationEmail } from '../../../../features/auth/state/auth-actions';
import { openDialog } from '../../../ui/state/ui-slice';
import { DIALOGS } from '../../../../constants/modal-constants';
import { DialogHeader, DialogTitle, Link, LinkButton } from '../../../../components';
import { ConnectedLoadingButton, DialogCloseButton } from '../../../ui/components';
import { selectAuthUserEmail, selectAuthUserFirstName } from '../../../user/state/user-selectors';

export const ActivationDialogContent = () => {
  const email = useSelector(selectAuthUserEmail);
  const firstName = useSelector(selectAuthUserFirstName);

  const dispatch = useDispatch();

  const showResetContent = () => dispatch(openDialog(DIALOGS.EMAIL_RESET));
  const handleResendClick = () => dispatch(rerequestActivationEmail());

  const classes = useStyles();
  return (
    <>
      <DialogHeader>
        <DialogCloseButton Icon={CloseIcon} />
        <DialogTitle children="Activate Your Account" />
      </DialogHeader>
      <Fade in>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h1" component={EmailIcon} className={classes['email-icon']} />
          <DialogContentText variant="h6" children={`Welcome, ${firstName}!`} />
          <DialogContentText>
            To make sure you're not some weirdo, you'll first need to activate your account. We've
            sent an activation link to your email address:
          </DialogContentText>
          <DialogContentText className={classes.email} variant="h6" noWrap children={email} />

          <DialogContentText>
            <ConnectedLoadingButton
              onClick={handleResendClick}
              size="small"
              variant="outlined"
              color="secondary"
              startIcon={<Refresh />}>
              Resend Activation Email
            </ConnectedLoadingButton>
          </DialogContentText>
          <DialogContentText children="Please check your inbox for further instructions 🍰" />
          <DialogContentText
            variant="caption"
            color="secondary"
            children="*Disclaimer*: It's okay if you are a weirdo"
          />
          <DialogContentText className={classes.emailCorrection} variant="body2">
            Misspelt your email address? Click{' '}
            <LinkButton onClick={showResetContent} children="here" /> to change it
          </DialogContentText>
        </DialogContent>
      </Fade>
    </>
  );
};

//couldn't get badge to align because of SVG gaps...one for another time
