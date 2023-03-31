import { Redirect } from 'react-router-dom';
import { PATHS } from '../../constants/routing-constants';

export const LoginRedirect = () => {
  return <Redirect to={PATHS.LOGIN} />;
};
