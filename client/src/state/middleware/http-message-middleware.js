import { isFulfilled, isRejected } from '@reduxjs/toolkit';
import { reauthenticate } from '../../features/auth/state/auth-actions';
import {
  openSuccessSnackbar,
  openErrorSnackbar,
} from '../../features/snackbar/state/snackbar-slice';

export const httpMessageMiddleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    if (isFulfilled(action)) {
      const { message } = action.payload;
      if (message) dispatch(openSuccessSnackbar(message));
    } else if (
      isRejected(action) &&
      action.type !== reauthenticate.rejected.type
      // && action.error.name !== 'AbortError'
    ) {
      const { name: title, message: text, code, stack } = action.error; // restrictive serialised error from createAsyncThunk
      dispatch(openErrorSnackbar({ title, text }));
    }

    return next(action);
  };
};

/* - I think that, while in our "ui/slice.js", under `extraReducers` we could do: 

    `addMatcher(isRejected, (state, action) => {
      // code which displays error snackbar
    })`

    This would not show 'ui/openSnackbar' in DevTools and would only show 'sliceName/actionName/rejected'
    and we would have to know that that updated UI state that opened that snackbar, in effect.
    
    However, the above approach will show 'ui/openSnackbar' in DevTools, which is clearer for developers.

   - The nature of `reauthenticate` thunk means that "You don't have refresh token" message populates
     action.error.message when `reauthenticate` rejects. Unfortunately, this applies to when an unauthenticated
     user first opens that application. To prevent this error message displaying in the snackbar, I've found
     no other solution than to include that additional check for every rejected action :/.
*/
