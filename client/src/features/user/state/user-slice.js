import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  facebookLogin,
  googleLogin,
  login,
  register,
  activateAccount,
  reauthenticate,
} from '../../../features/auth/state/auth-actions';
import { createSnap, deleteSnap } from '../../../features/snap/state';

import {
  resetAvatar,
  fetchProfileUser,
  toggleFollow,
  updateAvatar,
  updateAuthUserDetails,
  updateAuthUserProfile,
} from './user-actions';

const initialState = {
  auth: null,
  profile: null,
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (users, action) => {
      const type = action.payload;

      users[type] = initialState[type];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(reauthenticate.fulfilled, (users, action) => {
        const { user } = action.payload;

        users.auth = user;
      })
      .addCase(activateAccount.fulfilled, (users, action) => {
        const { user } = action.payload;

        if (user) users.auth = user;
      })
      .addCase(updateAuthUserProfile.fulfilled, (users, action) => {
        const { profile } = action.payload;

        users.auth.profile = profile;
      })
      .addCase(toggleFollow.fulfilled, (users, action) => {
        const { userId, incValue } = action.meta.arg;
        const profileUserId = users.profile?._id;

        users.auth.followCount += incValue;
        if (userId === profileUserId) {
          users.profile.followerCount += incValue; // updates profile user's header, for example
          users.profile.isFollowed = !users.profile.isFollowed;
        }
      })

      .addCase(createSnap.fulfilled, (users) => {
        users.auth.snapCount++; //*** currently reflects private snap upload too. Should also increment when snap isPublic toggles
      })
      .addCase(deleteSnap.fulfilled, (users) => {
        users.auth.snapCount--;
      })
      .addCase(fetchProfileUser.fulfilled, (users, action) => {
        const { user } = action.payload;

        users.profile = user;
      })

      .addMatcher(isAnyOf(updateAvatar.fulfilled, resetAvatar.fulfilled), (users, action) => {
        const { avatarId } = action.payload;

        users.auth.avatarId = avatarId;
      })
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          login.fulfilled,
          googleLogin.fulfilled,
          facebookLogin.fulfilled,
          updateAuthUserDetails.fulfilled
        ),
        (users, action) => {
          const { user } = action.payload;

          users.auth = user;
        }
      );
  },
});

export const { clearUser } = users.actions;

export default users.reducer;
