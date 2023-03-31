import { useDispatch, useSelector } from 'react-redux';
import { SwipeableDrawer, MenuList } from '@material-ui/core';
import { toggleDrawer } from '../../state/ui-slice';
import { selectIsDrawerOpen } from '../../state/ui-selectors';

import { NavigationAccountList } from '../NavigationAccountList';

export const SideNavigation = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsDrawerOpen);

  const _toggleDrawer = () => dispatch(toggleDrawer());

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={_toggleDrawer}
      onOpen={_toggleDrawer}
      children={<MenuList onClick={_toggleDrawer} children={<NavigationAccountList />} />}
    />
  );
};
