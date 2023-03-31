import { useDispatch } from 'react-redux';
import { useMountEffect, useURLParams } from '../../hooks';
import { activateAccount } from '../../features/auth/state/auth-actions';
import { LoginRedirect } from '../../components';

export const ActivationPage = () => {
  const { userId, authCode } = useURLParams();

  const dispatch = useDispatch();
  useMountEffect(() => {
    if (!userId || !authCode) return;

    dispatch(activateAccount({ userId, authCode, message: 'Checking your activation link' }));
  });

  return <LoginRedirect />; // 1
};

/*
1) Redirect to LoginPage while activating, so that once activated, they can login immediately.
However, if client is already logged in, this redirect will then redirect to HomePage instead.
This is also fine.

*/
