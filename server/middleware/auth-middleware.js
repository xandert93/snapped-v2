import axios from 'axios';
import { getAccessToken, verifyAccessToken } from '../utils/auth-utils';
import { AuthError, BadReqError, ForbiddenError } from '../utils/error-types';

export const ensureAuth = (req, res, next) => {
  const { method, path } = req;
  const publicRoutes = [{ method: 'POST', path: '/users' }];

  for (const route of publicRoutes) {
    if (method === route.method && path === route.path) return next();
  }

  const accessToken = getAccessToken(req);
  if (!accessToken) throw new AuthError('You have no access token');

  const { _id, customerId, isVerified, isAdmin, subscription, username, avatarId } =
    verifyAccessToken(accessToken); //expired/invalid? --> throws err

  req.userId = _id;
  req.customerId = customerId;
  req.tokenUser = { _id, username, avatarId };
  req.isUserVerified = isVerified;
  req.isUserAdmin = isAdmin;
  req.subscription = subscription;

  next();
};

export const ensureIsReqUsers = (docName, userIdField) => (req, res, next) => {
  const { userId } = req;
  const doc = req[docName];

  const isReqUsers = String(doc[userIdField]) === userId; // e.g. `snap.creatorId`, `comment.authorId` or `review.reviewerId`

  if (!isReqUsers) throw new ForbiddenError();
  else next();
};

export const ensureIsVerified = (req, res, next) => {
  if (!req.isUserVerified) throw new ForbiddenError('You must first activate your account');
  else next();
};

export const ensureIsAdmin = (req, res, next) => {
  if (!req.isUserAdmin) throw new ForbiddenError();
  else next();
};

export const ensureIsSubscriber = (req, res, next) => {
  if (['Basic', 'Pro'].includes(req.subscription.name)) next();
  else throw new ForbiddenError("You don't have a subscription");
};

export const ensureIsNotSubscriber = (req, res, next) => {
  if (req.subscription.name) throw new BadReqError("You're already subscribed");
  else next();
};

export const checkSubscriptionName = (name) => (req, res, next) => {
  if (req.subscription.name !== name) throw new ForbiddenError();
  else next();
};

//Google invisible reCAPTCHA v2:
export const ensureIsHuman = async (req, res, next) => {
  const { reCAPTCHAToken } = req.body;

  if (!reCAPTCHAToken) throw new BadReqError('You have no reCAPTCHA token');

  const { data } = await axios({
    method: 'POST',
    url: 'https://www.google.com/recaptcha/api/siteverify',
    params: { response: reCAPTCHAToken, secret: process.env.GOOGLE_RECAPTCHA_SECRET },
  });

  if (!data.success) throw new BadReqError('reCAPTCHA verification failed');
  else {
    delete req.body.reCAPTCHAToken;
    next();
  }
};
