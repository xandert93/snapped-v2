import { Schema, model } from 'mongoose';

const detailsSubSchema = new Schema(
  {
    snapId: Schema.Types.ObjectId, //for any non-follow type i.e. any snap notification type
    imageId: String, //             same ^^^
    //for a comment
    comment: {
      _id: Schema.Types.ObjectId,
      text: String,
    },
  },
  { _id: false }
);

const notificationSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ['follow', 'like', 'comment' /* 'mention', 'share', 'report' */],
      required: true,
    },
    details: {
      type: detailsSubSchema,
      default: {}, //***for now, just so that destructurable in FE. Maybe later remove and create separate <Notification /> e.g. <DetailedNotification/> which allows image etc
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model('Notification', notificationSchema);

/*
for a snap comment and snap mention, details are: { snapId, imageId, message/text/comment }

follow does not require any details...I don't think...


Attempted to use virtuals + population (as per my notes), but it refused to work without this line. Still don't know why: https://mongoosejs.com/docs/tutorials/virtuals.html#virtuals-in-json
Even afterward, it maintained the "senderId" field which I'd need to manually remove. Instead, I just decided to use aggregation instead. Tried and tested and knew what I was getting.
Another thing is that, by using mongoose.set('debug', true), I was able to see that behind the scenes, population was actually performing a second database query: users.find({ _id: { '$in': [ recipientId ] }})
This also made me opt for aggregation.

*/
