import { createSlice } from '@reduxjs/toolkit';
import { createSnap } from './snap-actions';

const initialState = {
  isPosting: false,
  previewURLs: [], // base64-encoded Strings (data URLs)
  files: [],
  newSnap: null,
  progress: 0,
};

const snapUploadSlice = createSlice({
  name: 'snap-upload',
  initialState,

  reducers: {
    openSnapUploader(state, action) {
      const newSnap = action.payload;

      state.isPosting = true;
      state.newSnap = newSnap;
    },

    setPreviewURLs(state, action) {
      const previewURLs = action.payload;

      state.previewURLs = previewURLs;
    },
    setSnapFiles(state, action) {
      const files = action.payload;

      state.files = files;
    },
    setSnapUploadProgress(state, action) {
      const progress = action.payload;

      state.progress = progress;
    },
    clearSnapUpload: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(createSnap.fulfilled, (state, action) => {
      state.isPosting = false; // makes <SnapUploader> transition out of DOM & `onExited` called, executing `clearSnapUpload` cleanup
    });
    builder.addCase(createSnap.rejected, (state, action) => {
      state.isPosting = false;
    });
  },
});

export const {
  openSnapUploader,
  setPreviewURLs,
  setSnapFiles,
  setSnapUploadProgress,
  clearSnapUpload,
} = snapUploadSlice.actions;

export default snapUploadSlice.reducer;

/*
1) normalising `[]` returns `{}`, which is not the { snaps: { ids, entities }, comments: { ids, entities } }
that the `fetchSnaps.fulfilled` case reducers expect. These case reducers will throw errors otherwise as `snaps`
and `comments` will both return `undefined`, which `createEntityAdapter`'s methods cannot work with (needs to be
an Array or Object). I've assigned both `[]` in `fetchSnaps.fulfilled`.

*/
