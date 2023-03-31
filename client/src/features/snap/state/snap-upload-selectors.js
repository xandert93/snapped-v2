const root = (state) => state['snap-upload'];

export const selectIsSnapPosting = (state) => root(state).isPosting;

export const selectSnapImagePreviewURLs = (state) => root(state).previewURLs;

export const selectFirstSnapImagePreviewURL = (state) => root(state).previewURLs[0];

export const selectSnapFiles = (state) => root(state).files;

export const selectNewSnap = (state) => root(state).newSnap;

export const selectSnapUploadProgress = (state) => root(state).progress;
