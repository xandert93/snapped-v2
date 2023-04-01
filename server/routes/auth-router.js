import express from 'express';
import { ensureUnverified, sendActivationEmail } from '../middleware/activation-middleware.js';
import { ensureAuth, ensureIsHuman } from '../middleware/auth-middleware.js';
import {
  rateLimitPasswordReset,
  verifyPasswordResetCredentials,
} from '../middleware/password-reset-middleware.js';
import { activateAccount } from '../controllers/activation-controller.js';

import {
  checkEmailOrUsername,
  register,
  standardLogin,
  googleLogin,
  facebookLogin,
  reauthorise,
  logout,
  reauthenticate,
} from '../controllers/auth-controller.js';

import { resetPassword, sendPasswordResetEmail } from '../controllers/password-reset-controller.js';

const authRouter = express.Router();

authRouter.post('/check-email-or-username', checkEmailOrUsername);
authRouter.post('/register', ensureIsHuman, register, sendActivationEmail); //redirects to "/login" after email sent
authRouter.post('/login', standardLogin);
authRouter.post('/login/google', googleLogin);
authRouter.post('/login/facebook', facebookLogin);
authRouter.get('/reauthorise', reauthorise);
authRouter.get('/reauthenticate', reauthenticate);
authRouter.delete('/logout', logout);

authRouter.patch('/activation/activate', activateAccount); //if user clicks on <a> in email, should be a "GET". Alternatively, we would need to implement a "POST" form in the activation email
authRouter.get('/activation/rerequest-email', ensureAuth, ensureUnverified, sendActivationEmail); //must be logged in to re-request activation email

authRouter.post('/password-reset/request-email', rateLimitPasswordReset, sendPasswordResetEmail);
authRouter.post('/password-reset/verify', verifyPasswordResetCredentials);
authRouter.patch('/password-reset/reset', verifyPasswordResetCredentials, resetPassword);

export { authRouter };
