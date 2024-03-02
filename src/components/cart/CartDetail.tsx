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
    <div className='p-5 md:p-10 bg-palette-ebony text-color-primary rounded-lg flex-1'>
      <div className='flex justify-between mb-6 pb-6 border-b border-b-palette-accent'>
        <h1 className='text-xl font-medium tracking-wide flex-1'>
          Cart Items Selected
        </h1>
        <span className='d-block font-medium ml-3 text-lg'>
          Total Item: {numberOfCartItems}
        </span>
      </div>
      {items?.map((item) => (
        <CartItem key={item.id} itemData={item} />
      ))}
    </div>
  );
};

export default CartDetail;
