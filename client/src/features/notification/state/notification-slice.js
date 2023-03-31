import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { compareEntityCreatedAtDesc, entityIdSelector } from '../../../utils/redux-utils';

import { fetchNotifications, fetchUnseenNotificationCount } from './notification-actions';

const notificationAdapter = createEntityAdapter({
  selectId: entityIdSelector,
  sortComparer: compareEntityCreatedAtDesc,
});

export const {
  selectIds: selectNotificationIds,
  selectAll: selectAllNotifications,
  selectTotal: selectNotificationCount,
} = notificationAdapter.getSelectors((state) => state.notification);

const { selectById } = notificationAdapter.getSelectors((state) => state.notification);
export const selectNotificationById = (id) => (state) => selectById(state, id);

const initialState = notificationAdapter.getInitialState({
  unseenCount: 0,

  isFetching: false,
  hasMore: false,
  errMessage: '',
});

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    markNotificationsAsSeen: (state) => {
      state.unseenCount = 0;
    },

    addNotification: (state, action) => {
      const notification = action.payload;

      notificationAdapter.addOne(state, notification);
      state.unseenCount++;
    },

    markNotificationAsRead: (state, action) => {
      const id = action.payload;

      notificationAdapter.updateOne(state, { id, changes: { isRead: true } });
    },

    deleteNotification: (state, action) => {
      const id = action.payload;

      notificationAdapter.removeOne(state, id);
      state.unseenCount && state.unseenCount--;
    },

    deleteNotifications: (state, { payload }) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUnseenNotificationCount.fulfilled, (state, action) => {
        const { count } = action.payload;

        state.unseenCount = count;
      })

      .addCase(fetchNotifications.pending, (state) => {
        state.isFetching = true;
        state.errMessage = '';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const { hasMore, notifications } = action.payload;

        notificationAdapter.upsertMany(state, notifications);
        state.isFetching = false;
        state.hasMore = hasMore;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        const errMessage = action.error.message;

        state.isFetching = false;
        state.errMessage = errMessage;
      });
  },
});

export const {
  markNotificationsAsSeen,
  addNotification,
  markNotificationAsRead,
  deleteNotification,
  deleteNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
