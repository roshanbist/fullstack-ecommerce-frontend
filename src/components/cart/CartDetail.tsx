import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import CartItem from './CartItem';

const CartDetail = () => {
  const { items } = useSelector((state: AppState) => state.carts);

  const numberOfCartItems = items?.reduce(
    (acc, currItem) => acc + (currItem.amount as number),
    0
  );

  return (
    <div className='p-5 lg:p-10 bg-palette-ebony text-color-primary rounded-lg flex-1 max-md:mb-6'>
      <div className='sm:flex sm:justify-between mb-6 pb-6 border-b border-b-ebony'>
        <h1 className='text-lg lg:text-xl font-medium tracking-wide flex-1 max-md:mb-3'>
          Cart Items Selected
        </h1>
        <span className='d-block font-medium sm:ml-3 sm:text-lg'>
          Total Items: {numberOfCartItems}
        </span>
      </div>
      {items?.map((item) => (
        <CartItem key={item.id} itemData={item} />
      ))}
    </div>
  );
};

export default CartDetail;
