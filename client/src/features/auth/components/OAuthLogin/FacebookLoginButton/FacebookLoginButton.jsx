import { useState } from 'react';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'; //enables the "render" prop
import { useDispatch } from 'react-redux';
import { facebookLogin } from '../../../state/auth-actions';

import { LoadingButton, FacebookIcon } from '../../../../../components';

export const FacebookLoginButton = (props) => {
  const dispatch = useDispatch();
  const [isRequesting, setIsRequesting] = useState(false);

  const makeRequest = async ({ accessToken: inputToken, ...userData }) => {
    setIsRequesting(true);
    await dispatch(facebookLogin({ inputToken, userData })); // <Snackbar> handles any error message
    setIsRequesting(false);
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
      fields="email, picture, name"
      // onClick={() => {}}
      // onFailure={() => {}}
      render={({ onClick }) => (
        <LoadingButton
          onClick={onClick}
          variant="text"
          startIcon={<FacebookIcon color="#3460bf" />}
          isLoading={isRequesting}
          children="Sign in with Facebook"
          {...props}
        />
      )}
      callback={makeRequest}
      {...props}
    />
  );
};
