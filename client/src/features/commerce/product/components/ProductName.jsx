import { useSelector } from 'react-redux';
import { selectProductName } from '../state/current-product/current-product-selectors';

export const ProductName = () => {
  const name = useSelector(selectProductName);

  return <h3>{name}</h3>;
};
