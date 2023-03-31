import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentLikeSchema = new Schema({
  commentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
  likerIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const commentLikeModel = mongoose.model('SnapCommentLike', commentLikeSchema);
module.exports = commentLikeModel;
