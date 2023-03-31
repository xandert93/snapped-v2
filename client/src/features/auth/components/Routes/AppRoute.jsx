import { useSelector } from 'react-redux';

import { Route } from 'react-router-dom';
import { HomeRedirect, LoginRedirect } from '../../../../components';
import { selectIsLoggedIn } from '../../../user/state/user-selectors';

export const AppRoute = ({ protect, component: Component, ...props }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (protect) return <Route {...props} component={isLoggedIn ? Component : LoginRedirect} />;
  else return <Route {...props} component={isLoggedIn ? HomeRedirect : Component} />;
};
