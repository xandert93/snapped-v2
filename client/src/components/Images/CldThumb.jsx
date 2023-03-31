import { genThumbURL } from '../../utils/cloudinary/cloudinary-utils';

export const CldThumb = ({ srcId, ...props }) => {
  return <img src={genThumbURL(srcId)} {...props} />;
};
