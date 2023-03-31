import { genImagePreviewURL } from '../../utils/cloudinary/cloudinary-utils';

export const CldPreviewImage = ({ srcId, ...props }) => {
  return <img src={genImagePreviewURL(srcId)} {...props} />;
};
