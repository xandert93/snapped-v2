import { User } from '../models';
import {
  genTokens,
  verifyGoogleIdToken,
  genGoogleUser,
  verifyFacebookInputToken,
  genFacebookUser,
  verifyRefreshToken,
  setRefreshCookie,
} from '../utils/auth-utils';

import { checkUnreserved } from '../utils/validators';
import { AuthError, BadReqError, ConflictError } from '../utils/error-types';
import { toObjectId } from '../utils/mongoose-utils';

/* let refreshTokens = []; */

export const checkEmailOrUsername = async (req, res) => {
  const { email, username } = req.body;
  const type = email ? 'Email' : 'Username';

  if (!email && !username) throw new BadReqError('Please enter a valid credential');
  if (username && !checkUnreserved(username)) throw new BadReqError('That username is forbidden'); //*** feels a bit shit (is there a way to inverse "enum"?)

  const foundUser = await User.findByCredential(req.body);
  if (foundUser) throw new ConflictError(`${type} is already in use`);
  else res.json({ message: `${type} is available ✔️` });
};

//POST @ '/register' + { firstName, lastName, email, username, password, passwordConfirm }
export const register = async (req, res, next) => {
  const userData = req.body;
  const newUser = new User(userData);

  const savedUser = await newUser.save(); //as per model, throws err if email/username is not "unique: true"
  req.userId = savedUser.id;
  req.currentUser = savedUser;
  next();
};

//freshly registered --> POST @ '/login' + { username, email, password}
//already registered --> POST @ '/login' + { emailOrUsername, password}
export const standardLogin = async (req, res) => {
  const { email, emailOrUsername, password } = req.body;
  const credential = email || emailOrUsername;

  const user = await User.authenticate(credential, password); // aggregated user (PJO)

  const message = {
    title: email ? 'Account created! 😊' : 'Signed in 👋',
    text: email ? 'Check your inbox to activate your account' : `Welcome back, ${user.firstName}!`,
  };

  // for a freshly registered account
  if (email) user._isNew = true;

  const [accessToken, refreshToken] = genTokens(user);
  // await insertion of new token in DB
  setRefreshCookie(res, refreshToken);
  return res.json({ message, user, accessToken });
};

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;

  const userData = await verifyGoogleIdToken(idToken);
  let [user] = await User.findAggUser({ googleId: userData.sub });

  const message = {
    title: !user ? 'Account created! 😊' : 'Signed in 👋',
    text: !user ? '' : `Welcome back, ${user.firstName}!`,
  };

  if (!user) {
    const googleUser = await genGoogleUser(userData);
    user = await new User(googleUser).save();

    user = user.toObject(); //so we can add aggregated properties to it
    user._isNew = true;
    ['snapCount', 'followCount', 'followerCount'].forEach((key) => (user[key] = 0));
  }

  const [accessToken, refreshToken] = genTokens(user);
  setRefreshCookie(res, refreshToken);
  return res.json({ message, user, accessToken });
};

export const facebookLogin = async (req, res) => {
  const { inputToken, userData } = req.body;

  await verifyFacebookInputToken(inputToken);
  let [user] = await User.findAggUser({ facebookId: userData.userID });

  const message = {
    title: !user ? 'Account created! 😊' : 'Signed in 👋',
    text: !user ? '' : `Welcome back, ${user.firstName}!`,
  };

  if (!user) {
    const facebookUser = await genFacebookUser(userData);
    user = await new User(facebookUser).save();

    user = user.toObject(); //so we can add aggregated properties to it
    user._isNew = true;
    ['snapCount', 'followCount', 'followerCount'].forEach((key) => (user[key] = 0));
  }

  const [accessToken, refreshToken] = genTokens(user);
  setRefreshCookie(res, refreshToken);
  return res.json({ message, user, accessToken });
};

//GET @ '/reauthenticate'
export const reauthenticate = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new AuthError('You do not have a refresh token');

  const tokenUser = verifyRefreshToken(refreshToken);
  const [{ password, ...foundUser }] = await User.findAggUser({ _id: toObjectId(tokenUser._id) });

  const [newAccessToken, newRefreshToken] = genTokens(foundUser);
  setRefreshCookie(res, newRefreshToken); // overwrites previous of same name

  return res.json({ accessToken: newAccessToken, user: foundUser });
};

//GET @ '/reauthorise'
export const reauthorise = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new AuthError('You do not have a refresh token');

  const tokenUser = verifyRefreshToken(refreshToken); // contains unnecessary { iat, exp }

  const [newAccessToken, newRefreshToken] = genTokens(tokenUser);
  setRefreshCookie(res, newRefreshToken);

  return res.json({ accessToken: newAccessToken });
};

//DELETE @ '/logout'
export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.sendStatus(204); //1
  // await deletion of old token in DB. If no token record found, then //2
  else res.clearCookie('refreshToken');
  return res.json({ message: { title: 'Logged out 👋', text: 'Until next time!' } });

  /* Facilitate logout, despite lack of valid token:
    1) e.g. if their token expired and browser deleted it. This does create issue of expired token pile-up in the database, though...
    2) token wasn't in DB e.g. since token was gibberish or had already been removed from DB (i.e. attacker trying to reuse)

    Failed logout message could be: 'Failed to log you out. Please try again'
  */
};
