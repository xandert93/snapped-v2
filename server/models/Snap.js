import { Schema, model } from 'mongoose';
import { SnapLike, SnapComment, Notification } from '../models';
import { cld } from '../utils/';

//originally wanted to create nested Schema of { description: { location, caption, tags, isPublic } }, however, given how often 'snaps' collection queried, to query any of this data, it became cumbersome as I had to write 'description.propName' everywhere. The nested schema also made sense, given that only this part of a snap is actually patchable and that it well could be the only data used to query a snap from the FE (then again, FE could also query by "createdAt"...)

const snapSchema = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    caption: {
      type: String,
      trim: true,
      maxLength: [2000, 'Your caption is too long'],
      required: [true, 'Please enter a caption'],
    },
    tags: [{ type: String, trim: true }],
    isPublic: {
      type: Boolean,
      default: true,
    },
    imageIds: {
      type: [String], // Cloudinary image IDs
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

snapSchema.pre('save', async function () {
  if (!this.isNew) return;

  const snapId = this.id;
  await new SnapLike({ snapId }).save();
  //needed for likeCount field when a brand new doc is queried
});

snapSchema.post('remove', async function (deletedSnap) {
  const snapId = this.id;

  const deleteMedia = () => this.imageIds.map((id) => cld.remove(id));
  const deleteLikesDoc = () => SnapLike.deleteOne({ snapId });
  const deleteComments = () => SnapComment.deleteMany({ snapId });
  const deleteNotifications = () => Notification.deleteMany({ 'details.snapId': snapId });

  const cleanup = () =>
    Promise.all([...deleteMedia(), deleteLikesDoc(), deleteComments(), deleteNotifications()]);

  await cleanup();
});

snapSchema.post('deleteMany', async function () {
  //*** after deleting account, delete many runs and we need to do something like the above, but for all deleted posts
});

export default model('Snap', snapSchema);
