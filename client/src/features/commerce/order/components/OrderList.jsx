import { Box } from '@material-ui/core';
import { Link } from '../../../../components';
import { formatCurrency } from '../../../../utils/formatters/currency-formatters';
import { genDateAndTimeStr } from '../../../../utils/formatters/date-formatters';

export const OrderList = ({ orders }) => {
  return orders.map(
    ({
      _id,
      userId,
      checkoutId,
      customerId,
      products,
      costs, // { subtotal, shipping, total }
      shipping, // { name, deliveryEst }
      payment, // { mode, method, isPaid, paidAt }
      addresses, // { shipping, billing }
      createdAt,
      updatedAt,
    }) => {
      return (
        <Box m={1}>
          <h2>
            Order ID: <Link to={`/order-details/${_id}`}>{_id}</Link>
          </h2>
          {products.map(({ name, imageURL, price, quantity }) => {
            return (
              <>
                <h3>
                  {quantity} x {name}
                </h3>
                <img src={imageURL} height={50} />
                <h4>{formatCurrency(price)} each</h4>
              </>
            );
          })}
          <h3>Delivering to: {addresses.shipping.line1}</h3>
          <h3>Delivery Estimate: {shipping.deliveryEst}</h3>
          <h4>Subtotal: {formatCurrency(costs.subtotal)}</h4>
          <h4>
            Shipping: {formatCurrency(costs.shipping)} ({shipping.name})
          </h4>
          <h3>
            Paid: {formatCurrency(costs.total)} by {payment.method} at{' '}
            {genDateAndTimeStr(new Date(payment.paidAt))}
          </h3>
        </Box>
      );
    }
  );
};
