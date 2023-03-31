import { Box, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../../../hooks';
import { addLineItemToBasket } from '../../basket/state/basket-actions';
import {
  selectProductPriceId,
  selectProductStockCount,
} from '../state/current-product/current-product-selectors';

export const ProductStockActions = () => {
  const dispatch = useDispatch();

  const priceId = useSelector(selectProductPriceId);
  const stockCount = useSelector(selectProductStockCount);

  const [quantity, handleChange] = useInput('1');

  const addToBasket = () => dispatch(addLineItemToBasket({ priceId, quantity }));

  return (
    <Box my={2}>
      {stockCount ? (
        <>
          <input
            type="number"
            min="1"
            max={stockCount > 9 ? 9 : stockCount}
            value={quantity}
            onChange={handleChange}
          />
          <br />
          <Button variant="contained" size="small" onClick={addToBasket} children="Add to Basket" />
        </>
      ) : (
        <p>
          <i>'Sorry dude, outta stock'</i>
        </p>
      )}
    </Box>
  );
};
