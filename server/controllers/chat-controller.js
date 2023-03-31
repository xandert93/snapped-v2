import { Chat } from '../models/';

//GET @ '/'
export const getUsersChats = async (req, res) => {
  const { userId } = req;

  const foundChats = await Chat.find({ participantIds: userId });
  return res.json({ chats: foundChats }); //use to populate Messenger.jsx sidebar
};

//POST @ '/' + { recipientIds: Arr }
export const createChat = async (req, res) => {
  const { userId } = req;
  const { recipientIds } = req.body;

  const newChat = { participantIds: [userId, ...recipientIds] };

  const savedChat = await new Chat(newChat).save();
  return res.status(201).json({ chat: savedChat });
};

//DELETE @ '/:chatId'
export const deleteChat = async (req, res) => {
  const _id = req.params.id;

  await Chat.deleteOne({ _id });
  return res.json({ message: 'Chat deleted' });
};
