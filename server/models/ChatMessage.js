import { Schema, model } from 'mongoose';

//const message = { chatId: "the chat doc I belong too", senderId, message }

const chatMessageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default model('ChatMessage', chatMessageSchema);
