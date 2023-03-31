import { useSelector } from 'react-redux';
import { ShopProductCard } from './ShopProductCard';
import { selectProducts } from '../state/products/products-selectors';

export const ProductList = () => {
  const products = useSelector(selectProducts);

  return products.map((product) => <ShopProductCard key={product._id} {...product} />);
};
