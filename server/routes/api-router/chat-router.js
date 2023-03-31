import express from 'express';
import { getUsersChats, createChat, deleteChat } from '../../controllers/chat-controller';

const chatRouter = express.Router();

chatRouter.route('/').post(createChat).get(getUsersChats);

chatRouter
  .route('/:id')
  .patch(() => {})
  .delete(deleteChat);

export default chatRouter;
