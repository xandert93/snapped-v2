import { ProductReview } from '../models/index.js';
import { toObjectId } from '../utils/mongoose-utils.js';

export const createProductReview = async (req, res) => {
  const { userId, product, tokenUser } = req;
  const { rating, text } = req.body;

  const newReview = new ProductReview({
    reviewerId: userId,
    productId: product._id,
    rating,
    text,
  });

  const savedReview = await newReview.save();

  //FE expects aggregated format:
  const aggReview = {
    ...savedReview.toObject(),
    reviewerId: undefined,
    reviewer: tokenUser,
  };

  return res.status(201).json({ message: 'Review created!', review: aggReview });
};

export const getProductReviews = async (req, res) => {
  const { offset, limit } = req.pagination;
  const productId = toObjectId(req.params.id);

  // needs pagination

  const pipeline = [
    { $match: { productId } },
    { $unset: ['__v'] },
    { $sort: { updatedAt: -1 } },
    {
      $facet: {
        metadata: [{ $count: 'reviewCount' }],
        data: [
          { $skip: offset },
          { $limit: limit },
          {
            $lookup: {
              from: 'users',
              let: { reviewerId: '$reviewerId' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$reviewerId'] } } },
                { $project: { avatarId: 1, username: 1 } },
              ],
              as: 'reviewer',
            },
          },
          { $unwind: '$reviewer' },
          { $unset: ['reviewerId'] },
        ],
      },
    },
  ];

  const [
    {
      metadata: [{ reviewCount }],
      data: foundReviews,
    },
  ] = await ProductReview.aggregate(pipeline);

  const pageCount = Math.ceil(reviewCount / limit);

  return res.json({ pageCount, reviews: foundReviews });
};

export const updateProductReview = async (req, res) => {
  const { review } = req;
  const { rating, text } = req.body;

  review.rating = rating;
  review.text = text;

  const updatedReview = await review.save();

  return res.json({ message: 'Review updated' });
};

export const deleteProductReview = async (req, res) => {
  const { review } = req;

  const deletedReview = await review.remove();

  return res.json({ message: 'Review deleted' });
};
