import { SnapComment, Notification } from '../models/index.js';
import { toObjectId } from '../utils/mongoose-utils.js';

import { emitNewNotification, emitNotificationUndone } from '../utils/socket-utils.js';

export const getSnapComments = async (req, res) => {
  const snapId = toObjectId(req.params.id);
  const { $skip, $limit } = req.pagination;

  const commentsPipeline = [
    { $match: { snapId } },
    { $sort: { createdAt: -1 } },
    { $skip },
    { $limit },
    { $unset: ['__v'] },
    {
      $lookup: {
        from: 'users',
        let: { authorId: '$authorId' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$authorId'] } } },
          { $project: { username: 1, avatarId: 1 } },
        ],
        as: 'author',
      },
    },
    { $unwind: '$author' },
    { $unset: ['authorId'] },
  ];

  const foundComments = await SnapComment.aggregate(commentsPipeline);

  return res.json({ hasMore: foundComments.length === $limit, comments: foundComments });
};

export const createSnapComment = async (req, res) => {
  const { userId, snap, tokenUser } = req;
  const { text } = req.body;

  const comment = {
    snapId: snap.id,
    authorId: userId,
    text,
  };

  const savedComment = await new SnapComment(comment).save();

  const isUsersSnap = String(snap.creatorId) === userId;
  if (!isUsersSnap) {
    const notification = {
      senderId: userId,
      recipientId: snap.creatorId,
      type: 'comment',
      details: {
        snapId: snap.id,
        imageId: snap.imageIds[0],
        comment: {
          _id: savedComment._id,
          text: savedComment.text, // not scalable if comment is to be editable. Also duplicated. Could insert commentId and populate via lookup on fetch, but that's extra work
        },
      },
    };

    const savedNotification = await new Notification(notification).save();

    const aggNotification = {
      ...savedNotification.toObject(),
      senderId: undefined,
      sender: tokenUser,
    };

    emitNewNotification(aggNotification);
  }

  //FE expects aggregated format:
  const aggComment = {
    ...savedComment.toObject(),
    authorId: undefined,
    author: tokenUser,
  };

  return res.status(201).json({ comment: aggComment, message: 'Comment added!' });
};

export const updateSnapComment = async (req, res) => {
  const { comment } = req;
  const { text } = req.body;

  comment.text = text;

  await comment.save();

  return res.json({ message: 'Comment updated' });
};

export const deleteSnapComment = async (req, res) => {
  const { comment } = req;

  const deletedComment = await comment.remove();

  if (deletedComment) {
    const deletedNotification = await Notification.findOneAndDelete({
      'details.comment._id': comment._id,
    }); // commentId not stored in Notification for follow or like as neither exist as individual resources
    if (deletedNotification) emitNotificationUndone(deletedNotification);
  }

  return res.json({ message: 'Comment deleted' });
};

export const toggleSnapCommentLike = async (req, res) => {
  // const { id } = req.params;
  // const user = res.locals.user;
  // try {
  //   const commentLikeUpdate = await CommentLike.updateOne(
  //     {
  //       comment: id,
  //       'votes.author': { $ne: user._id },
  //     },
  //     { $push: { votes: { author: user._id } } }
  //   );
  //   if (!commentLikeUpdate.nModified) {
  //     if (!commentLikeUpdate.ok) {
  //       return res.status(500).send({ error: 'Could not vote on the comment.' });
  //     }
  //     // Nothing was modified in the previous query meaning that the user has already liked the comment
  //     // Remove the user's like
  //     const commentDislikeUpdate = await CommentLike.updateOne(
  //       { comment: commentId },
  //       { $pull: { votes: { author: user._id } } }
  //     );
  //     if (!commentDislikeUpdate.nModified) {
  //       return res.status(500).send({ error: 'Could not vote on the comment.' });
  //     }
  //   }
  //   return res.send({ success: true });
  // } catch (err) {
  //   next(err);
  // }
};
