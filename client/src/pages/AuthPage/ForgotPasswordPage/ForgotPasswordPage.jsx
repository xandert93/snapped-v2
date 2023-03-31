import { useSetDocumentTitle } from '../../../hooks';

import { requestPasswordReset } from '../../../features/auth/state/auth-actions';
import { AuthForm, AuthSubmitButton } from '../../../features/auth/components';
import { useDispatch } from 'react-redux';
import { Input } from '../../../components';
import { useRef } from 'react';

export const ForgotPasswordPage = () => {
  useSetDocumentTitle('Request Reset');
  const dispatch = useDispatch();

  const inputRef = useRef();

  const handleSubmit = () => {
    const email = inputRef.current.value;
    dispatch(requestPasswordReset(email));
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      <Input ref={inputRef} type="email" name="email" label="Email address" autoFocus />
      <AuthSubmitButton children="Request Reset" />
    </AuthForm>
  );
};
