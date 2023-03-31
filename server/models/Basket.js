import { Schema, model } from 'mongoose';

const itemSubSchema = new Schema(
  {
    priceId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const basketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, // every user has their own basket
      required: true,
    },
    customerId: {
      type: String, // so Stripe can locate document and clear after checkout completes
      required: true,
    },
    lineItems: {
      type: [itemSubSchema],
      default: [],
    },
  },
  { timestamps: false }
);

export default model('Basket', basketSchema);
