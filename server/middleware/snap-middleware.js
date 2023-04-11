import rateLimit from 'express-rate-limit';

import { Snap, SnapComment } from '../models/index.js';
import { NotFoundError } from '../utils/error-types.js';

export const loadSnap = async (req, res, next) => {
  const { id } = req.params;

  const foundSnap = await Snap.findById(id);
  if (!foundSnap) throw new NotFoundError('snap');

  req.snap = foundSnap;
  next();
};

export const loadSnapComment = async (req, res, next) => {
  const { id } = req.params;

  const foundComment = await SnapComment.findById(id);
  if (!foundComment) throw new NotFoundError('comment');

  req.comment = foundComment;
  next();
};

export const rateLimitCreateSnap = rateLimit({
  max: (req, res) => {
    const isSubscriber = Boolean(req.subscription.name);

    return isSubscriber ? 0 : 1;
  },
  windowMs: 24 * 60 * 60 * 1000,
  message: 'Subscribe to snapped+ to post more 😃',
});
