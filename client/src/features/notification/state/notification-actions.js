import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationAPI } from '../api';
import { selectNotificationCount } from './notification-slice';

export const fetchUnseenNotificationCount = createAsyncThunk(
  'notification/fetchUnseenNotificationCount',
  notificationAPI.getAuthUsersUnseenCount
);

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (args, { getState }) => {
    const offset = selectNotificationCount(getState());

    return await notificationAPI.getAuthUsers(offset);
  }
);
