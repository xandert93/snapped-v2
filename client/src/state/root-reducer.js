import { combineReducers } from 'redux';

import auth from '../features/auth/state/auth-slice';
import users from '../features/user/state/user-slice'; // importing as `users` since it contains two users

import snap from '../features/snap/state/snap-slice';
import snapUpload from '../features/snap/state/snap-upload-slice';

import commerce from '../features/commerce/commerce-reducer';
import notification from '../features/notification/state/notification-slice';
import ui from '../features/ui/state/ui-slice';
import snackbar from '../features/snackbar/state/snackbar-slice';

import { logout } from '../features/auth/state/auth-actions';

const rootReducer = combineReducers({
  auth,
  users,
  snap,
  'snap-upload': snapUpload,
  commerce,
  notification,
  ui,
  snackbar,
});

export default (state, action) => {
  return rootReducer(action.type === logout.fulfilled.type ? undefined : state, action);
};
