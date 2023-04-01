import { User, UserFollower, UserFollowing, Notification } from '../models/index.js';
import { toObjectId } from '../utils/mongoose-utils.js';

import { BadReqError, NotFoundError } from '../utils/error-types.js';
import { emitNewNotification, emitNotificationUndone } from '../utils/socket-utils.js';
import { genTokens, setRefreshCookie } from '../utils/auth-utils.js';

//GET @ '/username/:username'
export const getProfileUser = async (req, res) => {
  const userId = toObjectId(req.userId);
  const usernameRegex = new RegExp(req.params.username, 'i');

  const pipeline = [
    { $match: { username: usernameRegex } },
    {
      $unset: [
        'password',
        'googleId',
        'facebookId',
        'email',
        'subscription',
        'isAdmin',
        'customerId',
        '__v',
      ],
    },
    {
      $lookup: {
        from: 'snaps',
        let: { userId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$creatorId', '$$userId'] }, isPublic: true } },
          { $count: 'count' }, //if any matching, returns [ { count } ], else []. Don't unwind in last case, else no docs output from stage!
        ],
        as: 'snaps',
      },
    },
    { $set: { snapCount: { $ifNull: [{ $arrayElemAt: ['$snaps.count', 0] }, 0] } } }, // assign `snaps[0].count`. But if that is undefined/null, use replacement value of 0
    { $unset: 'snaps' },
    // + { followCount, isFollowingUser, followerCount, isFollowed }
    {
      $lookup: {
        from: 'userfollowings',
        localField: '_id',
        foreignField: 'userId',
        as: 'followingDoc',
      },
    },
    { $unwind: '$followingDoc' },
    {
      $addFields: {
        followCount: { $size: '$followingDoc.followingIds' },
        isFollowingUser: { $in: [userId, '$followingDoc.followingIds'] },
      },
    },
    { $unset: 'followingDoc' },
    {
      $lookup: {
        localField: '_id',
        from: 'userfollowers',
        foreignField: 'userId',
        as: 'followerDoc',
      },
    },
    { $unwind: '$followerDoc' },
    {
      $addFields: {
        followerCount: { $size: '$followerDoc.followerIds' },
        isFollowed: { $in: [userId, '$followerDoc.followerIds'] },
      },
    },
    { $unset: 'followerDoc' },
  ];

  const [foundUser] = await User.aggregate(pipeline);
  if (!foundUser) throw new NotFoundError('user');
  return res.json({ user: foundUser });
};

export const getProfileSnapshot = async (req, res) => {
  const userId = toObjectId(req.userId);
  const pUserId = toObjectId(req.params.id);

  const snapshotPipeline = [
    { $match: { _id: pUserId } },
    { $project: { username: 1, firstName: 1, lastName: 1, avatarId: 1, isVerified: 1 } },
    {
      $lookup: {
        from: 'snaps',
        let: { userId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$creatorId', '$$userId'] }, isPublic: true } },
          {
            $facet: {
              // user's snap count
              metadata: [{ $count: 'count' }],
              // send back that user's last 3 snaps, containing the first image of each snap
              last3: [
                { $sort: { createdAt: -1 } },
                { $limit: 3 },
                { $project: { imageId: { $arrayElemAt: ['$imageIds', 0] } } },
              ],
            },
          },
        ],
        as: 'snaps', // actually just [{ count: Num }] or [] (no matches)
      },
    },
    { $unwind: '$snaps' },
    { $set: { snapCount: { $ifNull: [{ $arrayElemAt: ['$snaps.metadata.count', 0] }, 0] } } },
    { $set: { snaps: '$snaps.last3' } },
    // + { followCount, isFollowingUser, followerCount, isFollowed }
    {
      $lookup: {
        from: 'userfollowings',
        localField: '_id',
        foreignField: 'userId',
        as: 'followingDoc',
      },
    },
    { $unwind: '$followingDoc' },
    {
      $addFields: {
        followCount: { $size: '$followingDoc.followingIds' },
        isFollowingUser: { $in: [userId, '$followingDoc.followingIds'] },
      },
    },
    { $unset: 'followingDoc' },
    {
      $lookup: {
        localField: '_id',
        from: 'userfollowers',
        foreignField: 'userId',
        as: 'followerDoc',
      },
    },
    { $unwind: '$followerDoc' },
    {
      $addFields: {
        followerCount: { $size: '$followerDoc.followerIds' },
        isFollowed: { $in: [userId, '$followerDoc.followerIds'] },
      },
    },
    { $unset: 'followerDoc' },
  ];

  const [snapshot] = await User.aggregate(snapshotPipeline);

  return res.json({ snapshot });
};

//GET @ '/search?q=value'
export const getUsersBySearch = async (req, res) => {
  const { q: searchTerm } = req.query;
  const terms = searchTerm.split(' ');

  const usernameRegEx = new RegExp(terms[0], 'i');
  const nameRegEx = new RegExp(searchTerm, 'i');

  const filter = { $or: [{ username: usernameRegEx }, { name: nameRegEx }] };

  const foundUsers = await User.find(filter).select('-password -__v');
  return res.json({ users: foundUsers });
};

//GET @ '/suggested?size=val'
export const getSuggestedUsers = async (req, res) => {
  const userId = toObjectId(req.userId);
  const sampleSize = Number(req.query.size) || 10; //*** probably needs to be limited to 10 max

  const pipeline = [
    { $match: { userId } },
    {
      $lookup: {
        from: 'users',
        let: { followingIds: '$followingIds' },
        pipeline: [
          {
            $match: {
              $expr: { $not: { $in: ['$_id', { $concatArrays: ['$$followingIds', [userId]] }] } },
            },
          },
          { $sample: { size: sampleSize } },
          { $project: { username: 1, firstName: 1, lastName: 1, avatarId: 1 } },
        ],
        as: 'suggestedUsers',
      },
    },
    { $project: { _id: 0, suggestedUsers: 1 } },
  ];
  //IGC also inserted 3 of each user's latests posts into each document --> in FE, when suggestedUser hovered, modal appears displaying 3 latest

  const [{ suggestedUsers }] = await UserFollowing.aggregate(pipeline);

  return res.json({ users: suggestedUsers });
};

//PATCH @ /:id/toggle-follow
export const toggleFollow = async (req, res) => {
  const { userId, tokenUser, user } = req; // req.user is the earlier `foundUser`

  const { wasFollowed } = req.body;
  const queryOp = wasFollowed ? '$addToSet' : '$pull';

  if (user.id === userId) {
    throw new BadReqError(`You cannot ${wasFollowed ? 'follow' : 'unfollow'} yourself`);
  }

  await Promise.all([
    UserFollowing.updateOne({ userId }, { [queryOp]: { followingIds: user.id } }),
    UserFollower.updateOne({ userId: user._id }, { [queryOp]: { followerIds: userId } }),
  ]);

  const notification = {
    senderId: userId,
    recipientId: user._id,
    type: 'follow',
  };

  if (wasFollowed) {
    const savedNotification = await new Notification(notification).save();

    //*** repeated min 3x - create a "genAggNotification" fn?
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

  return res.json({
    message: (wasFollowed ? 'You are now following ' : 'You have unfollowed ') + user.username,
  });
};

//GET @ /:id/followers
export const getUserFollowers = async (req, res) => {
  const { userId } = req;
  const pUserId = toObjectId(req.params.id);
  const { $skip, $limit } = req.pagination;

  const { followingIds: reqUserFollowingIds } = await UserFollowing.findOne({ userId });

  const followersPipeline = [
    { $match: { userId: pUserId } },
    { $project: { _id: 0, followerIds: 1 } },
    {
      $lookup: {
        from: 'users',
        let: { followerIds: '$followerIds' },
        pipeline: [
          { $match: { $expr: { $in: ['$_id', '$$followerIds'] } } },
          { $skip },
          { $limit },
          {
            $project: {
              avatarId: 1,
              username: 1,
              firstName: 1,
              lastName: 1,
              isFollowed: { $in: ['$_id', reqUserFollowingIds] },
            },
          },
        ],
        as: 'followers',
      },
    },
    { $unset: ['followerIds'] },
  ];

  const [{ followers }] = await UserFollower.aggregate(followersPipeline);

  return res.json({ hasMore: followers.length === $limit, users: followers });
};

//GET @ /:id/following
export const getUserFollowing = async (req, res) => {
  const { userId } = req;
  const pUserId = toObjectId(req.params.id);
  const { $skip, $limit } = req.pagination;

  const { followingIds: reqUserFollowingIds } = await UserFollowing.findOne({ userId });

  const followingPipeline = [
    { $match: { userId: pUserId } },
    { $project: { _id: 0, followingIds: 1 } },
    {
      $lookup: {
        from: 'users',
        let: { followingIds: '$followingIds' },
        pipeline: [
          { $match: { $expr: { $in: ['$_id', '$$followingIds'] } } },
          { $skip },
          { $limit },
          {
            $project: {
              avatarId: 1,
              username: 1,
              firstName: 1,
              lastName: 1,
              isFollowed: { $in: ['$_id', reqUserFollowingIds] },
            },
          },
        ],
        as: 'following',
      },
    },
    { $unset: ['followingIds'] },
  ];

  const [{ following }] = await UserFollowing.aggregate(followingPipeline);

  return res.json({ hasMore: following.length === $limit, users: following });
};

// still open to this, since a lot of code above is repeated, bar the pipeline...:

//GET @ /:id/relations?type=val
/* export const getUserRelations = async (req, res) => {
  const { userId } = req;
  const pUserId = toObjectId(req.params.id);
  const { type } = req.query;
  const Collection = type === 'following' ? UserFollowing : UserFollower;

  const { followingIds: reqUserFollowingIds } = await UserFollowing.findOne({ userId });

  const pipelines = {
    followers: [
      { $match: { userId: pUserId } },
      { $project: { _id: 0, followerIds: 1 } },
      {
        $lookup: {
          from: 'users',
          let: { followerIds: '$followerIds' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$followerIds'] } } },
            {
              $project: {
                avatarId: 1,
                username: 1,
                isFollowed: { $in: ['$_id', reqUserFollowingIds] }, true, false] },
            },
          ],
          as: 'followers',
        },
      },
      { $unset: ['followerIds'] },
    ],
    following: [
      { $match: { userId: pUserId } },
      { $project: { _id: 0, followingIds: 1 } },
      {
        $lookup: {
          from: 'users',
          let: { followingIds: '$followingIds' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$followingIds'] } } },
            {
              $project: {
                avatarId: 1,
                username: 1,
                isFollowed: { $in: ['$_id', reqUserFollowingIds] }, true, false] },
              },
            },
          ],
          as: 'following',
        },
      },
      { $unset: ['followingIds'] },
    ],
  };

  const [{ [type]: followData }] = await Collection.aggregate(pipelines[type]);

  return res.json({followData});
}; */

//UPDATE USER'S OWN DOCUMENT
export const updateUser = async (req, res) => {
  const { user } = req;
  const update = req.body; // => { firstName, lastName, username, email }

  for (const key in update) {
    if (update[key]) user[key] = update[key]; //*** this isn't best. Malicious user could send update with { password, googleId, facebookId } etc and alter the really private info. See `loadUserById` commented code to see how I previously handled it (also didn't feel right). See how others do it.
  }

  const updatedUser = await user.save(); // `post('save')` removes `password` for us

  const [accessToken, refreshToken] = genTokens(updatedUser);
  setRefreshCookie(res, refreshToken);
  return res.json({ message: 'Account updated!', user: updatedUser, accessToken });
};

export const updateUserAvatar = async (req, res) => {
  const { user, imageId: avatarId } = req;

  user.avatarId = avatarId;
  const updatedUser = await user.save(); //*** probably need to remove old one from Cloudinary afterwards

  const [accessToken, refreshToken] = genTokens(updatedUser);
  setRefreshCookie(res, refreshToken);
  return res.json({ message: 'Profile picture updated!', avatarId, accessToken });
};

export const resetUserAvatar = async (req, res) => {
  const { user } = req;

  user.avatarId = '';
  const updatedUser = await user.save();

  const [accessToken, refreshToken] = genTokens(updatedUser);
  setRefreshCookie(res, refreshToken);
  return res.json({
    message: 'Profile picture removed',
    avatarId: '',
    accessToken,
  });
};

export const updateUserCover = async (req, res) => {
  const { user, imageId: coverId } = req;

  user.coverId = coverId;
  const updatedUser = await user.save();

  return res.json({ message: 'Cover picture updated!', coverId });
};

export const resetUserCover = async (req, res) => {
  const { user } = req;

  user.coverId = '';
  const updatedUser = await user.save();

  return res.json({ message: 'Cover picture removed', coverId: '' });
};

export const updateUserProfile = async (req, res) => {
  const { user } = req;
  const update = req.body;

  user.profile = update;

  const { profile } = await user.save();

  return res.json({ message: 'Details updated!', profile });
};

export const deleteUser = async (req, res) => {
  const { user } = req;

  const deletedUser = await user.remove();

  return res.json({ message: 'Account deleted' });
};

//from instaclone:
export const updateUserPassword = async (req, res) => {
  const { user } = req;
  const { password, newPassword } = req.body;

  try {
    const areMatching = await User.comparePasswords(password, user.password);
    if (!areMatching)
      throw new BadReqError('Your old password was entered incorrectly, please try again.');
    else user.password = newPassword;
    const updatedUser = await user.save();
    return res.json('Your password has been updated');
  } catch (err) {
    return next(err);
  }
};

// router.post("/delete-account", authenticateToken, async (req, res) => {
//   const { password } = req.body;

//   if (!password) {
//       res.json({ success: false, error: "Please provide your password." });
//   } else {
//       try {
//           const user = await User.findById(req.userId);

//           if (!user) {
//               res.json({
//                   success: false,
//                   error: "Oh, something went wrong. Please try again!",
//               });
//           } else {
//               const pwCheckSuccess = await compare(password, user.password);

//               if (!pwCheckSuccess) {
//                   res.json({
//                       success: false,
//                       error: "The provided password is not correct.",
//                   });
//               } else {
//                   const deleted = await User.deleteOne({
//                       email: user.email,
//                   });

//                   if (!deleted) {
//                       res.json({
//                           success: false,
//                           error:
//                               "Oh, something went wrong. Please try again!",
//                       });
//                   } else {
//                       req.session = null;
//                       res.json({ success: true });
//                   }
//               }
//           }
//       } catch (err) {
//           console.log("Error on /api/auth/delete-account: ", err);
//           res.json({
//               success: false,
//               error: "Oh, something went wrong. Please try again!",
//           });
//       }
//   }
// });
