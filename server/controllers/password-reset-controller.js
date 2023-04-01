import { User, UserAuthCode } from '../models/index.js';

import { createAndSendEmail } from '../utils/nodemailer.js';
import { genRandomString, genURLWithParams, getClientOrigin } from '../utils/helpers.js';
import { NotFoundError } from '../utils/error-types.js';

export const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  const foundUser = await User.findByCredential({ email });
  if (!foundUser) throw new NotFoundError('account');
  const userId = foundUser._id;

  await UserAuthCode.findByUserId(userId, 'password reset'); //rejects if authCode doc found

  const authCode = genRandomString(10); //e.g. OP: "adb7a19763"
  await new UserAuthCode({ userId, authCode }).save();

  //twitter asked me for email, then sent a code to email. Then showed me input field for me to paste received code. Seems a common alternative.

  const resetPasswordURL = genURLWithParams(`${getClientOrigin(req)}/auth/password-reset`, {
    userId,
    authCode,
  });
  const requestAnotherURL = `${getClientOrigin(req)}/auth/forgot-password`;

  const emailData = {
    recipient: foundUser,
    subject: 'snapped! - Password Reset',
    htmlMessage: `<p>Thank you for requesting a password change for your snapped! account.</p> 
                    <p>To complete the process just click on the button below. This link will expire after 10 minutes:</p>
                    <a href="${resetPasswordURL}" target="_blank"><button>Reset Password</button></a>
                    <p>If your link has expired, <a href="${requestAnotherURL}" target="_blank">request another</a>.</p>
                    <p>If you did not make this request, please ignore this email. It is likely another user has entered your email address by mistake; your account is still secure.</p>
                   `,
    emailType: 'Password reset',
  };

  const title = await createAndSendEmail(emailData);
  res.json({ message: { title, text: 'Please check your inbox' } });
};

export const resetPassword = async (req, res) => {
  const { userId } = req;
  const { password, passwordConfirm } = req.body;

  const foundUser = await User.findById(userId);
  foundUser.password = password;
  foundUser.passwordConfirm = passwordConfirm;
  const updatedUser = await foundUser.save();

  await UserAuthCode.deleteMany({ userId });

  return res.json({
    message: {
      title: 'Your password has been reset!',
      text: 'You can now log in with your new credentials',
    },
  });
};
