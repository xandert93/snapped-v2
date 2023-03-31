import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from '../../../../components';
import { selectProductLastOrderByUser } from '../state/current-product/current-product-selectors';

export const ProductLastPurchasedByUserMessage = () => {
  const { _id: orderId, createdAt } = useSelector(selectProductLastOrderByUser);

  const dateStr = new Date(createdAt).toDateString();

  return (
    <Box my={2}>
      You last bought this on <Link to={`/order-details/${orderId}`} children={dateStr} />
    </Box>
  );
};
