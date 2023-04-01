import { multer } from '../config/index.js';

export const handleFileUpload = (fieldName) => multer.single(fieldName);

export const handleFilesUpload = (fieldName, maxCount) => multer.array(fieldName, maxCount);
