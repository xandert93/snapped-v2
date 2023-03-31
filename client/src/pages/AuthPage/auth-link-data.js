import { PATHS } from '../../constants/routing-constants';

class LinkData {
  constructor(...args) {
    this.pretext = args[0];
    this.href = args[1];
    this.text = args[2];
  }
}

const LINKS = {
  login: new LinkData('Already registered?', PATHS.LOGIN, 'Log in'),
  register: new LinkData("Don't have an Account?", PATHS.REGISTRATION, 'Sign up!'),
  forgotPassword: new LinkData('Forgotten your Password?', PATHS.FORGOT_PASSWORD, 'Reset it!'),
  passwordReset: new LinkData('Remembered password?', PATHS.LOGIN, 'Log in'),
};

export const pathnameToLinkData = {
  [PATHS.REGISTRATION]: [LINKS.login],
  [PATHS.LOGIN]: [LINKS.register, LINKS.forgotPassword],
  [PATHS.FORGOT_PASSWORD]: [LINKS.passwordReset],
  [PATHS.PASSWORD_RESET]: [LINKS.passwordReset],
};
