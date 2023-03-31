import express from 'express';
import {
  createMessage,
  deleteMessage,
  getChatMessages,
} from '../../controllers/chat-message-controller';

const messageRouter = express.Router();

messageRouter.route('/').post(createMessage).get(getChatMessages);

messageRouter.route('/:id').delete(deleteMessage);

export default messageRouter;
