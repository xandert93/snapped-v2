import { Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { formatCurrency } from '../../../utils/formatters/currency-formatters';

import {
  checkoutBasket,
  clearBasket,
} from '../../../features/commerce/basket/state/basket-actions';
import {
  selectBasketProductIds,
  selectBasketTotal,
  selectIsBasketFetching,
} from '../../../features/commerce/basket/state/basket-selectors';
import { BasketItem } from '../../../features/commerce/basket/components';

export const BasketPage = () => {
  const dispatch = useDispatch();

  const priceIds = useSelector(selectBasketProductIds);
  const basketTotal = useSelector(selectBasketTotal);
  const isFetching = useSelector(selectIsBasketFetching);

  const handleClearClick = () => dispatch(clearBasket());
  const handleCheckoutClick = () => dispatch(checkoutBasket());

  return isFetching ? (
    <CircularProgress />
  ) : (
    <>
      {priceIds.map((id) => (
        <BasketItem key={id} id={id} />
      ))}
      <h2>Total: {formatCurrency(basketTotal)}</h2>
      <Button variant="outlined" onClick={handleCheckoutClick}>
        Checkout
      </Button>
      <Button variant="outlined" onClick={handleClearClick}>
        Remove all
      </Button>
    </>
  );
};
