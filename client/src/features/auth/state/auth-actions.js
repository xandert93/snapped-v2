import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { auth } from '../api';
import { DIALOGS } from '../../../constants/modal-constants';
import { selectAuthUser } from '../../../features/user/state/user-selectors';
import { openDialog } from '../../ui/state/ui-slice';
import { selectisActivating } from './auth-selectors';

//RESET AUTH PAGE BETWEEN ROUTE CHANGES
export const resetAuthForm = createAction('auth/resetForm');

export const reauthenticate = createAsyncThunk(
  'auth/reauthenticate',
  auth.reauthenticate // => { accessToken, user } (+ refreshToken in HTTP-only cookie)
);
export const reauthorise = createAsyncThunk(
  'auth/reauthorise',
  auth.reauthorise // => { accessToken } (+ refreshToken in HTTP-only cookie)
);

//<AuthForm onSubmit={() => dispatch(↓↓↓)}/> :
export const register = createAsyncThunk('auth/register', auth.register);
// history.push(PATHS.HOME, { isFromRegistration: true }); //also causes 2nd re-render of <Home/> after automatic state-based redirect

export const login = createAsyncThunk(
  'auth/login',
  auth.login // => { message, user, accessToken }
);
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  auth.googleLogin // => { message, user, accessToken }
);
export const facebookLogin = createAsyncThunk(
  'auth/facebookLogin',
  auth.facebookLogin // => { message, user, accessToken }
);

export const openLoginDialog = () => (dispatch, getState) => {
  const isActivating = selectisActivating(getState());
  const { _isNew, isVerified } = selectAuthUser(getState());

  if (!_isNew) dispatch(openDialog(DIALOGS.WELCOME));
  else if (!isVerified && !isActivating) dispatch(openDialog(DIALOGS.ACTIVATION));
};

export const logout = createAsyncThunk('auth/logout', auth.logout);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  auth.requestPasswordReset // => { message }
);

export const verifyPasswordResetCredentials = createAsyncThunk(
  'auth/verifyPasswordResetCredentials',
  auth.verifyPasswordResetCredentials // => 'OK'
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  auth.resetPassword // => { message }
);

export const rerequestActivationEmail = createAsyncThunk(
  'auth/requestActivationEmail',
  auth.rerequestActivationEmail
);

export const activateAccount = createAsyncThunk(
  'auth/activateAccount',
  auth.activate // => { message, accessToken?, user? } (last two sent back if server establishes that client is logged in)
);
