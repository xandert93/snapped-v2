import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoginRedirect } from '../../../../components';
import { selectIsLoggedIn } from '../../../user/state/user-selectors';

export const ProtectedRoute = ({ component: Component, ...props }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <Route {...props} component={isLoggedIn ? Component : LoginRedirect} />;
};
