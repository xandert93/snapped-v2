import { Divider, Grid, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { PATHS } from '../../../../constants/routing-constants';
import { selectIsRegistering } from '../../state/auth-selectors';

import { FacebookLoginButton } from './FacebookLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';
import { CenteredGrid } from '../../../../components';

export const OAuthLogin = () => {
  const { pathname } = useLocation();

  const isRegistering = useSelector(selectIsRegistering);

  if (isRegistering || pathname === PATHS.PASSWORD_RESET) return null;
  else
    return (
      <>
        <OAuthDivider />
        <GoogleLoginButton />
        <OAuthDivider />
        <FacebookLoginButton />
      </>
    );
};

const OAuthDivider = () => {
  return (
    <CenteredGrid>
      <Grid item xs={4} children={<Divider />} />
      <Grid item xs={2} children={<Typography align="center" children="or" />} />
      <Grid item xs={4} children={<Divider />} />
    </CenteredGrid>
  );
};
