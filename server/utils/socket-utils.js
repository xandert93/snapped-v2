import { getIO } from '../config';
import { UserFollower } from '../models';

export const emitNewNotification = (notification) => {
  const { recipientId } = notification;

  getIO().to(String(recipientId)).emit('new-notification', notification);
};

export const emitNotificationUndone = (notification) => {
  const { recipientId, id: notificationId } = notification;

  getIO().to(String(recipientId)).emit('undo-notification', notificationId);
};

export const emitNewSnapToFollowers = async (snap) => {
  const userId = snap.creator._id;

  const followerDoc = await UserFollower.findOne({ userId });
  const followerIds = followerDoc.followerIds.map(String); // 1

  if (!followerIds.length) return; // 2
  else getIO().to(followerIds).emit('new-snap', snap);
};

/* 1) out of curiosity, simulated this look for 5 million followers using `performance.now()`.
      It took 2 seconds to complete.
   
   2) emitting to an empty array works the same as `io.emit` sending to all connected clients,
      which undesired. 
*/
