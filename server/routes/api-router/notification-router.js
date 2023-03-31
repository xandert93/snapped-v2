import express from 'express';
import {
  getReqUsersNotifications,
  getReqUserUnseenNotificationCount,
  updateNotificationsStatus,
} from '../../controllers/notification-controller';
import { loadScrollPagination } from '../../middleware/mongoose-middleware';

const notificationRouter = express.Router();

notificationRouter.get('/user/unseen-count', getReqUserUnseenNotificationCount);

notificationRouter.patch('/user/isRead', updateNotificationsStatus);

notificationRouter.get(
  '/user/:offset',
  loadScrollPagination('notification'),
  getReqUsersNotifications
);

export default notificationRouter;
