import { Schema, model } from 'mongoose';

const userFollowingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followingIds: [Schema.Types.ObjectId],
});

export default model('UserFollowing', userFollowingSchema);
