import { cloudinary } from '../config';

export const upload = async (path, folder) => {
  const result = await cloudinary.uploader.upload(path, { folder });

  return result.public_id; // image's URL is on `result.secure_url`
};

export const remove = async (public_id) => {
  const result = await cloudinary.uploader.destroy(public_id); // => { result: 'Ok'  }
};

export const uploadAvatar = (path) => upload(path, 'avatar-images');
