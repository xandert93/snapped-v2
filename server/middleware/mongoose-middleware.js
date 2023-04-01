import { NotFoundError } from '../utils/error-types.js';
import { isObjectId } from '../utils/mongoose-utils.js';

export const ensureIsObjectId = (docName) => (req, res, next) => {
  const { id } = req.params;

  if (isObjectId(id)) next();
  else throw new NotFoundError(docName);
};

//*** The max amount to retrieve for each request. just for testing pagination with only a few resources. Set to something more realistic eventually
const limits = {
  // Products
  product: 1,
  // Product Reviews
  review: 3,

  // Snaps
  feed: 10,
  profile: 12,
  explore: 12,

  // Snap Comments
  comment: 10,

  // Snap Likers
  liker: 10,

  // User Relations
  follower: 10,
  following: 10,

  // Notifications
  notification: 10,
};

export const loadPagination = (type) => (req, res, next) => {
  const pageNum = Number(req.query.page) || 1;
  const sort = req.query.sort === 'asc' ? 1 : -1;
  const limit = limits[type];

  const offset = (pageNum - 1) * limit;

  req.pagination = { offset, limit, sort };
  next();
};

export const loadScrollPagination = (type) => (req, res, next) => {
  const $limit = limits[type];
  const $skip = Number(req.params.offset) || 0;

  // implement `sort` another time

  req.pagination = { $skip, $limit };
  next();
};
