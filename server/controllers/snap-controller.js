import { Notification, Snap, SnapLike, UserFollowing } from '../models/index.js';
import { toObjectId } from '../utils/mongoose-utils.js';
import { NotFoundError, BadReqError } from '../utils/error-types.js';
import { genSnapsPipeline } from '../utils/controller-utils.js';
import {
  emitNewNotification,
  emitNewSnapToFollowers,
  emitNotificationUndone,
} from '../utils/socket-utils.js';

//POST @ '/' + { location, caption, tags, isPublic }
export const createSnap = async (req, res) => {
  const { userId, tokenUser, imageIds } = req;
  const body = JSON.parse(req.body['snap-body']);

  const newSnap = {
    creatorId: userId,
    ...body,
    imageIds,
  };

  const savedSnap = await new Snap(newSnap).save();

  //FEs expects all snaps to have the aggregated properties
  const aggSnap = {
    ...savedSnap.toObject(), //needless to copy heavy 20 Mongoose doc state properties
    creatorId: undefined, //removed when sent as JSON
    creator: tokenUser,
    commentCount: 0,
    likeCount: 0,
    isLiked: false,
  };

  if (savedSnap.isPublic) emitNewSnapToFollowers(aggSnap);

  return res.status(201).json({ message: 'Snap posted!', snap: aggSnap });
};

// GET @ '/feed:/:offset'
export const getFeedSnaps = async (req, res) => {
  const { userId, pagination } = req;

  const { followingIds } = await UserFollowing.findOne({ userId }); // Get array of req.user's following

  const filter = {
    creatorId: { $in: [...followingIds, toObjectId(userId)] }, // match only public snap docs whose `creatorId` is $in followingIds=Arr + req.user's
    isPublic: true,
  };

  const foundSnaps = await Snap.aggregate(genSnapsPipeline(filter, userId, pagination));
  const hasMore = foundSnaps.length === pagination.$limit;

  return res.json({ hasMore, snaps: foundSnaps });
};

// GET @ '/suggested?tags=tagsStr'
export const getSuggestedSnaps = async (req, res) => {
  const { userId } = req;
  const tagsStr = req.query.tags;

  const pagination = { $sample: { size: 6 } }; // only return a random sample of 6

  const filter = {
    creatorId: { $ne: toObjectId(userId) },
    ...(tagsStr && { tags: { $in: tagsStr.split(',') } }),
    isPublic: true,
  };

  const foundSnaps = await Snap.aggregate(genSnapsPipeline(filter, userId, pagination));

  return res.json({ snaps: foundSnaps });
};

// GET @ '/user/:id/:offset'
export const getProfileSnaps = async (req, res) => {
  const { userId, pagination } = req;
  const profileId = req.params.id;

  const filter = {
    creatorId: toObjectId(profileId),
    isPublic: true,
  };

  const foundSnaps = await Snap.aggregate(genSnapsPipeline(filter, userId, pagination));
  const hasMore = foundSnaps.length === pagination.$limit;

  return res.json({ hasMore, snaps: foundSnaps });
};

// GET @ '/user/:id/private/:offset'
export const getPrivateProfileSnaps = async (req, res) => {
  const { userId, pagination } = req;

  const filter = {
    creatorId: toObjectId(userId),
    isPublic: false,
  };

  const foundSnaps = await Snap.aggregate(genSnapsPipeline(filter, userId, pagination));
  const hasMore = foundSnaps.length === pagination.$limit;

  return res.json({ hasMore, snaps: foundSnaps });
};

// GET @ '/explore'
export const getExploreSnaps = async (req, res) => {
  const { userId } = req;

  const { followingIds } = await UserFollowing.findOne({ userId }); // Get array of req.user's following

  const pagination = { $sample: { size: 18 } }; // only return a random sample of 18 (for now)

  const filter = {
    creatorId: { $nin: [...followingIds, toObjectId(userId)] },
    isPublic: true,
  };

  const foundSnaps = await Snap.aggregate(genSnapsPipeline(filter, userId, pagination));

  return res.json({ snaps: foundSnaps });
};

// GET @ '/hashtags/:tags/count (copied most from below)
export const getHashtagSnapCount = async (req, res) => {
  const { tags: tagsStr } = req.params;
  const tags = tagsStr.split(','); // tags arrive comma-separated in a QS
  if (!tags.length) throw new BadReqError('Please provide at least one hashtag');

  const filter = {
    tags: { $in: tags }, // $in matches any snap docs whose any 1 tag is $in tags
    isPublic: true,
  };

  const count = await Snap.countDocuments(filter);

  return res.json({ count });
};

// GET @ '/hashtags/:tags/:offset'
export const getHashtagSnaps = async (req, res) => {
  const { userId, pagination } = req;

  const { tags: tagsStr } = req.params;
  const tags = tagsStr.split(','); // tags arrive comma-separated in a QS
  if (!tags.length) throw new BadReqError('Please provide at least one hashtag');

  const filter = {
    tags: { $in: tags }, // $in matches any snap docs whose any 1 tag is $in tags
    isPublic: true,
  };

  const foundSnaps = await Snap.aggregate(genSnapsPipeline(filter, userId, pagination));
  const hasMore = foundSnaps.length === pagination.$limit;

  return res.json({ hasMore, snaps: foundSnaps });
};

// GET @ '/search?q=...'
export const getSearchSnaps = async (req, res) => {
  const { userId } = req;
  const { q: searchTerm } = req.query;

  const filter = { isPublic: true };

  if (!searchTerm.startsWith('#')) {
    //only check if snap location/caption contains basic searchTerm
    searchTerm = new RegExp(searchTerm, 'i');
    filter.$or = [{ location: searchTerm }, { caption: searchTerm }];
  } else {
    // e.g. '#banana cream #pie'
    const regExTags = searchTerm
      .match(/#\w+/g) // match all hashtag words e.g. ['#banana', '#pie']
      .map((tag) => tag.slice(1)) // remove '#' from each element e.g. ['banana', 'pie']
      .map((tag) => new RegExp(`\\b${tag}\\b`, 'i')); // convert each element to "word boundary" RegEx e.g. "[/\bbanana\b/i, /\bpie\b/i]"

    filter.tags = { $all: regExTags };
  }

  const foundSnaps = await Snap.aggregate(genSnapsPipeline(filter, userId));

  return res.json({ snaps: foundSnaps });
};

// GET @ '/:id'
export const getSnap = async (req, res) => {
  const { userId } = req;
  const _id = toObjectId(req.params.id);

  const filter = { _id };

  const [foundSnap] = await Snap.aggregate(genSnapsPipeline(filter, userId));
  if (!foundSnap) throw new NotFoundError('snap');

  const isPrivate = !foundSnap.isPublic;
  const isReqUsers = String(foundSnap.creator._id) === userId;
  if (isPrivate && !isReqUsers) throw new NotFoundError('snap');

  return res.json({ snap: foundSnap });
};

//PATCH @ '/:id'
export const updateSnap = async (req, res) => {
  const { snap } = req;
  const update = req.body;

  const keys = ['location', 'caption', 'tags', 'isPublic']; // only fields specified in this array can be updated. Ensures integrity of creatorId, imageIds, createdAt etc.
  keys.forEach((key) => (snap[key] = update[key]));

  const updatedSnap = await snap.save();
  return res.json({ message: 'Snap updated!' });
};

//DELETE @ '/:id'
export const deleteSnap = async (req, res) => {
  const { snap } = req;

  const deletedSnap = await snap.remove();

  return res.json({ message: 'Snap deleted' });
};

//PATCH @ '/:id/toggle-like' + { wasLiked: Bool }
export const toggleSnapLike = async (req, res) => {
  const { userId, tokenUser, snap } = req;

  const { wasLiked } = req.body;
  const queryOp = wasLiked ? '$addToSet' : '$pull';

  await SnapLike.updateOne({ snapId: snap.id }, { [queryOp]: { likerIds: userId } });

  const isUsersSnap = String(snap.creatorId) === userId;
  if (isUsersSnap) return res.sendStatus(204); // if is user's post, don't send notification

  const notification = {
    senderId: userId,
    recipientId: snap.creatorId,
    type: 'like',
    details: {
      snapId: snap.id,
      imageId: snap.imageIds[0],
    },
  };

  if (wasLiked) {
    const savedNotification = await new Notification(notification).save();

    const aggNotification = {
      ...savedNotification.toObject(),
      senderId: undefined,
      sender: tokenUser,
    };

    emitNewNotification(aggNotification);
  } else {
    const deletedNotification = await Notification.findOneAndDelete(notification);
    if (deletedNotification) emitNotificationUndone(deletedNotification);
  }

  return res.sendStatus(204);
};

// GET @ '/:id/likers'
export const getSnapLikers = async (req, res) => {
  const { userId } = req;
  const snapId = toObjectId(req.params.id);
  const { $skip, $limit } = req.pagination;

  const pipeline = [
    { $match: { snapId } },
    { $project: { _id: 0, likerIds: 1 } },
    {
      $lookup: {
        from: 'users',
        let: { likerIds: '$likerIds' },
        pipeline: [
          { $match: { $expr: { $in: ['$_id', '$$likerIds'] } } },
          { $skip },
          { $limit },
          { $project: { avatarId: 1, username: 1, firstName: 1, lastName: 1 } },
          {
            $lookup: {
              from: 'userfollowers',
              let: { likerId: '$_id' },
              pipeline: [{ $match: { $expr: { $eq: ['$userId', '$$likerId'] } } }],
              as: 'followerDoc', // only returns 1, obviously
            },
          },
          { $unwind: '$followerDoc' },
          { $addFields: { isFollowed: { $in: [toObjectId(userId), '$followerDoc.followerIds'] } } },
          { $unset: 'followerDoc' },
        ],
        as: 'foundLikers',
      },
    },
    { $unset: ['likerIds'] },
  ];

  const [{ foundLikers }] = await SnapLike.aggregate(pipeline);

  return res.json({ hasMore: foundLikers.length === $limit, users: foundLikers });
};
