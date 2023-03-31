import { ChatMessage } from '../models/';

import { toObjectId } from '../utils/mongoose-utils';
import { NotFoundError } from '../utils/error-types';

//GET @ '/?chatId=_'
export const getChatMessages = async (req, res) => {
  const chatId = toObjectId(req.query.chatId);
  const userId = toObjectId(req.userId);

  const chatMessagePipeline = [
    { $match: { chatId } },
    {
      $addFields: {
        isSentByUser: { $eq: ['$senderId', userId] },
      },
    },
    { $unset: ['chatId', 'senderId', '__v'] },
  ];

  const foundChatMessages = await ChatMessage.aggregate(chatMessagePipeline);
  if (!foundChatMessages) throw new NotFoundError('chat');
  else return res.json({ chatMessages: foundChatMessages });
};

//POST @ '/' + { chatId, senderId, text }
export const createMessage = async (req, res) => {
  const { chatId, text } = req.body;
  const senderId = req.userId;

  const newMessage = new ChatMessage({ chatId, senderId, text });

  const savedMessage = await newMessage.save();

  return res.status(201).json({ chatMessage: savedMessage });
};

//DELETE @ '/:id'
export const deleteMessage = async (req, res) => {
  const _id = req.params.id;

  await ChatMessage.deleteOne({ _id });
  return res.json({ message: 'Message deleted' });
};
