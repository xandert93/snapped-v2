import { Cloudinary } from '@cloudinary/url-gen';

import { fit, fill, crop, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';

const cloudinary = new Cloudinary({ cloud: { cloudName: 'snapped' } }); // `cloudName` must match that of our Cloudinary configuration

export const genAvatarURL = (id) => {
  const cldImage = cloudinary.image(id);

  cldImage.resize(thumbnail().width(200).height(200).gravity(focusOn(FocusOn.face()))); // will create a single thumbnail for us which uses cool face detection
  return cldImage.toURL();
};

export const genThumbURL = (id) => {
  const cldImage = cloudinary.image(id);

  cldImage.resize(thumbnail().width(300).height(300));
  return cldImage.toURL();
};

export const genImagePreviewURL = (id) => {
  const cldImage = cloudinary.image(id);

  cldImage.resize(fit().width(600).height(600));
  return cldImage.toURL();
};

export const genImageURL = (id) => {
  const cldImage = cloudinary.image(id);

  return cldImage.toURL();
};
