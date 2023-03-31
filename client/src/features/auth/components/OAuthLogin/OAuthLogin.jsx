import { Divider, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { PATHS } from '../../../../constants/routing-constants';
import { selectIsRegistering } from '../../state/auth-selectors';

import { FacebookLoginButton } from './FacebookLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';

export const OAuthLogin = () => {
  const { pathname } = useLocation();

  const isRegistering = useSelector(selectIsRegistering);

  if (isRegistering || pathname === PATHS.PASSWORD_RESET) return null;
  else
    return (
      <>
        <OAuthDivider />
        <Grid item>
          <GoogleLoginButton />
        </Grid>
        <OAuthDivider />
        <Grid item>
          <FacebookLoginButton />
        </Grid>
      </>
    );
};

const OAuthDivider = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={4} children={<Divider />} />
      <Grid item xs={2} children={<Typography align="center" children="or" />} />
      <Grid item xs={4} children={<Divider />} />
    </Grid>
  );
};
