import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../redux/store';

const CartSummary = () => {
  const totalAmount = useSelector((state: AppState) => state.carts.totalAmount);

  return (
    <div className='p-5 lg:p-10 bg-palette-ebony text-color-primary rounded-lg md:w-[36%] self-start'>
      <h1 className='text-lg lg:text-xl font-medium tracking-wide mb-5 sm:mb-7 pb-5 sm:pb-7 border-b border-b-ebony'>
        Cart Summary
      </h1>
      <div className='mb-6 lg:text-lg flex justify-between'>
        <p className='tracking-wide'>Subtotal</p>
        <p>€ {totalAmount.toFixed(2)}</p>
      </div>
      <div className='mb-6 lg:text-lg flex justify-between'>
        <p className='tracking-wide'>Discount (10%)</p>
        <p>€ {(0.1 * totalAmount).toFixed(2)}</p>
      </div>
      <div className='mb-6 lg:text-lg flex justify-between'>
        <p className='tracking-wide font-bold'>Grand Total</p>
        <p className='font-bold'>€ {(0.9 * totalAmount).toFixed(2)}</p>
      </div>
      <button className='btn-primary w-full rounded-full'>Checkout</button>
    </div>
  );
};

export default CartSummary;
