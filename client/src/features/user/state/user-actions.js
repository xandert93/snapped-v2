import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../api';

import { selectRegistrationCredentials } from '../../auth/state/auth-selectors';
import { logout } from '../../auth/state/auth-actions';

export const fetchProfileUser = createAsyncThunk('users/fetchProfileUser', userAPI.getByUsername); // 2

export const updateAuthUserDetails = createAsyncThunk(
  'users/updateAuthUserDetails',
  async (arg, { getState }) => {
    const { firstName, lastName, username, email } = selectRegistrationCredentials(getState());

    return await userAPI.update({ firstName, lastName, username, email }); // => { message, user, accessToken }
  }
);

export const toggleFollow = createAsyncThunk('users/toggleFollow', userAPI.toggleFollow);

export const updateAvatar = createAsyncThunk('users/updateAvatar', async ({ file }) => {
  const formData = new FormData();
  formData.append('avatar-image', file);

  return await userAPI.updateAvatar(formData); // => { message, avatarId, accessToken }
});

export const resetAvatar = createAsyncThunk(
  'users/resetAvatar',
  userAPI.resetAvatar // => { message, avatarId, accessToken }
);

export const updateAuthUserProfile = createAsyncThunk(
  'users/updateAuthUserProfile',
  userAPI.updateProfile // => { message, profile }
);

export const deleteAuthUser = createAsyncThunk(
  'users/deleteAuthUser',
  async (arg, { getState, dispatch }) => {
    const message = await userAPI.remove(); // => { message }
    await dispatch(logout());

    return message;
  }
);

/* 1) Thus, if any tokenUser fields get updated, we need to issue new tokens. Similarly, protected endpoints 
      decode the AT on each request and uses decoded `tokenUser` a lot! 
      For example, in `createSnap` and when creating notifications.
*/
