import { PasswordInput } from '../PasswordInput';
import { PasswordStrengthIndicator } from './components';

// receives { value, onChange }
export const Password1Input = (props) => {
  const password = props.value;

  return (
    <PasswordInput
      name="password"
      label="Password"
      {...props}
      helperText={<PasswordStrengthIndicator password={password} />} //renders within Box
    />
  );
};
