import { Schema, model } from 'mongoose';

const productReviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      maxLength: [300, 'Your password must comprise 6 characters'],
      required: true,
    },
  },
  { timestamps: { createdAt: false } }
);

productReviewSchema.index({ productId: 1, reviewerId: 1 }, { unique: true }); // 1

export default model('ProductReview', productReviewSchema);

/*
  1) Creates a compound index consisting of productId and reviewerId pairs. 
     Together, the pair must be unique, otherwise MongoServerError ("duplicate key") 
     will be thrown. This ensures that a user cannot create a new review for a 
     product that they've already reviewed

*/
