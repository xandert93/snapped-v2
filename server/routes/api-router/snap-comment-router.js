import express from 'express';
import {
  getSnapComments,
  createSnapComment,
  deleteSnapComment,
  updateSnapComment,
} from '../../controllers/snap-comment-controller.js';

import { loadSnap, loadSnapComment } from '../../middleware/snap-middleware.js';
import { ensureIsObjectId, loadScrollPagination } from '../../middleware/mongoose-middleware.js';
import { ensureIsReqUsers } from '../../middleware/auth-middleware.js';

const commentRouter = express.Router();

commentRouter.use('/snap/:id', ensureIsObjectId('snap'));
commentRouter.post('/snap/:id', loadSnap, createSnapComment);
commentRouter.get('/snap/:id/:offset', loadScrollPagination('comment'), getSnapComments);

commentRouter.use(
  '/:id',
  ensureIsObjectId('comment'),
  loadSnapComment,
  ensureIsReqUsers('comment', 'authorId')
);
commentRouter.route('/:id').patch(updateSnapComment).delete(deleteSnapComment);

export default commentRouter;
