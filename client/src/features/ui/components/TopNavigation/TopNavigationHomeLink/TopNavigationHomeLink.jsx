import { PATHS } from '../../../../../constants/routing-constants';
import { AppLogo, AppHeading, Link } from '../../../../../components';

import useStyles from './styles';

export const TopNavigationHomeLink = () => {
  const classes = useStyles();

  return (
    <Link to={PATHS.HOME} className={classes['top-navigation-home-link']}>
      <AppLogo className={classes['header-logo-image']} />
      <AppHeading className={classes['header-title']} variant="h4" />
    </Link>
  );
};
