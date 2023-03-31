import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectSelectedSnapId } from './snap-selectors';

import { selectSnapCount } from './snap-slice';
import { setPreviewURLs, setSnapFiles, setSnapUploadProgress } from './snap-upload-slice';
import { getSnapsRequest } from '../api/snap-api';

import { DIALOGS } from '../../../constants/modal-constants';
import { validateImageFile } from '../../../utils/validators/file-validators';
import { openErrorSnackbar } from '../../snackbar/state';

import { openDialog } from '../../ui/state/ui-slice';

import { genUploadConfig } from '../../../utils/api/api-utils';

import { snapAPI, snapCommentAPI } from '../api';
import { selectSnapFiles } from './snap-upload-selectors';

export const fetchSnaps = createAsyncThunk('snap/fetchSnaps', async (config, { getState }) => {
  const offset = selectSnapCount(getState());
  const request = getSnapsRequest(config);

  return await request(offset); // => { hasMore, snaps }
});

const MAX_IMAGE_COUNT = 5;

export const handleFileSelection = (fileList) => async (dispatch, getState) => {
  const files = [...fileList]; // => Array (that we can map over)

  if (files.length > MAX_IMAGE_COUNT) {
    return dispatch(openErrorSnackbar(`Please select up to ${MAX_IMAGE_COUNT} images`));
  }

  // 1

  const previewURLPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);

      validateImageFile(file); // throws { message, title } if invalid
      reader.readAsDataURL(file);
    });
  });

  try {
    const previewURLs = await Promise.all(previewURLPromises); // rejects if any of the promises call `throw` or call `reject`

    dispatch(setPreviewURLs(previewURLs));
    dispatch(setSnapFiles(files));

    dispatch(openDialog(DIALOGS.SNAP_CREATE));
  } catch (message) {
    dispatch(openErrorSnackbar(message));
  }
};

export const createSnap = createAsyncThunk(
  'snap/createSnap',
  async (body, { getState, dispatch }) => {
    const files = selectSnapFiles(getState());

    const formData = new FormData();
    files.forEach((file) => formData.append('snap-image', file));
    formData.append('snap-body', JSON.stringify(body)); // 2

    const progressHandler = (progress) => dispatch(setSnapUploadProgress(progress));
    const uploadConfig = genUploadConfig(progressHandler);

    return await snapAPI.create(formData, uploadConfig); // => { message, snap }
    // 3
  }
);

export const updateSnap = createAsyncThunk('snap/updateSnap', snapAPI.update);

export const toggleSnapLike = createAsyncThunk('snap/toggleSnapLike', snapAPI.toggleLike);

export const deleteSnap = createAsyncThunk('snap/deleteSnap', async (arg, { getState }) => {
  const id = selectSelectedSnapId(getState());

  return await snapAPI.remove(id); // => { message }
});

export const createSnapComment = createAsyncThunk(
  'snap-comment/createSnapComment',
  snapCommentAPI.create
);

export const deleteSnapComment = createAsyncThunk(
  'snap-comment/deleteSnapComment',
  snapCommentAPI.remove
);

/* 

1) Might want to consider some `loading` state here. Since I'll allow users to upload image of
   max 12MB, if a user on a low GPU device tried 3 x 12MB in one go, it'd take a 5s or more
   for the reader to read all files. In that time, the user should have some feedback.

2) formData.append() only allows us to append Files or Strings. Anything else is converted to String.
   So, stringify body=Obj here and parse on server

3) Once CSR pages working add in:

  const username = selectAuthUserUsername(getState())
  const page = history.location.pathname

  switch(true) {
    case (page !== PATHS.HOME && snap.isPublic: 
      history.push(PATHS.HOME);
      break;
    case (page === PATHS.HOME && snap.isPublic: 
      scrollToTop(); //doesn't work
      break;
    case (page !== `/${username}/private` && !snap.isPublic)
      history.push(`/${username}/private`);
  } 

4) maybe add:
   dispatch(openSnackbar({ type: 'info', message: 'Snap updating...' })); 
   or modal blocker? - need to block attempts to update multiple snaps at same time with current system. 
  This because, when user is updating 1, when they click to update 2, when update one dispatches "UPDATED" to reducer, 
  the case will use the 2nd selectedSnap._id which is wrong.
 
*/
