import { Redirect } from 'react-router-dom';

import { PATHS } from '../../constants/routing-constants';

export const HomeRedirect = () => {
  return <Redirect to={PATHS.HOME} />;
};
