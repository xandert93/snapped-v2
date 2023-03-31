import { User, UserAuthCode } from '../models';
import { createAndSendEmail } from '../utils/nodemailer';
import { genRandomString, genURLWithParams, getClientOrigin } from '../utils/helpers';
import { ForbiddenError } from '../utils/error-types';

//protected route
export const sendActivationEmail = async (req, res) => {
  const { userId } = req;
  let { currentUser } = req; //only present after "register" middleware

  await UserAuthCode.findByUserId(userId, 'activation'); //rejects if authCode doc found
  const authCode = genRandomString(10); //e.g. OP: "adb7a19763"
  await new UserAuthCode({ userId, authCode }).save();

  const activationURL = genURLWithParams(`${getClientOrigin(req)}/activation`, {
    userId,
    authCode,
  }); //code received is unique to their email inbox

  if (!currentUser) currentUser = await User.findById(userId); //if not from '/register'

  const emailData = {
    recipient: currentUser,
    subject: 'snapped! - Account Activation',
    htmlMessage: `<p>Welcome to snapped!</p> 
                    <p>To activate your account, just click on the button below. This link will expire after 10 minutes:</p>
                    <a href="${activationURL}" target="_blank"><button>Activate Account</button></a>
                   `,
    emailType: 'Activation',
  };

  const title = await createAndSendEmail(emailData);

  if (req.method === 'GET' && req.path === '/activation/rerequest-email')
    return res.json({ message: { title, text: 'Please check your inbox' } });
  else return res.redirect(307, '/auth/login');
};

export const ensureUnverified = (req, res, next) => {
  const { isUserVerified } = req; //in case client goes back to tab where they were not "verified" after verification and hits the "send activation email" button
  if (isUserVerified)
    throw new ForbiddenError("You're already activated! Please refresh this page!");
  else next();
};
