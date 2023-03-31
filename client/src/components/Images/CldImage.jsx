import { genImageURL } from '../../utils/cloudinary';

export const CldImage = ({ srcId, ...props }) => {
  return <img src={genImageURL(srcId)} {...props} />;
};
