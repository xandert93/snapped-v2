import { useSelector } from 'react-redux';
import { selectProductImageURLs } from '../state/current-product/current-product-selectors';

export const ProductImageList = () => {
  const imageURLs = useSelector(selectProductImageURLs);

  return imageURLs.map((url) => <img key={url} src={url} height={100} />);
};
