import React, { useEffect, useState } from 'react';

import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import axios from 'axios';
import { BASE_URL } from '../utils/api';
import { toast } from 'react-toastify';
import { OrderList } from '../types/orderList';
import OrderInfo from '../components/order/OrderInfo';

const MyOrderList = () => {
  const [orderList, setOrderList] = useState<OrderList[] | null>(null);

  const { accessToken } = JSON.parse(
    localStorage.getItem('userToken') as string
  );

  console.log('orderList', orderList);

  useEffect(() => {
    const orderCollection = async () => {
      try {
        const response = await fetch(`${BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status !== 200) {
          const errorData = await response.json();
          toast.error(errorData.message || 'An error occurred');
        }

        // setTo state
        const orderData: OrderList[] = await response.json();
        setOrderList(orderData);
      } catch (error) {
        console.error('An error occurred:', error);
        toast.error('An unexpected error occurred');
      }
    };

    orderCollection();
  }, [accessToken]);

  return (
    <ContentWrapper>
      <div className='max-container py-[50px] animate-fade'>
        <section className='max-w-[870px] mx-auto'>
          {orderList &&
            orderList.length > 0 &&
            orderList.map((order, index) => (
              <OrderInfo order={order} key={index} />
            ))}
        </section>
      </div>
    </ContentWrapper>
  );
};

export default MyOrderList;
