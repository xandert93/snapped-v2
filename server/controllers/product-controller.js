import { Product } from '../models';
import { toObjectId } from '../utils/mongoose-utils';
import {
  getOneTimeCheckoutSession,
  genShippingOptions,
  getSubscriptionCheckoutSession,
  getShippingRates,
  getBillingSession,
  sortShippingRates,
} from '../utils/stripe-utils';

// GET @ '/'
export const getProducts = async (req, res) => {
  //*** obviously add some kind of pagination too - page number or an offset
  const foundProducts = await Product.find();

  return res.json({ products: foundProducts });
};

// GET @ '/one-time'
export const getOneTimeProducts = async (req, res) => {
  const { offset, limit, sort } = req.pagination;

  const productPipeline = [
    { $match: { recurrence: { $exists: false } } }, // exclude non-subscription products
    { $unset: ['description', 'features', '__v'] },
    { $sort: { createdAt: sort } },
    {
      $facet: {
        metadata: [{ $count: 'productCount' }],
        data: [
          { $skip: offset },
          { $limit: limit },
          {
            $lookup: {
              from: 'productreviews',
              let: { id: '$_id' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$id', '$productId'] } } },
                { $project: { _id: 0, rating: 1 } },
                { $group: { _id: null, average: { $avg: '$rating' }, count: { $count: {} } } }, // returns { average, count }, which will be our FE's `rating` object
                { $project: { _id: 0 } },
              ],
              as: 'ratingDataArr',
            },
          },
          // ↓ not sure if this is most efficient, but don't care for now. Can't use "$unwind", though - if product has no reviews, then $unwind would remove product document from pipeline (undesired!)
          {
            $addFields: {
              rating: {
                $ifNull: [{ $arrayElemAt: ['$ratingDataArr', 0] }, { average: 0, count: 0 }],
              },
            },
          },
          { $unset: ['ratingDataArr'] },
        ],
      },
    },
  ];

  const [
    {
      data: foundProducts,
      metadata: [{ productCount = 0 }], // in case there are no products
    },
  ] = await Product.aggregate(productPipeline);

  const pageCount = Math.ceil(productCount / limit);

  return res.json({ pageCount, products: foundProducts });
};

/*  1) Brad also included logic for handling a search term, which I haven't incorporated yet in my FE
 
        const filter = {};

        const searchTerm = req.query.q;
          
        if (searchTerm) {
          const productNameRegex = new RegExp(searchTerm, 'i');
          filter.name = productNameRegex;

      2) Lama had query parameters for filtering e.g.:

        const { latest, category, size, brand, color, rating, price } = req.query // latest=Bool
        
        const filter = {}

        if (category) filter.categories = category
        if (size) filter.size = size
        if (rating) filter.rating = { $gte: rating }

  } */

// GET @ '/recurring'
export const getSubscriptionProducts = async (req, res) => {
  const foundProducts = await Product.find({ recurrence: { $exists: true } }); // only subscription products

  return res.json({ products: foundProducts });
};

// POST @ '/one-time/purchase' + items
export const createOneTimeCheckout = async (req, res) => {
  const { userId, customerId } = req;
  const items = req.body; // => [{ priceId, quantity }, ...]

  const rates = await getShippingRates();
  sortShippingRates(rates);
  const options = genShippingOptions(rates);

  const session = await getOneTimeCheckoutSession({
    customerId,
    items,
    shipping: { options, countries: ['GB'] },
    metadata: { userId },
  });

  return res.json({ checkoutURL: session.url });
};

// POST @ '/recurring/purchase' + { priceId }
export const createSubscriptionCheckout = async (req, res) => {
  const { userId, customerId } = req;
  const { priceId } = req.body;

  const session = await getSubscriptionCheckoutSession({
    customerId,
    priceId,
    metadata: { userId },
  });

  return res.json({ checkoutURL: session.url });
};

// POST @ '/recurring/manage'
export const createBillingSession = async (req, res) => {
  const { customerId } = req;

  const session = await getBillingSession(customerId);

  return res.json({ billingURL: session.url });
};

// GET @ '/:id'
export const getProduct = async (req, res) => {
  const _id = toObjectId(req.params.id);
  const { customerId } = req;

  const productPipeline = [
    { $match: { _id } },
    { $unset: ['__v'] },

    // add `lastOrderByUser`={ _id, createdAt } field based on orders collection (this $lookup is well written ✅)
    {
      $lookup: {
        let: { priceId: '$priceId' },
        from: 'orders',
        pipeline: [
          { $match: { $expr: { $eq: [customerId, '$customerId'] } } },
          { $match: { $expr: { $in: ['$$priceId', '$lineItems.priceId'] } } },
          { $sort: { createdAt: -1 } }, // newest first
          { $limit: 1 }, // only return the newest order
          { $project: { createdAt: 1 } }, // just tell user when they last bought product and the order ID i.e. {  }
        ],
        as: 'orderDocs', // only returns single document
      },
    },
    { $addFields: { lastOrderByUser: { $arrayElemAt: ['$orderDocs', 0] } } },
    { $unset: ['orderDocs'] },

    //*** ↓ identical logic to `getProducts` (could maybe refactor into a `calculateAvgRatingStage`)
    {
      $lookup: {
        from: 'productreviews',
        let: { id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$id', '$productId'] } } },
          { $project: { _id: 0, rating: 1 } },
          { $group: { _id: null, average: { $avg: '$rating' }, count: { $count: {} } } }, // returns { average, count }, which will be our FE's `rating` object
          { $project: { _id: 0 } },
        ],
        as: 'ratingDataArr',
      },
    },
    // ↓ not sure if this is most efficient, but don't care for now. Can't use "$unwind", though - if product has no reviews, then $unwind would remove product document from pipeline (undesired!)
    {
      $addFields: {
        rating: { $ifNull: [{ $arrayElemAt: ['$ratingDataArr', 0] }, { average: 0, count: 0 }] }, // if there were no product reviews, provide default `rating` object for FE use
      },
    },
    { $unset: ['ratingDataArr'] },
  ];

  const [foundProduct] = await Product.aggregate(productPipeline);

  return res.json({ product: foundProduct });
};

// PATCH @ '/:id'
export const updateProduct = async (req, res) => {
  // currently carried out by webhook handler
};

// DELETE @ '/:id'
export const deleteProduct = async (req, res) => {
  // currently carried out by webhook handler
};
