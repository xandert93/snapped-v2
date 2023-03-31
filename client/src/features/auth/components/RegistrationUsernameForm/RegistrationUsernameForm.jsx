import { AuthForm } from '../AuthForm';

import { useRegistrationCredential } from '../../hooks';
import { CheckAvailabilityInput } from '../CheckAvailabilityInput';
import { FormTitle } from '..';

export const RegistrationUsernameForm = (props) => {
  const [username, handleChange] = useRegistrationCredential('username');

  const handleSubmit = () => props.onSubmit({ username });

  return (
    <AuthForm onSubmit={handleSubmit}>
      <FormTitle children="Create a unique username" />
      <CheckAvailabilityInput
        name="username"
        label="Username"
        minLength={6}
        value={username}
        onChange={handleChange}
        autoFocus
      />
    </AuthForm>
  );
};
