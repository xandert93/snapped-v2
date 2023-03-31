import { useSelector } from 'react-redux';
import { formatCurrency } from '../../../../utils/formatters/currency-formatters';
import { selectProductPrice } from '../state/current-product/current-product-selectors';

export const ProductPrice = () => {
  const price = useSelector(selectProductPrice);

  return <h3>{formatCurrency(price)}</h3>;
};
