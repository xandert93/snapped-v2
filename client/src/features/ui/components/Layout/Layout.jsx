import { useDispatch, useSelector } from 'react-redux';

import { ScrollListener } from '../ScrollListener';
import { BackToTopFAB } from '../BackToTopFAB';
import { Navigation } from '../Navigation';
import { DropDownManager } from '../DropDownManager';
import { DialogManager } from '../DialogManager';
import { ConfirmDialog } from '../ConfirmDialog';

import { selectIsLoggedIn } from '../../../user/state/user-selectors';
import { SnapUploader } from '../../../snap/components';
import {
  fetchNotifications,
  fetchUnseenNotificationCount,
} from '../../../notification/state/notification-actions';
import { fetchBasket } from '../../../commerce/basket/state/basket-actions';
import { openLoginDialog } from '../../../auth/state/auth-actions';
import { useEffect } from 'react';

export const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return !isLoggedIn ? children : <ProtectedLayout>{children}</ProtectedLayout>;
};

const ProtectedLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnseenNotificationCount());
    dispatch(fetchNotifications());
    dispatch(fetchBasket());
    setTimeout(dispatch, 500, openLoginDialog());
  }, []);

  return (
    <>
      <Navigation />
      <ScrollListener />
      <DropDownManager />
      <DialogManager />
      <ConfirmDialog />
      {children}
      <BackToTopFAB />
      <SnapUploader />
    </>
  );
};

/*
1) Having <SnapUploader> here allows user to change pages while upload takes place
   without having <SnapUploader> removed from DOM

*/
