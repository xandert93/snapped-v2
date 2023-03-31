import { User, UserAuthCode } from '../models';
import { verifyRefreshToken, genTokens, setRefreshCookie } from '../utils/auth-utils';

export const activateAccount = async (req, res) => {
  const { userId, authCode } = req.body;

  await UserAuthCode.findByUserIdAndAuthCode(userId, authCode, 'activation');
  await User.updateOne({ _id: userId }, { isVerified: true });
  await UserAuthCode.deleteMany({ userId });

  const message = { title: 'Account Activated!', text: 'Time to make your first Snap!' };

  try {
    const tokenUser = verifyRefreshToken(req.cookies.refreshToken); // 1
    const [{ password, ...user }] = await User.findAggUser({ _id: toObjectId(userId) });

    const [accessToken, refreshToken] = genTokens(updatedUser);
    setRefreshCookie(res, refreshToken);
    return res.json({ message, user, accessToken });
  } catch (err) {
    return res.json({ message });
  }
};

/* 
1) We need to check if the requesting client is currently logged in by inspecting any refreshToken in the
   request's cookies. If a `tokenUser` is returned, the client is logged in and if `verifyRefreshToken` throws
   then they are not logged in. We need to catch this error, in case because it's fine.

   If logged in, we need to send the client new tokens so that they can immediately access any endpoint 
   protected by `ensureIsVerified`. Once they have the new tokens, when they hit such an endpoint, as 
  `tokenUser.isVerified === true`, they will be granted access to the next middleware.

*/
