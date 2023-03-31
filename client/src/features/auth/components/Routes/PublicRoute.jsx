import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { HomeRedirect } from '../../../../components';
import { selectIsLoggedIn } from '../../../user/state/user-selectors';

export const PublicRoute = ({ component: Component, ...props }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <Route {...props} component={isLoggedIn ? HomeRedirect : Component} />;
};
