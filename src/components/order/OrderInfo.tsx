import React, { useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { OrderList } from '../../types/orderList';

const OrderInfo = ({ order }: { order: OrderList }) => {
  return (
    <section className='mb-10 bg-palette-ebony border border-palette-accent rounded-xl py-[15px] md:py-[30px]'>
      <div className='flex flex-wrap justify-between items-center border-b pb-5 mb-5 px-[15px] md:px-[30px]'>
        <div className='text-color-primary font-medium'>
          <h4>Order: {order._id}</h4>
          <span className='block'>
            Order placed: {moment(order.createdAt).format('DD MMMM YYYY')}
          </span>
        </div>
        <div className='font-medium text-color-primary'>
          <span className='block'>Order Total</span>
          <span className='block font-bold text-right'>
            € {order.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {order.items.map((item, index) => (
        <div
          className='flex flex-wrap justify-between px-[15px] md:px-[30px] border-b pb-5 mb-5'
          key={index}
        >
          <div className='w-[120px] h-[120px] rounded-lg max-sm:mb-5 md:mr-5'>
            <img
              className='w-full h-full object-cover rounded-lg cursor-pointer'
              src={item.images[0]}
              alt={item.title}
            />
          </div>
          <div className='flex-1 text-color-primary'>
            <h4 className='font-medium mb-1'>{item.title}</h4>
            <div className='mb-1'>Quantity: {item.amount}</div>
            <div className='mb-1'>Size: {item.size}</div>
          </div>
        </div>
      ))}
      <div className='py-[5px] px-[15px] md:px-[30px] flex flex-wrap justify-end'>
        <Link
          className='btn-primary w-full max-w-full rounded-xl sm:max-w-[250px]'
          to={`/orders/${order._id}`}
        >
          View Order Details
        </Link>
        {/* TODO: delete arule rakheko cha ki nai herne  */}
        {/* <button
          className='btn-danger px-5 min-w-0 w-full text-[14px] rounded-lg'
          onClick={() => orderDeleteHandler(order._id)}
        >
          Delete
        </button> */}
      </div>
    </section>
  );
};

export default OrderInfo;
