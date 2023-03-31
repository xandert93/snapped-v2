import express from 'express';

import { ensureAuth } from '../../middleware/auth-middleware';

import userRouter from './user-router';
import snapRouter from './snap-router';
import snapCommentRouter from './snap-comment-router';
import chatRouter from './chat-router';
import chatMessageRouter from './chat-message-router';
import notificationRouter from './notification-router';
// import subscriptionRouter from './subscription-router';
import productRouter from './product-router';
import productReviewRouter from './product-review-router';
import basketRouter from './basket-router';
import orderRouter from './order-router';

const apiRouter = express.Router();

apiRouter.use(ensureAuth);
//⬆️ protects all ⬇️ routes + loads user details 🎁 (token payload) onto req

apiRouter.use('/users', userRouter);
apiRouter.use('/snaps', snapRouter);
apiRouter.use('/snap-comments', snapCommentRouter);
apiRouter.use('/chats', chatRouter);
apiRouter.use('/chat-messages', chatMessageRouter);
apiRouter.use('/notifications', notificationRouter);

// apiRouter.use('/subscriptions', subscriptionRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/product-reviews', productReviewRouter);
apiRouter.use('/baskets', basketRouter);
apiRouter.use('/orders', orderRouter);

export default apiRouter;
