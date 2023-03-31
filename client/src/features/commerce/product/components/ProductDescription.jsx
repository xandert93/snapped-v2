import { useSelector } from 'react-redux';
import { selectProductDescription } from '../state/current-product/current-product-selectors';

export const ProductDescription = () => {
  const description = useSelector(selectProductDescription);

  return <h4>{description}</h4>;
};
