import { s3Multer } from '../config';

export const uploadFile = (fieldName) => s3Multer.single(fieldName); //<input:file />

export const uploadFiles = (fieldName, maxCount) => s3Multer.array(fieldName, maxCount); //<input:file multiple/>

export const uploadVariousFiles = (fieldNamesArr) => s3Multer.fields(fieldNamesArr); //1+ <input:file multiple/>
