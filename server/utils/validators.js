import validator from 'validator';

export const validateEmail = validator.isEmail;
export const validateName = (str) => /^[a-z ,.'-]+$/i.test(str);
export const validateUsername = (val) => /^[a-zA-Z0-9_\.\-]*$/.test(val);
export const validateURL = (val) => (val === '' ? true : validator.isURL(val)); //accepts "x.com", so prepend 'http://' or 'https://' if not included in input

const reserved = [
  'home',
  'create',
  'notifications',
  'messages',
  'snap',
  'explore',
  'search',
  'subscription',
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
]; // ones that are less than 6 letters won't be allowed by schema anyway

export const checkUnreserved = (str) => !reserved.includes(str.toLowerCase());
