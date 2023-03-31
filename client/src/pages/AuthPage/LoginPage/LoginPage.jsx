import { useSetDocumentTitle } from '../../../hooks';
import { login } from '../../../features/auth/state/auth-actions';
import { AuthForm, AuthSubmitButton, PasswordInput } from '../../../features/auth/components';
import { Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { validateEmailOrUsername } from '../../../utils/validators/credential-validators';
import { openErrorSnackbar } from '../../../features/snackbar/state';

export const LoginPage = () => {
  useSetDocumentTitle('Login');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const credentials = Object.fromEntries(new FormData(e.target)); // could also use refs but this is more succinct
    const isValid = validateEmailOrUsername(credentials.emailOrUsername); // throws if invalid

    dispatch(
      !isValid ? openErrorSnackbar('Please enter a valid username or email') : login(credentials)
    );
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      <Input name="emailOrUsername" label="Username or Email" autoFocus />
      <PasswordInput name="password" label="Password" />
      <AuthSubmitButton children="Login" />
    </AuthForm>
  );
};
