import { CollapsingCaption } from '../../../../components';
import { PasswordInput } from '../PasswordInput';

// receives { value, onChange, areMatching }
export const Password2Input = ({ areMatching, ...props }) => {
  return (
    <PasswordInput
      name="passwordConfirm"
      label="Confirm your password"
      {...props}
      error={!areMatching}
      helperText={<CollapsingCaption in={!areMatching} text="Passwords do not match" />}
    />
  );
};
