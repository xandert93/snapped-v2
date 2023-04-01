import express from 'express';

import {
  getFeedSnaps,
  getProfileSnaps,
  getPrivateProfileSnaps,
  getHashtagSnaps,
  getSuggestedSnaps,
  getSearchSnaps,
  getSnap,
  createSnap,
  updateSnap,
  deleteSnap,
  toggleSnapLike,
  getSnapLikers,
  getHashtagSnapCount,
} from '../../controllers/snap-controller.js';

import { loadSnap } from '../../middleware/snap-middleware.js';
import { handleFilesUpload } from '../../middleware/multer-middleware.js';
import { ensureUserIdMatch } from '../../middleware/user-middleware.js';
import { ensureIsObjectId, loadScrollPagination } from '../../middleware/mongoose-middleware.js';
import { ensureIsReqUsers } from '../../middleware/auth-middleware.js';
import { uploadImages } from '../../middleware/cloudinary-middleware.js';

const snapRouter = express.Router();

//aggregated snaps include aggregated fields, such as "creator", "likeCount", "isLiked", "comments" etc.

const MAX_IMAGE_COUNT = 5;

snapRouter.post('/', handleFilesUpload('snap-image', MAX_IMAGE_COUNT), uploadImages, createSnap);
snapRouter.get('/feed/:offset', loadScrollPagination('feed'), getFeedSnaps);
snapRouter.get('/suggested', getSuggestedSnaps);

snapRouter.use('/user/:id', ensureIsObjectId('user'));
snapRouter.get('/user/:id/:offset', loadScrollPagination('profile'), getProfileSnaps);
snapRouter.get(
  '/user/:id/private/:offset',
  ensureUserIdMatch,
  loadScrollPagination('profile'),
  getPrivateProfileSnaps
);

snapRouter.get('/hashtags/:tags/count', getHashtagSnapCount);
snapRouter.get('/hashtags/:tags/:offset', loadScrollPagination('explore'), getHashtagSnaps);
snapRouter.get('/search', getSearchSnaps);

snapRouter.use('/:id', ensureIsObjectId('snap'));
snapRouter.get('/:id', getSnap); // returns aggregated snap to client
snapRouter.get('/:id/likers/:offset', loadScrollPagination('liker'), getSnapLikers);

snapRouter.use('/:id', loadSnap); // load mongoose snap onto `req.foundSnap` for handlers below for UD
snapRouter.patch('/:id/toggle-like', toggleSnapLike);
snapRouter.use('/:id', ensureIsReqUsers('snap', 'creatorId'));
snapRouter.route('/:id').patch(updateSnap).delete(deleteSnap);

export default snapRouter;
