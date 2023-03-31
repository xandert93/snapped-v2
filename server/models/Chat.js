import { Schema, model } from 'mongoose';

const chatSchema = new Schema(
  {
    participantIds: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model('Chat', chatSchema);

//participants array allows for multiple users in a single chat. More flexible.
//for two user chats -> const chat = { senderId: Schema.ObjectId, receiverId: Schema.ObjectId }

//could also have a bgColor field!
