import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserUsername } from '../../../../../features/user/state/user-selectors';

import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  Search as SearchIcon,
  AmpStories as FeedIcon,
  LocalMall as ShopIcon,
} from '@material-ui/icons';

import useStyles from './styles';

import { useHistory, useRouteMatch } from 'react-router-dom';

import { PATHS } from '../../../../../constants/routing-constants';
import { genProfilePath } from '../../../../../utils/routing-utils';

import { AuthUserAvatar } from '../../../../user/components';

import clsx from 'clsx';

export const BottomNavigation = () => {
  const username = useSelector(selectUserUsername('auth'));

  const history = useHistory();
  const match = useRouteMatch({ path: [PATHS.EXPLORE, PATHS.SHOP, PATHS.PROFILE, PATHS.HOME] });

  const pathToPathname = {
    [PATHS.HOME]: '/',
    [PATHS.EXPLORE]: '/explore',
    [PATHS.SHOP]: '/products',
    [PATHS.PROFILE]: genProfilePath(username),
  };

  const [value, setValue] = useState(match && pathToPathname[match.path]);

  // when client clicks on <BottomNavigationAction>
  const handleClick = (e, pathname) => {
    // without `value` prop, 2nd arg (`pathname`) returns the index of the clicked <BottomNavigationAction>
    setValue(pathname);
    history.push(pathname);
  };

  // when client navigates
  useEffect(() => {
    if (match) setValue(pathToPathname[match.path]);
  }, [match]);

  const classes = useStyles();
  return (
    <MuiBottomNavigation
      className={clsx(classes['bottom-nav'], 'mui-fixed')}
      value={value}
      onChange={handleClick}>
      <BottomNavigationAction icon={<FeedIcon />} value="/" />
      <BottomNavigationAction icon={<SearchIcon />} value="/explore" />
      {/* <BottomNavigationAction icon={<ShopIcon />} value="/products" /> */}
      <BottomNavigationAction
        icon={<AuthUserAvatar border hover />}
        value={genProfilePath(username)}
      />
    </MuiBottomNavigation>
  );
};

/*

*Ideally*, when application loads, the matched <Route>'s `path` is read using `useRouteMatch()` 
and used to determine the initial `value` value to be passed to `MuiBottomNavigation`. If
any <BottomNavigationAction>s have a matching `value` prop, that one receives a `.Mui-selected`
class, giving it some styling to show that it's active. Similarly, whenever the client navigates
the application, if any path matches one of the 4 above, we can get it to show an active
<BottomNavigationAction> too.
*/
