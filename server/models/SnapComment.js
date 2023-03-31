import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    snapId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      trim: true,
      required: [true, 'Please enter some text'],
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model('SnapComment', commentSchema);
