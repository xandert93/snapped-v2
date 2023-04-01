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
