import { AuthForm } from '../AuthForm';

import { RegistrationEmailCheckbox } from './RegistrationEmailCheckbox';

import { useRegistrationCredential } from '../../hooks';
import { CheckAvailabilityInput } from '../CheckAvailabilityInput';
import { FormTitle } from '../FormTitle';

export const RegistrationEmailForm = (props) => {
  const [email, handleChange] = useRegistrationCredential('email');

  const handleSubmit = () => props.onSubmit({ email });

  return (
    <AuthForm onSubmit={handleSubmit}>
      <FormTitle children="How about your email?" />

      <CheckAvailabilityInput
        type="email"
        name="email"
        label="Email address"
        minLength={3}
        value={email}
        onChange={handleChange}
      />
      <RegistrationEmailCheckbox email={email} />
    </AuthForm>
  );
};
