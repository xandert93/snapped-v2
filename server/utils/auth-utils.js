import jwt from 'jsonwebtoken';
import axios from 'axios';
import GoogleAuth from 'google-auth-library';
import { AuthError } from './error-types';
import { cld } from '.';

const {
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  GOOGLE_CLIENT_ID: audience,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = process.env;

const refreshExpiresIn = 60 * 60 * 24 * 7; // 7 days (s)

export function genTokens(user) {
  const tokenUser = {
    _id: user._id,
    customerId: user.customerId,
    username: user.username,
    avatarId: user.avatarId,
    isVerified: user.isVerified,
    isAdmin: user.isAdmin,
    subscription: { name: user.subscription.name },
  }; // 1

  const accessConfig = { expiresIn: '10m' };
  const refreshConfig = { expiresIn: refreshExpiresIn }; //user has 7d to reauthorise, or they have to login again

  const accessToken = jwt.sign(tokenUser, ACCESS_TOKEN_SECRET, accessConfig);
  const refreshToken = jwt.sign(tokenUser, REFRESH_TOKEN_SECRET, refreshConfig);

  return [accessToken, refreshToken];
}

/* 1) This way, whenever user makes a request with their access token, we can decode this 
      `tokenUser`, attach it onto req.tokenUser and use it's values when we need. 
      This is much more efficient than having to locate the user on the DB with every 
      request. Most of the time, we just need the requesting user's ID, however the extra
      data is also *very* useful too.
*/

export const getAccessToken = (req) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.startsWith('Bearer') && authHeader.split(' ')[1];
  return accessToken;
};

export const verifyAccessToken = (token) => jwt.verify(token, ACCESS_TOKEN_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, REFRESH_TOKEN_SECRET);

export const setRefreshCookie = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    maxAge: 1000 * refreshExpiresIn,
    secure: NODE_ENV === 'production',
  });
};

//Google OAuth:
const oAuthClient = new GoogleAuth.OAuth2Client(audience);

export async function verifyGoogleIdToken(idToken) {
  try {
    const loginTicket = await oAuthClient.verifyIdToken({ idToken, audience }); // => `LoginTicket`=Object
    return loginTicket.getPayload();
  } catch (err) {
    throw new AuthError('Invalid Google token signature');
  }
}

export const genGoogleUser = async (data) => {
  const avatarId = await cld.uploadAvatar(data.picture);

  return {
    googleId: data.sub,
    firstName: data.given_name,
    lastName: data.family_name,
    email: data.email,
    username: data.email.split('@')[0],
    isVerified: data.email_verified,
    avatarId,
  };
};

//Facebook OAuth
export function verifyFacebookInputToken(inputToken) {
  //input_token is user's FE access token issued by FB & access_token is our App ID + App Secret. Request below decodes the user's access token
  return axios({
    url: 'https://graph.facebook.com/debug_token',
    params: { input_token: inputToken, access_token: FACEBOOK_APP_ID + '|' + FACEBOOK_APP_SECRET },
  });
}

export const genFacebookUser = async (data) => {
  const [firstName, ...lastNames] = data.name.split(' ');
  const avatarId = await cld.uploadAvatar(data.picture.data.url);

  return {
    facebookId: data.userID,
    firstName,
    lastName: lastNames.join(' '),
    email: data.email,
    username: data.email.split('@')[0],
    isVerified: true,
    avatarId,
  };
};
