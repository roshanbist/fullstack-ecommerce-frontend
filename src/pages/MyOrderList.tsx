import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import OrderInfo from '../components/order/OrderInfo';
import Loader from '../components/loader/Loader';
import EmptyCart from '../components/cart/EmptyCart';
import { AppState, useAppDispatch } from '../redux/store';
import { getAllOrders } from '../redux/slices/OrderSlice';

const MyOrderList = () => {
  const dispatch = useAppDispatch();

  const { orders, loading } = useSelector((state: AppState) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const emptyOrderMessage = {
    message1: ' You have not ordered anything yet!',
    message2: 'Hurry up, make some order',
  };

  return (
    <ContentWrapper>
      <div className='max-container py-[50px] animate-fade'>
        <div className='max-w-[870px] mx-auto'>
          {loading ? (
            <Loader />
          ) : orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <OrderInfo order={order} key={index} />
            ))
          ) : (
            orders &&
            orders.length === 0 && <EmptyCart message={emptyOrderMessage} />
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default MyOrderList;
