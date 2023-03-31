import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { disableForm, enableForm } from '../../../ui/state/ui-slice';
import { validatePasswords } from '../../../../utils/validators/credential-validators';

import { AuthForm } from '../AuthForm';
import { Password1Input } from '../Password1Input';
import { Password2Input } from '../Password2Input';
import { FormTitle } from '../FormTitle';

const MIN_LENGTH = 6;

export const PasswordsForm = (props) => {
  const { password1, password2, handlePassword1Change, handlePassword2Change } = props;
  const dispatch = useDispatch();

  const { areValid, areMatching } = validatePasswords(password1, password2, MIN_LENGTH);

  useEffect(() => {
    dispatch(areValid ? enableForm() : disableForm());
  }, [password1, password2]);

  return (
    <AuthForm onSubmit={props.onSubmit}>
      <FormTitle children="Think of something strong 🔐" />
      <Password1Input value={password1} onChange={handlePassword1Change} />
      <Password2Input
        value={password2}
        onChange={handlePassword2Change}
        areMatching={areMatching}
      />
    </AuthForm>
  );
};
