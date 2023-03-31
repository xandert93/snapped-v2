import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { entityIdSelector, compareEntityCreatedAtDesc } from '../../../utils/redux-utils';

import {
  fetchSnaps,
  createSnap,
  deleteSnap,
  updateSnap,
  toggleSnapLike,
  createSnapComment,
  deleteSnapComment,
} from './snap-actions';

const snapAdapter = createEntityAdapter({
  selectId: entityIdSelector,
  sortComparer: compareEntityCreatedAtDesc,
});

export const {
  selectIds: selectSnapIds,
  selectById,
  selectAll: selectAllSnaps,
  selectTotal: selectSnapCount,
} = snapAdapter.getSelectors((state) => state.snap);

export const selectSnapById = (id) => (state) => selectById(state, id);

const initialState = snapAdapter.getInitialState({
  isFetching: false,
  errMessage: '',
  hasMore: false,

  selectedSnap: null,

  socketSnaps: [],
});

const snapSlice = createSlice({
  name: 'snap',
  initialState,

  reducers: {
    setSelectedSnapById(state, action) {
      const id = action.payload;
      state.selectedSnap = state.entities[id];
    },
    setSelectedSnap(state, action) {
      const snap = action.payload;
      state.selectedSnap = snap;
    },

    socketSnapReceived(state, action) {
      const snap = action.payload;

      state.socketSnaps.push(snap);
    },

    pullSocketSnaps(state, action) {
      snapAdapter.upsertMany(state, state.socketSnaps);
      state.socketSnaps = initialState.socketSnaps;
    },

    // <DialogManager> still dependent on `selectedSnap`, so not complete clearance...for now
    clearSnaps(state, action) {
      return { ...initialState, selectedSnap: state.selectedSnap };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSnaps.pending, (state, action) => {
        state.isFetching = true;
        state.errMessage = '';
      })
      .addCase(fetchSnaps.fulfilled, (state, action) => {
        const { snaps = [], hasMore } = action.payload;

        state.isFetching = false;
        snapAdapter.upsertMany(state, snaps);
        state.hasMore = hasMore;
      })
      .addCase(fetchSnaps.rejected, (state, action) => {
        const { name, message } = action.error;
        const wasAborted = action.meta.aborted;

        // if (!wasAborted) {}
        state.isFetching = false;
        state.errMessage = message;
      })

      // ✅ For now, adds post to <Feed> if `isPublic` is true
      // ❓ Long-term, though, depending on the page from which the client makes the post, I want that page's posts to update if necessary
      .addCase(createSnap.fulfilled, (state, action) => {
        const { snap } = action.payload;

        if (snap.isPublic) snapAdapter.addOne(state, snap);
      })
      .addCase(createSnap.rejected, (state, action) => {
        const errMessage = action.error.message;
      })

      // ✅ Remove snap from page if its `isPublic` has updated, else, upd ate it in local state.
      .addCase(updateSnap.fulfilled, (state, action) => {
        const { id, update } = action.meta.arg;
        const isPublicSame = state.selectedSnap.isPublic === update.isPublic;

        if (!isPublicSame) snapAdapter.removeOne(state, id);
        else snapAdapter.updateOne(state, { id, changes: update });
      })

      // ✅ Update snap's `isLiked=Bool` and `likeCount=Num` fields
      .addCase(toggleSnapLike.fulfilled, (state, action) => {
        const { id, wasLiked } = action.meta.arg;
        const incValue = wasLiked ? 1 : -1;

        const snap = state.entities[id];
        snap.isLiked = wasLiked;
        snap.likeCount = snap.likeCount + incValue;
      })

      // ✅ Remove snap from page
      .addCase(deleteSnap.fulfilled, (state, action) => {
        const id = state.selectedSnap._id;

        snapAdapter.removeOne(state, id);
      })

      // ✅ insert commentId into snap's commentIds
      .addCase(createSnapComment.fulfilled, (state, action) => {
        const { comment } = action.payload;

        const snap = state.entities[comment.snapId];
        snap.commentCount++;
        // snap.comments.push(comment._id);
      })
      // ✅ remove commentId out of snap's commentIds via `.filter`
      .addCase(deleteSnapComment.fulfilled, (state, action) => {
        const { snapId, commentId } = action.meta.arg;

        const snap = state.entities[snapId];
        snap.commentCount--;
        // snap.comments = snap.comments.filter((id) => id !== commentId);
      });
  },
});

export const {
  setSelectedSnapById,
  setSelectedSnap,

  socketSnapReceived,
  pullSocketSnaps,

  clearSnaps,
} = snapSlice.actions;

export default snapSlice.reducer;

/*
1) normalising `[]` returns `{}`, which is not the { snaps: { ids, entities }, comments: { ids, entities } }
that the `fetchSnaps.fulfilled` case reducers expect. These case reducers will throw errors otherwise as `snaps`
and `comments` will both return `undefined`, which `createEntityAdapter`'s methods cannot work with (needs to be
an Array or Object). I've assigned both `[]` in `fetchSnaps.fulfilled`.

*/
