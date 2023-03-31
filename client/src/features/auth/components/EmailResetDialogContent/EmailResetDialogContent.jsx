import { DialogContent, Fade } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon, RotateLeft as ResetIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { updateAuthUserDetails } from '../../../user/state/user-actions';

import { AuthForm } from '../AuthForm';
import { AuthSubmitButton } from '../AuthSubmitButton';
import { RegistrationEmailForm } from '../RegistrationEmailForm';
import { EmailWarningAlert } from './EmailWarningAlert';

import useStyles from './styles';

import { useUpdateEffect } from '../../../../hooks';
import { openDialog } from '../../../ui/state/ui-slice';
import { DIALOGS } from '../../../../constants/modal-constants';
import { DialogHeader, DialogTitle } from '../../../../components';

import { selectAuthUserEmail } from '../../../user/state/user-selectors';
import { DialogCloseButton } from '../../../ui/components';

export const EmailResetDialogContent = () => {
  const dispatch = useDispatch();

  const email = useSelector(selectAuthUserEmail);

  //maybe eventually find a way to do this with routing?
  const goBack = () => dispatch(openDialog(DIALOGS.ACTIVATION));

  useUpdateEffect(goBack, [email]);

  const classes = useStyles();
  return (
    <>
      <DialogHeader>
        <DialogCloseButton Icon={ArrowBackIcon} onClick={goBack} />
        <DialogTitle children="Reset Your Email Address" />
      </DialogHeader>
      <Fade in>
        <DialogContent className={classes.dialogContent}>
          <AuthForm onSubmit={updateAuthUserDetails}>
            <RegistrationEmailForm />
            <EmailWarningAlert children="To reset your email again, you'll need to contact our support team" />
            <AuthSubmitButton>
              Reset <ResetIcon />
            </AuthSubmitButton>
          </AuthForm>
        </DialogContent>
      </Fade>
    </>
  );
};
