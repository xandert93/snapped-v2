import { CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';

import { OrderList } from '../../../features/commerce/order/components';
import { orderAPI } from '../../../features/commerce/order/api';

export const OrdersPage = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // fetch all orders
    const fetchOrders = async () => {
      const { orders } = await orderAPI.getAuthUsersOrders();
      setOrders(orders);
      setIsFetching(false);
    };

    fetchOrders();
  }, []);

  return (
    <>
      <h1>Orders</h1>
      {isFetching && <CircularProgress />}
      <OrderList orders={orders} />
    </>
  );
};
