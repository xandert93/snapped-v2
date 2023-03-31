import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { updateAuthUserDetails, resetAvatar, updateAvatar } from '../../user/state/user-actions';

import {
  reauthorise,
  facebookLogin,
  googleLogin,
  login,
  logout,
  register,
  activateAccount,
  reauthenticate,
  resetAuthForm,
} from './auth-actions';

const initialCredentialsState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  reCAPTCHAToken: '',
};

const initialState = {
  isActivating: false,
  isAuthenticating: true,
  accessToken: '',
  keepLoggedIn: false,
  registration: {
    stepIndex: 0,
    isDisabled: false,
    credentials: initialCredentialsState,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toNextRegistrationStep(state, action) {
      const newCredentials = action.payload;

      state.registration.credentials = { ...state.registration.credentials, ...newCredentials };
      state.registration.stepIndex++;
    },
    toPrevRegistrationStep(state) {
      state.registration.stepIndex--;
    },

    setRegistrationReCAPTCHAToken(state, action) {
      const token = action.payload;

      state.registration.credentials.reCAPTCHAToken = token;
    },

    toggleKeepLoggedIn(state) {
      state.keepLoggedIn = !state.keepLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetAuthForm, (state, action) => {
        state.registration.credentials = initialCredentialsState;
        state.registration.stepIndex = 0;
      })
      .addCase(activateAccount.pending, (state, action) => {
        state.isActivating = true;
      })
      .addCase(activateAccount.fulfilled, (state, action) => {
        const { accessToken } = action.payload;

        if (accessToken) state.accessToken = accessToken;
        state.isActivating = false;
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.isActivating = false;
      })
      .addMatcher(
        isAnyOf(
          reauthenticate.fulfilled,
          reauthorise.fulfilled,
          register.fulfilled,
          login.fulfilled,
          googleLogin.fulfilled,
          facebookLogin.fulfilled,
          // when fields used in token payload are updated on server:
          updateAuthUserDetails.fulfilled,
          updateAvatar.fulfilled,
          resetAvatar.fulfilled
        ),
        (state, action) => {
          const { accessToken } = action.payload;

          state.accessToken = accessToken;
        }
      )
      .addMatcher(
        isAnyOf(
          reauthenticate.fulfilled,
          reauthenticate.rejected,
          reauthorise.rejected,
          logout.fulfilled
        ),
        (state, action) => {
          state.isAuthenticating = false;
        }
      );
  },
});

export const {
  toNextRegistrationStep,
  toPrevRegistrationStep,
  setRegistrationReCAPTCHAToken,
  toggleKeepLoggedIn,
} = authSlice.actions;

export default authSlice.reducer;
