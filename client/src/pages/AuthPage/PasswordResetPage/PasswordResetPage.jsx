import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@material-ui/core';

import { useMountEffect, useSetDocumentTitle, useURLParams } from '../../../hooks';
import { PasswordResetForm } from '../../../features/auth/components';
import { verifyPasswordResetCredentials } from '../../../features/auth/state/auth-actions';
import { PATHS } from '../../../constants/routing-constants';

export const PasswordResetPage = () => {
  useSetDocumentTitle('Reset Password');

  const { userId, authCode } = useURLParams();
  const history = useHistory();
  const redirectToLogin = () => history.replace(PATHS.LOGIN);

  const dispatch = useDispatch();

  const [isValidating, setIsValidating] = useState(true);

  useMountEffect(() => {
    (async () => {
      try {
        await dispatch(verifyPasswordResetCredentials({ userId, authCode })).unwrap();
        setIsValidating(false); // basically says "show <PasswordResetForm>"
      } catch {
        redirectToLogin();
      }
    })();
  });

  return isValidating ? (
    <Box p={3}>
      <CircularProgress thickness={4} size={50} />
    </Box>
  ) : (
    <PasswordResetForm />
  );
};
