import { createSelector } from '@reduxjs/toolkit';

export const selectAreNotificationsFetching = (state) => state.notification.isFetching;
export const selectHasMoreNotifications = (state) => state.notification.hasMore;

export const selectUnseenNotificationCount = (state) => state.notification.unseenCount;
