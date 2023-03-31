import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { activateAccount, logout } from '../../../features/auth/state/auth-actions';
import { updateAvatar } from '../../../features/user/state/user-actions';
import { updateSnap } from '../../snap/state';

const initialState = {
  isOpen: false,
  type: '',
  message: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(snackbar, action) {
      const { type, message } = action.payload;

      snackbar.isOpen = true;
      snackbar.type = type;
      snackbar.message = message;
    },
    openSuccessSnackbar(snackbar, action) {
      const message = action.payload;

      snackbar.type = 'success';
      snackbar.isOpen = true;
      snackbar.message = message;
    },
    openErrorSnackbar(snackbar, action) {
      const message = action.payload;

      snackbar.type = 'error';
      snackbar.isOpen = true;
      snackbar.message = message;
    },
    closeSnackbar: (snackbar) => {
      snackbar.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (snackbar, action) => {
        const { message } = action.payload;

        snackbar.isOpen = true;
        snackbar.type = 'success';
        snackbar.message = message;
      })
      .addMatcher(
        isAnyOf(activateAccount.pending, updateSnap.pending, updateAvatar.pending),
        (snackbar, action) => {
          const { message } = action.meta.arg;

          snackbar.isOpen = true;
          snackbar.type = 'info'; // hacky, but only way for me to apply a <CircularProgress> at the moment!
          snackbar.message = message + '...'; // maybe find way to persist i.e. type === "info" --> unltd autohide duration + non closable
        }
      );
  },
});

export const { openSnackbar, openSuccessSnackbar, openErrorSnackbar, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;

/* 1) yes, `openSuccessSnackbar` and `openErrorSnackbar` are identical logic, apart from 
`snackbar.type`. While I could just set `snackbar.type` in each then add a match for the
two actions (which would then set `snackbar.isOpen` and `snackbar.message`) this would be
a pain to read. So for now, I'll stick to this logic duplication approach.

*/
