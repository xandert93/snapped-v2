import mongoose from 'mongoose';
import { AuthError } from '../../utils/error-types';

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tokens: {
    type: [String], // array of refresh JWTs, allowing multiple devices to be signed in
    required: true,
  },
});

refreshTokenSchema.statics = {
  upsert: async function (userId, token) {
    return await this.findOneAndUpdate({ userId }, { $push: { tokens: token } }, { upsert: true });
  },

  replaceToken: async function (oldToken, newToken) {
    const filteredTokenDoc = await this.findOneAndUpdate(
      { tokens: [oldToken] },
      { $pull: { tokens: oldToken } },
      { new: true }
    );

    if (!filteredTokenDoc) throw new AuthError('Your refresh token is invalid.');

    filteredTokenDoc.tokens.push(newToken);
    filteredTokenDoc.save();
  },

  deleteToken: async function (token) {
    return await this.findOneAndUpdate({ tokens: [token] }, { $pull: { tokens: token } });
  },
};

// export default mongoose.model('UserRefreshToken', refreshTokenSchema);
