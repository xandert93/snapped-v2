import { useRegistrationCredential } from '../../hooks';
import { PasswordsForm } from '../PasswordsForm';

export const RegistrationPasswordsForm = (props) => {
  const [password1, handlePassword1Change] = useRegistrationCredential('password');
  const [password2, handlePassword2Change] = useRegistrationCredential('passwordConfirm');

  const handleSubmit = () => props.onSubmit({ password: password1, passwordConfirm: password2 });
  return (
    <PasswordsForm
      onSubmit={handleSubmit}
      {...{ password1, password2, handlePassword1Change, handlePassword2Change }}
    />
  );
};
