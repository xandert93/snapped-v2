import { Schema, model } from 'mongoose';

const userFollowerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followerIds: [Schema.Types.ObjectId],
});

export default model('UserFollower', userFollowerSchema);
