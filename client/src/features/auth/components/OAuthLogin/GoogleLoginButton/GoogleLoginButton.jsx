import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import { useState } from 'react';

import { googleLogin } from '../../../state/auth-actions';
import { LoadingButton, GoogleIcon } from '../../../../../components';

export const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const [isRequesting, setIsRequesting] = useState(false);

  const makeRequest = async ({ tokenId }) => {
    setIsRequesting(true);
    await dispatch(googleLogin(tokenId)); // <Snackbar> handles any error message
    setIsRequesting(false);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={({ onClick }) => (
        <LoadingButton
          onClick={onClick}
          variant="text"
          startIcon={<GoogleIcon />}
          isLoading={isRequesting}
          children="Sign in with Google"
        />
      )}
      onSuccess={makeRequest}
    />
  );
};
