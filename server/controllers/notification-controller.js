import { Notification } from '../models/index.js';

import { toObjectId } from '../utils/mongoose-utils.js';

export const getReqUserUnseenNotificationCount = async (req, res) => {
  const { userId } = req;

  const count = await Notification.find({ recipientId: userId, isRead: false }).countDocuments();

  return res.json({ count });
};

export const getReqUsersNotifications = async (req, res) => {
  const recipientId = toObjectId(req.userId);
  const { $skip, $limit } = req.pagination;

  const pipeline = [
    { $match: { recipientId } },
    { $unset: ['recipientId', '__v'] },
    { $sort: { createdAt: -1 } },
    { $skip },
    { $limit },
    {
      $lookup: {
        from: 'users',
        let: { senderId: '$senderId' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$senderId'] } } },
          { $project: { username: 1, avatarId: 1 } },
        ],
        as: 'sender',
      },
    },
    { $unwind: '$sender' },
    { $unset: ['senderId'] },
  ];

  const foundNotifications = await Notification.aggregate(pipeline);

  return res.json({
    hasMore: foundNotifications.length === $limit,
    notifications: foundNotifications,
  });
};

export const updateNotificationsStatus = async (req, res) => {
  const recipientId = toObjectId(req.userId);

  await Notification.updateMany({ recipientId }, { isRead: true });
  return res.sendStatus(204);
};

/* export const getReqUsersNotificationsIGC = async (req, res, next) => {
  const user = res.locals.user;

  try {
    const notifications = await Notification.aggregate([
      {
        $match: { receiver: ObjectId(user._id) },
      },
      {
        $sort: { date: -1 },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'sender',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'receiver',
          foreignField: '_id',
          as: 'receiver',
        },
      },
      {
        $unwind: '$sender',
      },
      {
        $unwind: '$receiver',
      },
      // Look for the sender's followers
      {
        $lookup: {
          from: 'followers',
          localField: 'sender._id',
          foreignField: 'user',
          as: 'senderFollowers',
        },
      },
      {
        $unwind: '$senderFollowers',
      },
      // Check for the receiver's id in the sender's followers array
      {
        $addFields: {
          isFollowing: {
            $in: ['$receiver._id', '$senderFollowers.followers.user'],
          },
        },
      },
      {
        $project: {
          isRead: true,
          notificationType: true,
          isFollowing: true,
          date: true,
          notificationData: true,
          'sender.username': true,
          'sender.avatar': true,
          'sender._id': true,
          'receiver._id': true,
        },
      },
    ]);
    return res.send(notifications);
  } catch (err) {
    next(err);
  }
}; */
