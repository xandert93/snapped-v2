import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  login,
  logout,
  register,
  requestPasswordReset,
  rerequestActivationEmail,
  resetAuthForm,
  resetPassword,
  verifyPasswordResetCredentials,
} from '../../../features/auth/state/auth-actions';

import {
  deleteAuthUser,
  updateAuthUserDetails,
  updateAuthUserProfile,
} from '../../../features/user/state/user-actions';

import { deleteSnap } from '../../../features/snap/state';

const checkIsDarkMode = () => JSON.parse(localStorage.getItem('isDarkMode')) || false;

const initialState = {
  isDarkMode: checkIsDarkMode(),

  //only one <form> in UI at a time. "isFormDisabled" (because of bad data, unchecked box etc.) determines if submittable or not
  isFormDisabled: false,
  isRequesting: false,

  //dialog...rename to isDialogOpen?
  dialogId: '',
  isDialogOpen: false,

  //want it to be usable on top of dialogs --> must have own "isOpen" state
  confirmDialogId: '',
  isConfirmDialogOpen: false,

  isDrawerOpen: false,

  /*
  initially thought that dialog + dropdown will never both be in the viewport, so began to think that
  "dialogId" and "dropDownId" could be merged into "activeModalId" (since both inherit from the <Modal>, makes sense).
  However, I do in fact expect there to be occasions where I want the dropdown to display on top of a dialog
  */
  dropDownId: '',
  anchorEl: null, //acts as "isDropDownOpen"

  //scroll
  isScrolledDown: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      const isDarkMode = !state.isDarkMode;

      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
      state.isDarkMode = isDarkMode;
    },

    //rename to setIsFormInvalid? or isFormErr? - for readability, created a separate action. Double negatives e.g. disableForm(false) might be confusing
    enableForm(state) {
      state.isFormDisabled = false;
    },
    disableForm(state) {
      state.isFormDisabled = true;
    },

    startRequest(state) {
      state.isRequesting = true;
    },
    endRequest(state) {
      state.isRequesting = false;
    },

    // toggleDialog: (state, { payload: { dialogType, bool } }) => {
    //   state[dialogType] = typeof bool === 'boolean' ? bool : !state[dialogType];
    // },
    openDialog(state, action) {
      const id = action.payload;

      state.dialogId = id;
      state.isDialogOpen = true;
    },
    closeDialog(state) {
      state.isDialogOpen = false;
    },

    openConfirmDialog(state, action) {
      const id = action.payload;

      state.confirmDialogId = id;
      state.isConfirmDialogOpen = true;
    },
    closeConfirmDialog(state) {
      state.isConfirmDialogOpen = false;
    },

    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },

    openDropDown(state, action) {
      const { id, element } = action.payload;

      state.dropDownId = id;
      state.anchorEl = element;
    },
    closeDropDown(state) {
      state.anchorEl = initialState.anchorEl;
    },

    toggleScrollDown(state) {
      state.isScrolledDown = !state.isScrolledDown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {
        state.isDarkMode = checkIsDarkMode();
      })
      .addCase(resetAuthForm, (state, action) => {
        state.isRequesting = false;
        state.isFormDisabled = false;
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          logout.pending,
          rerequestActivationEmail.pending,
          requestPasswordReset.pending,
          verifyPasswordResetCredentials.pending,
          updateAuthUserProfile.pending,
          resetPassword.pending,
          deleteSnap.pending,
          deleteAuthUser.pending
        ),
        (state, action) => {
          state.isRequesting = true;
        }
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          register.rejected,
          login.fulfilled,
          login.rejected,
          logout.fulfilled,
          logout.rejected,
          rerequestActivationEmail.fulfilled,
          rerequestActivationEmail.rejected,
          requestPasswordReset.fulfilled,
          requestPasswordReset.rejected,
          verifyPasswordResetCredentials.fulfilled,
          updateAuthUserProfile.fulfilled,
          updateAuthUserProfile.rejected,
          deleteSnap.fulfilled,
          deleteSnap.rejected,
          deleteAuthUser.rejected
        ),
        (state, action) => {
          state.isRequesting = false;
        }
      )
      .addMatcher(isAnyOf(requestPasswordReset.fulfilled), (state, action) => {
        state.isFormDisabled = true;
      })
      .addMatcher(isAnyOf(deleteSnap.fulfilled, deleteSnap.rejected), (state, action) => {
        state.isConfirmDialogOpen = false;
        state.confirmDialogId = ''; // 1
      })
      .addMatcher(isAnyOf(updateAuthUserProfile.fulfilled), (state, action) => {
        state.isDialogOpen = false;
      });
  },
});

export const {
  toggleDarkMode,
  enableForm,
  disableForm,
  startRequest,
  endRequest,
  openDialog,
  closeDialog,
  openConfirmDialog,
  closeConfirmDialog,
  toggleDrawer,
  openDropDown,
  closeDropDown,
  toggleScrollDown,
} = uiSlice.actions;

export default uiSlice.reducer;

/*
1) as per <ConfirmDialog> logic, ensures that it unmounts immediately (violent)
*/
