import fs from 'fs';
import { cld } from '../utils';

//1
export const uploadImage = async (req, res, next) => {
  const { file } = req;
  const id = await cld.upload(file.path, `${file.fieldname}s`); // i.e. 'avatar-images' or 'snap-images' etc. folder in Cloudinary library

  fs.unlinkSync(file.path);

  req.imageId = id;
  next();
};

export const uploadImages = async (req, res, next) => {
  const { files } = req;

  const imageIds = [];

  for (const file of files) {
    const id = await cld.upload(file.path, `${file.fieldname}s`);

    fs.unlinkSync(file.path);
    imageIds.push(id);
  }

  req.imageIds = imageIds;
  next();
};

/*

1) No need to specify `upload_preset` in either upload call, since on the Cloudinary 
   console, I've set up all uploads to use the 'snapped_default' preset already.

*/
