import genMulter from 'multer';
import { BadReqError } from '../utils/error-types.js';

const MIME_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/gif': 'gif',
};

const MAX_IMAGE_SIZE = 12 * 1024 * 1024; // 12MB

export const multer = genMulter({
  dest: 'temp/uploads', // using server's disk storage
  fileFilter: (req, file, cb) => {
    const isPermitted = MIME_TYPES[file.mimetype];

    cb(isPermitted ? null : new BadReqError('That is not an image'), true);
  },
  limits: { fileSize: MAX_IMAGE_SIZE },
}); // => Multer OI
