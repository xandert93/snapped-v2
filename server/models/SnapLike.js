import { Schema, model } from 'mongoose';

const snapLikeSchema = new Schema({
  snapId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likerIds: [Schema.Types.ObjectId],
});

export default model('SnapLike', snapLikeSchema);
