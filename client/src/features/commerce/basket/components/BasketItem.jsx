import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { adjustBasketLineItemQuantity, removeLineItemFromBasket } from '../state/basket-actions';
import { selectBasketProductById } from '../state/basket-selectors';
import { formatCurrency } from '../../../../utils/formatters/currency-formatters';

export const BasketItem = ({ id }) => {
  const dispatch = useDispatch();

  const { priceId, name, price, quantity, imageURL } = useSelector(selectBasketProductById(id));

  const handleClick = () => dispatch(removeLineItemFromBasket(priceId));

  const handleQtyClick = (incValue) => () => {
    if (quantity === 1 && incValue === -1) {
      dispatch(removeLineItemFromBasket(priceId));
    } else {
      dispatch(adjustBasketLineItemQuantity({ priceId, incValue }));
    }
  };

  return (
    <>
      <h3>{name}</h3>
      <img src={imageURL} height={50} />
      <h4>{formatCurrency(price)}</h4>

      <Button onClick={handleQtyClick(-1)}>-</Button>
      {quantity}
      <Button onClick={handleQtyClick(1)}>+</Button>

      <h3>Product total: {formatCurrency(quantity * price)}</h3>
      <Button variant="contained" onClick={handleClick}>
        Remove
      </Button>
    </>
  );
};
