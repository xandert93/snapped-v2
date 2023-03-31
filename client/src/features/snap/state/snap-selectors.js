import { createSelector, createStructuredSelector } from 'reselect';
import { selectAuthUserId } from '../../user/state/user-selectors';

import { selectSnapById } from './snap-slice';

const root = (state) => state.snap;

// SINGLE SNAP:
export const selectSnapCreatorUsername = (id) => (state) => {
  return selectSnapById(id)(state).creator.username;
};

export const selectSnapFirstImageId = (id) => (state) => selectSnapById(id)(state).imageIds[0];
export const selectSnapLikeCount = (id) => (state) => selectSnapById(id)(state).likeCount;
export const selectSnapCommentCount = (id) => (state) => selectSnapById(id)(state).commentCount;

// export const selectSnapsState = (type) => (state) => root(state);

export const selectAreSnapsFetching = (state) => root(state).isFetching;
export const selectHasMoreSnaps = (state) => root(state).hasMore;
export const selectSnapsErrMessage = (state) => root(state).errMessage;

export const selectSelectedSnap = (state) => root(state).selectedSnap;
export const selectSelectedSnapId = (state) => root(state).selectedSnap._id;
export const selectSelectedSnapImageIds = (state) => root(state).selectedSnap.imageIds;

export const selectSocketSnaps = (state) => root(state).socketSnaps;
export const selectSocketSnapCount = (state) => root(state).socketSnaps.length;

//DERIVED:
export const selectSnapMetadata = createStructuredSelector({
  isFetching: selectAreSnapsFetching,
  errMessage: selectSnapsErrMessage,
  hasMore: selectHasMoreSnaps,
});

export const selectIsAuthUsersSnap = (creatorId) =>
  createSelector(selectAuthUserId, (authUserId) => authUserId === creatorId);
