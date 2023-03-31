import { UserAuthCode } from '../models';

import rateLimit from 'express-rate-limit';

export const verifyPasswordResetCredentials = async (req, res, next) => {
  const { method, path } = req;
  const { userId, authCode } = req.body;

  await UserAuthCode.findByUserIdAndAuthCode(userId, authCode, 'password reset');

  if (method === 'PATCH' && path === '/password-reset/reset') {
    req.userId = userId;
    return next();
  } else res.sendStatus(200);
};

export const rateLimitPasswordReset = rateLimit({
  max: 2,
  windowMs: 24 * 60 * 60 * 1000,
  message: 'Daily password reset request limit exceeded',
});

/*
Client clicks activation link -> taken to FE -> activation component mounts, requests to '/password-reset/verify' (comes here)...
... if userId and authCode provided by the client are valid, just a 200 status sent back to FE. This in turn displays 
password reset page. When user resets password, requests to '/password-reset/reset' (comes here again)...

Again, if userId and authCode remain valid, this time, userId is loaded onto req, req is forwarded to the "resetPassword" controller.
This locates the user with the userId and then applies the password changes from the original request body.
*/
