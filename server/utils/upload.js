import { s3 } from '../config';

export const deleteFileFromS3 = (filename) => {
  const deletionParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
  };

  return s3.deleteObject(deletionParams).promise(); //returns a Promise
};
