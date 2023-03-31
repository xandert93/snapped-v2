import validator from 'validator';

export const validateEmail = validator.isEmail;
export const validateName = (str) => /^[a-z ,.'-]+$/i.test(str);
export const validateUsername = (val) => /^[a-zA-Z0-9_\.\-]*$/.test(val);
export const validateURL = (val) => (val === '' ? true : validator.isURL(val)); //accepts "x.com", so prepend 'http://' or 'https://' if not included in input

const reserveds = [
  'home',
  'create',
  'notifications',
  'messages',
  'snap',
  'explore',
  'search',
  'products',
  'orders',
  'basket',
  'shop',
  'account',
  'profile',
  'settings',
  'auth',
  'activation',
  '404',
]; //*** maybe remove ones that are less than 6 letters since schema won't permit anyway
export const checkUnreserved = (str) => !reserveds.some((el) => el === str.toLowerCase());
