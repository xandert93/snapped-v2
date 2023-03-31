import { multer } from '../config';

export const handleFileUpload = (fieldName) => multer.single(fieldName);

export const handleFilesUpload = (fieldName, maxCount) => multer.array(fieldName, maxCount);
