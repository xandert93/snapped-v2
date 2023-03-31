import express from 'express';
import {
  getUsersBySearch,
  getProfileUser,
  getSuggestedUsers,
  deleteUser,
  updateUser,
  toggleFollow,
  updateUserPassword,
  resetUserAvatar,
  updateUserAvatar,
  updateUserProfile,
  updateUserCover,
  resetUserCover,
  getProfileSnapshot,
  getUserFollowers,
  getUserFollowing,
} from '../../controllers/user-controller';
import { loadReqUser, loadUser } from '../../middleware/user-middleware';

import { uploadImage } from '../../middleware/cloudinary-middleware';
import { handleFileUpload } from '../../middleware/multer-middleware';
import { ensureIsObjectId, loadScrollPagination } from '../../middleware/mongoose-middleware';

const userRouter = express.Router();

userRouter.get('/username/:username', getProfileUser); //:userId never used to get a user. /:username alone would clash with /:userId below
userRouter.get('/:id/snapshot', getProfileSnapshot);
userRouter.get('/search', getUsersBySearch);
userRouter.get('/suggested', getSuggestedUsers);

// CRUD - requesting user
userRouter.use('/user', loadReqUser); // load `user` document onto `req.user` for handlers below
userRouter.route('/user').patch(updateUser).delete(deleteUser);
userRouter
  .route('/user/avatarId')
  .patch(handleFileUpload('avatar-image'), uploadImage, updateUserAvatar)
  .delete(resetUserAvatar);
userRouter.patch('/user/profile', updateUserProfile);
userRouter
  .route('/user/profile/coverId')
  .patch(handleFileUpload('cover-image'), uploadImage, updateUserCover)
  .delete(resetUserCover);
/* userRouter.patch('/user/password', updateUserPassword); */ //generic update doesn't work here - "newPassword" field is needed in body. Separate route required

// CRUD - all user relations
userRouter.use('/:id', ensureIsObjectId('user')); //all handlers below use this middleware first
userRouter.patch('/:id/toggle-follow', loadUser, toggleFollow);
userRouter.get('/:id/followers/:offset', loadScrollPagination('follower'), getUserFollowers);
userRouter.get('/:id/following/:offset', loadScrollPagination('following'), getUserFollowing);

export default userRouter;
