import { Schema, model } from 'mongoose';
import Basket from './Basket';
import Product from './Product';

const addressSubSchema = new Schema(
  {
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String, // customer doesn't have to include, but FE expects a String
      default: '',
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String, // customer doesn't have to include, but FE expects a String
      default: '',
    },
    country: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const itemSubSchema = new Schema(
  {
    priceId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    checkoutId: {
      type: String,
      required: true,
    },
    lineItems: {
      type: [itemSubSchema],
      required: true,
    },
    costs: {
      subtotal: {
        type: Number, // just the total cost of goods
        required: true,
      },
      shipping: {
        type: Number,
        required: true,
      },
      total: {
        type: Number, // really needed?
        required: true,
      },
    },
    payment: {
      mode: {
        type: String,
        enum: ['payment', 'subscription', 'setup'], // 'payment' is a one-time purchase
        required: true,
      },
      method: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      last4Nums: {
        type: String,
        required: true,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      paidAt: {
        type: Date,
        required: true,
      },
    },
    shipping: {
      name: {
        type: String,
        required: true,
      },
      deliveryEst: {
        type: String,
        required: true,
      },
    },
    addresses: {
      shipping: {
        type: addressSubSchema,
        required: true,
      },
      billing: {
        type: addressSubSchema,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function () {
  if (!this.isNew) return;

  const { customerId, lineItems } = this;

  await Basket.updateOne({ customerId }, { $set: { lineItems: [] } }); // clear user's basket

  const bulkOps = lineItems.map(({ priceId, quantity }) => ({
    updateOne: {
      filter: { priceId },
      update: { $inc: { stockCount: -quantity }, $set: { lastPurchasedAt: Date.now() } },
    },
  }));

  await Product.bulkWrite(bulkOps); // adjust product stock
  // since updateMany applies the same update to all matching documents
  // how can we apply different updates to multiple documents in a single operation?
  // You can use db.collection.bulkWrite() to perform multiple operations in bulk
  //faster than multiple updateOne as there is only one round trip to MongoDB
});

export default model('Order', orderSchema);

/* Fields for another time:

    taxCost: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    deliveredAt: {
      type: Date,
    },

    // not sure what Brad (?) was trying to do with this one:
    result: {
      id: String,
      status: String,
      update_time: String,
      email: String,
    },

*/
