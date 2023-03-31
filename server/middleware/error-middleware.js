import _ from 'lodash';
import { RequestError } from '../utils/error-types';

export const clientErrorResponder = (err, req, res, next) => {
  const { statusCode, name, message } = err;

  if (err instanceof RequestError) res.status(statusCode).json(message);
  else next(err);
};

export const errorLogger = (err, req, res, next) => {
  const [errStr, firstStackFrame] = err.stack.split('\n    at ', 2);

  console.log(errStr.bold.red, firstStackFrame.yellow);

  next(err);
};

export function errorResponder(err, req, res, next) {
  let statusCode;
  let message = err.message;

  switch (err.name) {
    case 'JsonWebTokenError': //e.g. if JWT is not a String || String is malformed
      statusCode = 401;
      // not assigning message, since JWT already has a couple messages ready
      break;
    case 'TokenExpiredError': //whenever JWT has expired (now only applies to AT, since RT is removed by browser upon expiry -> doesn't get sent back)
      statusCode = 401;
      message = 'Your token has expired';
      break;
    case 'ValidationError':
      statusCode = 400;
      message = Object.values(err.errors).map((err) => err.message)[0]; //send back 1 validation error at a time
      break;
    case 'MulterError':
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          statusCode = 413;
          message = 'File too big';
          break;
        case 'LIMIT_UNEXPECTED_FILE':
          statusCode = 400;
          message = 'That cannot be uploaded';
      }
      break;
    case 'MongoServerError':
      if (err.code === 11000) {
        statusCode = 409;

        const fieldNames = Object.keys(err.keyValue);

        const isDuplicateKeyErr = fieldNames.length === 1;
        const isDuplicateProductReviewErr = _.isEqual(fieldNames, ['productId', 'reviewerId']);

        if (isDuplicateKeyErr) {
          message = `That ${fieldNames[0]} is already in use`;
        } else if (isDuplicateProductReviewErr) {
          message = 'You have already reviewed this product';
        }
      }
      break;
    case 'Error':
      //first code is Outlook, second code is Gmail
      if (['EMESSAGE', 'EAUTH'].includes(statusCode)) {
        statusCode = 554;
        message = `SMTP Error (Support email is fucked)`;
      }
    default: {
      statusCode = 500; // Anything else will be a 500 (Internal Server Error)
      message = 'An unexpected error occurred, please try again later.';
    }
  }

  return res.status(statusCode).json(message);
}
