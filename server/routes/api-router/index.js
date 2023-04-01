import express from 'express';

import { ensureAuth } from '../../middleware/auth-middleware.js';

import userRouter from './user-router.js';
import snapRouter from './snap-router.js';
import snapCommentRouter from './snap-comment-router.js';
import chatRouter from './chat-router.js';
import chatMessageRouter from './chat-message-router.js';
import notificationRouter from './notification-router.js';
// import subscriptionRouter from './subscription-router.js';
import productRouter from './product-router.js';
import productReviewRouter from './product-review-router.js';
import basketRouter from './basket-router.js';
import orderRouter from './order-router.js';

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

export { apiRouter };
