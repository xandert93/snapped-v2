import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../../../constants/routing-constants';
import { useInput, useURLParams } from '../../../../hooks';
import { resetPassword } from '../../state/auth-actions';

import { PasswordsForm } from '../PasswordsForm';
import { AuthSubmitButton } from '../AuthSubmitButton';

export const PasswordResetForm = () => {
  const { userId, authCode } = useURLParams();
  const history = useHistory();
  const redirectToLogin = () => history.replace(PATHS.LOGIN);

  const dispatch = useDispatch();

  const { value: password1, onChange: handlePassword1Change } = useInput();
  const { value: password2, onChange: handlePassword2Change } = useInput();

  const handleSubmit = async () => {
    const credentials = {
      userId,
      authCode,
      password: password1,
      passwordConfirm: password2,
    };

    await dispatch(resetPassword(credentials));
    redirectToLogin(); // irrespective of success/failure, redirect to LoginPage
  };

  return (
    <>
      <PasswordsForm
        onSubmit={handleSubmit}
        {...{ password1, password2, handlePassword1Change, handlePassword2Change }}
      />
      <AuthSubmitButton form="auth-form" children="Confirm" />
    </>
  );
};
