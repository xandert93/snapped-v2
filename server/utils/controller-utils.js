import { toObjectId } from './mongoose-utils';

const genPaginationStages = (pagination) => {
  // e.g. => { $skip: 10, $limit: 5 }
  return Object.entries(pagination) // => e.g. [['$skip', 10], [$limit, 5]]
    .map(([k, v]) => ({ [k]: v })); // => e.g. [{ $skip: 10 }, { $limit: 5 }]
};

export const genSnapsPipeline = (query, userId, pagination) => {
  return [
    { $match: query },
    { $unset: ['__v'] },
    { $sort: { createdAt: -1 } }, // must $sort -> $skip -> $limit
    ...(pagination ? genPaginationStages(pagination) : []),
    {
      $lookup: {
        let: { creatorId: '$creatorId' },
        from: 'users',
        pipeline: [
          { $match: { $expr: { $eq: ['$$creatorId', '$_id'] } } }, // snap.creatorId === user._id ?
          { $project: { avatarId: 1, username: 1 } },
        ],
        as: 'creator',
      },
    },
    { $unwind: '$creator' },
    { $unset: ['creatorId'] },
    {
      $lookup: {
        from: 'snaplikes',
        localField: '_id',
        foreignField: 'snapId',
        as: 'likersDoc',
      },
    },
    { $unwind: '$likersDoc' },
    {
      $addFields: {
        likeCount: { $size: '$likersDoc.likerIds' },
        isLiked: { $in: [toObjectId(userId), '$likersDoc.likerIds'] },
      },
    },
    { $unset: ['likersDoc'] }, //once we've created the 2 ad-hoc fields we need, delete "likerIds"
    {
      $lookup: {
        from: 'snapcomments',
        let: { snapId: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$snapId', '$$snapId'] } } }],
        as: 'comments',
      },
    },
    { $addFields: { commentCount: { $size: '$comments' } } },
    { $unset: 'comments' },
  ];
};
