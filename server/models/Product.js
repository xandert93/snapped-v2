import { Schema, model } from 'mongoose';
import { ForbiddenError, NotFoundError } from '../utils/error-types';

const productSchema = new Schema(
  {
    productId: {
      type: String, // only here for Stripe webhook Product CRUD, whose events only contain `productId`, which we pass to Model methods to locate product in DB
      required: true,
    },
    priceId: {
      type: String,
      default: '', // gets belatedly set, so can't be required
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageURLs: {
      type: [String],
      required: true,
      validate: [(imageURLs) => imageURLs.length <= 3, 'You can provide up to 3 images'],
    },
    features: {
      type: [String],
      default: ['Very, very good', 'Very, very cheap', 'One Pound Fiiiish'],
      validate: [(features) => features.length <= 5, 'You can provide up to 5 features'],
    },
    stockCount: {
      type: Number,
      min: 0,
      required: true,
    },
    price: {
      type: Number, // in pennies, since this is what Stripe works with
      default: 0, // gets belatedly set, so can't be required
    },
    lastPurchasedAt: {
      type: Date, // for one-time products, gets set after each order completes, so can't be required
    },
    // only on "subscription" products:
    recurrence: {
      interval: String,
      intervalCount: Number, // e.g. $10 {intervalCount} times a {interval}
      trialDayCount: Number,
    },
  },
  { timestamps: true }
);

productSchema.statics = {
  checkStock: async function (priceId, quantity) {
    const product = await this.findOne({ priceId });

    if (!product) throw new NotFoundError('product');
    else if (quantity > product.stockCount) throw new ForbiddenError('Insufficient stock');

    return product;
  },
};

export default model('Product', productSchema);

/* Fields for another time:

    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
);

*/
