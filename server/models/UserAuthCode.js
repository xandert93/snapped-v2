import { Schema, model } from 'mongoose';

import { isObjectId } from '../utils/mongoose-utils.js';
import { genRelativeDateStr } from '../utils/helpers.js';
import { BadReqError, ConflictError } from '../utils/error-types.js';

const userAuthCodeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    authCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

userAuthCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 * 60 });

userAuthCodeSchema.statics = {
  findByUserId: async function (userId, emailType) {
    const foundDocs = await this.find({ userId }); //previously findOne, but I want to let the user have two AuthCode docs in case they fuck up email initially

    if (foundDocs.length > 1) {
      const timeAgo = genRelativeDateStr(foundDocs[1].createdAt);
      throw new ConflictError(`Your ${emailType} email was sent ${timeAgo}`);
    }
  },
  findByUserIdAndAuthCode: async function (userId, authCode, linkType) {
    if (!isObjectId(userId)) throw new BadReqError(`Your ${linkType} link is invalid`);

    const foundDoc = await this.findOne({ userId, authCode });
    if (!foundDoc) throw new BadReqError(`Your ${linkType} link has expired (or is invalid)`);
    else return foundDoc;
  },
};

export default model('UserAuthCode', userAuthCodeSchema);
