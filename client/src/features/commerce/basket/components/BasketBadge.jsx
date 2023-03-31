import { useSelector } from 'react-redux';
import { Link } from '../../../../components';

import { selectBasketItemCount } from '../state/basket-selectors';

export const BasketBadge = () => {
  const count = useSelector(selectBasketItemCount);

  return (
    <div>
      <Link to="/basket">Basket Count: {count}</Link>
    </div>
  );
};
