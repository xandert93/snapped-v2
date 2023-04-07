import { createSelector } from '@reduxjs/toolkit';
import { createStructuredSelector } from 'reselect';

// Selectors by `user` type
export const selectUser = (type) => (state) => state.users[type];

export const selectUserId = (type) => (state) => state.users[type]._id;
export const selectUserUsername = (type) => (state) => state.users[type].username;
export const selectUserFirstName = (type) => (state) => state.users[type].firstName;
export const selectUserLastName = (type) => (state) => state.users[type].lastName;

export const selectUserAvatarId = (type) => (state) => state.users[type].avatarId;

export const selectUserSnapCount = (type) => (state) => state.users[type].snapCount;
export const selectUserFollowCount = (type) => (state) => state.users[type].followCount;
export const selectUserFollowerCount = (type) => (state) => state.users[type].followerCount;
export const selectUserProfile = (type) => (state) => state.users[type].profile;
export const selectUserBio = (type) => (state) => state.users[type].profile.bio;

export const selectUserFullName = (type) =>
  createSelector(
    selectUserFirstName(type),
    selectUserLastName(type),
    (firstName, lastName) => firstName + ' ' + lastName
  );

export const selectRelationCounts = (type) =>
  createStructuredSelector({
    followCount: selectUserFollowCount(type),
    followerCount: selectUserFollowerCount(type),
  });

// Auth User Selectors
export const selectIsLoggedIn = (state) => Boolean(state.users.auth?._id); // 1

/*
1) Crucially, a user's `._id` will never be updated. Since this is read by components
   that are high in the <App> tree e.g. <App>, <Layout>, <AppRoute>, this ensures that they
   do not expensively re-render when other `user` properties update. 

   I've also seen some developers select the `accessToken` to prove that the user is logged in.
   However, given that a new `accessToken` gets set every 10mins, using this mechanism would 
   cause expensive re-renders. So, this is the best solution I could think of for now.

   Lastly, it doesn't have to be a Boolean! But I've just written this to in fact be more 
   semantic. Naturally, it will do: 
   
   Boolean(undefined) => `false`, or
   Boolean('mongoDB_ID') => `true`

   And these Boolean values are more representative of the `isLoggedIn` value
*/

export const selectAuthUser = (state) => state.users.auth;

export const selectAuthUserField = (fieldName) => (state) => state.users.auth[fieldName];
export const selectAuthUserId = (state) => state.users.auth._id;

export const selectAuthUserIsNew = (state) => state.users.auth._isNew;
export const selectAuthUserIsVerified = (state) => state.users.auth.isVerified;

export const selectAuthUserUsername = (state) => state.users.auth.username;
export const selectAuthUserFirstName = (state) => state.users.auth.firstName;
export const selectAuthUserLastName = (state) => state.users.auth.lastName;
export const selectAuthUserEmail = (state) => state.users.auth.email;

export const selectAuthUserProfile = (state) => state.users.auth.profile;
export const selectAuthUserAvatarId = (state) => state.users.auth.avatarId;

export const selectAuthUserSnapCount = (state) => state.users.auth.snapCount;
export const selectAuthUserFollowCount = (state) => state.users.auth.followCount;

export const selectAuthUserSubscription = (state) => state.users.auth.subscription;
export const selectAuthUserSubscriptionName = (state) => state.users.auth.subscription.name;

// Derived User or Auth selectors:
export const selectUserInitials = (type) =>
  createSelector(
    selectUserFirstName(type),
    selectUserLastName(type),
    (firstName, lastName) => firstName[0] + lastName[0]
  );

export const selectIsAuthUserSubscriber = createSelector(selectAuthUserSubscriptionName, Boolean);

// Profile User Selectors
export const selectProfileUserId = (state) => state.users.profile._id;
export const selectProfileUserUsername = (state) => state.users.profile.username;
export const selectProfileUserIsFollowed = (state) => state.users.profile.isFollowed; // previously `.isFollowedByAuthUser`

// Derived Auth User Selectors
export const selectAuthUserFullName = createSelector(
  selectAuthUserFirstName,
  selectAuthUserLastName,
  (firstName, lastName) => firstName + ' ' + lastName
);

export const selectAuthUserInitials = createSelector(
  selectAuthUserFirstName,
  selectAuthUserLastName,
  (firstName, lastName) => firstName[0] + lastName[0]
);

export const selectUserAvatarData = (type) =>
  createStructuredSelector({
    firstName: selectUserFirstName(type), // for `alt` attribute
    lastName: selectUserLastName(type), // for `alt` attribute
    avatarId: selectUserAvatarId(type),
  });

export const selectIsAuthUsersUsername = (username) => (state) => {
  return selectAuthUserUsername(state) === username.toLowerCase(); // `username` could be from path params etc.
};

export const selectShowHomeGreeting = createSelector(
  selectAuthUserSnapCount,
  selectAuthUserFollowCount,
  (snapCount, followCount) => {
    return !snapCount && !followCount;
  }
);

//DERIVED
export const selectDoesAuthUserIdMatch = (userId) => (state) => {
  const isMatching = selectAuthUserId(state) === userId;
  return isMatching;
};

// export const selectProfileMetadata = createStructuredSelector({
//   isFetching: selectProfileIsFetching,
//   hasErr: selectProfileHasErr,
// });
