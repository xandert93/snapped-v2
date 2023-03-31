import { DIALOGS } from '../../../constants/modal-constants';
import { setSelectedSnap, setSelectedSnapById } from '../../snap/state';

import { openDialog } from './ui-slice';

export const openSnapDialogById = (id) => (dispatch) => {
  dispatch(setSelectedSnapById(id));
  dispatch(openDialog(DIALOGS.SELECTED_SNAP));
};

export const openSnapDialog = (snap) => (dispatch) => {
  dispatch(setSelectedSnap(snap));
  dispatch(openDialog(DIALOGS.SELECTED_SNAP));
};

export const openSnapLikesDialog = (id) => (dispatch) => {
  dispatch(setSelectedSnapById(id));
  dispatch(openDialog(DIALOGS.SNAP_LIKES));
};
