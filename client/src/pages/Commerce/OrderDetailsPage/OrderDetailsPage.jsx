import { CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderAPI } from '../../../features/commerce/order/api';

export const OrderDetailsPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    orderAPI.getOrder(id).then(({ order }) => setOrder(order));
  }, []);

  return !order ? (
    <CircularProgress />
  ) : (
    <>
      <h3>Your order:</h3>
      {Object.entries(order).map(([k, v]) => (
        <li>
          {k}: {v.toString()}
        </li>
      ))}
    </>
  );
};
