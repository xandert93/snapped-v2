import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';
import { PATHS } from '../../constants/routing-constants';

import { RegistrationPage } from './RegistrationPage';
import { LoginPage } from './LoginPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import { PasswordResetPage } from './PasswordResetPage';

import { AuthMain, AuthPaper, AuthLinks, OAuthLogin } from '../../features/auth/components';

import { resetAuthForm } from '../../features/auth/state/auth-actions';

import { pathnameToLinkData } from './auth-link-data';

export const AuthPage = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetAuthForm()); // 1
  }, [pathname]);

  return (
    <AuthMain>
      <AuthPaper>
        <Switch>
          <Route path={PATHS.REGISTRATION} component={RegistrationPage} />
          <Route path={PATHS.LOGIN} component={LoginPage} />
          <Route path={PATHS.FORGOT_PASSWORD} component={ForgotPasswordPage} />
          <Route path={PATHS.PASSWORD_RESET} component={PasswordResetPage} />
        </Switch>
        <AuthLinks links={pathnameToLinkData[pathname]} />
        <OAuthLogin />
      </AuthPaper>
    </AuthMain>
  );
};

/*

1) execute when the location changes so that <form> state resets on each <AuthPage> change

*/
