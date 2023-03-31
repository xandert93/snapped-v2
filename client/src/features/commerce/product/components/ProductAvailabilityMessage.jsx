import { useSelector } from 'react-redux';
import { selectProductStockCount } from '../state/current-product/current-product-selectors';

export const ProductAvailabilityMessage = () => {
  const stockCount = useSelector(selectProductStockCount);

  return <h5>Availability: {stockCount} left</h5>;
};
