import validator from 'validator';
import zxcvbn from 'zxcvbn';

export const validateName = (str) => /^[a-z ,.'-]+$/i.test(str);
export const validateEmail = validator.isEmail;
export const validateUsername = (str) => /^[a-zA-Z0-9_\.\-]*$/.test(str);

export const validateEmailOrUsername = (str) => {
  return validateUsername(str) || validateEmail(str);
};

export const validateURL = validator.isURL;

export const validateCredential = (type, credential) => {
  if (type === 'email' && !validateEmail(credential)) {
    throw 'Please enter a valid email address';
  } else if (type === 'username' && !validateUsername(credential)) {
    throw 'Please enter a valid username';
  }
};

export const checkPasswordStrength = (str) => zxcvbn(str);

export const validatePasswords = (password1, password2, minLength) => {
  const isMinLength = password1.length >= minLength;
  const areFilled = Boolean(password1 && password2);
  const areMatching = !areFilled ? true : password1 === password2;

  const areValid = isMinLength && areFilled && areMatching;

  return { areValid, areMatching };
};
