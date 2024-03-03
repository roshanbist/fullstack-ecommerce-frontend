import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';

const CartButton = () => {
  const items = useSelector((state: AppState) => state.carts.items);
  const navigate = useNavigate();

  const cartHandler = () => {
    navigate('/cart');
  };

  const numberOfCartItems = items?.reduce(
    (acc, currItem) => acc + (currItem.amount as number),
    0
  );

  return (
    <>
      <button
        type='button'
        className='text-blue-500 w-[30px] h-[30px] flex items-center ml-5 relative'
        onClick={cartHandler}
      >
        <FontAwesomeIcon icon={faCartShopping} className='text-[26px]' />
        <span className='absolute rounded-[44px] bg-blue-500 text-[12px] px-2 -top-[16px] -right-3.5 py-1.5 text-white font-medium leading-[1]'>
          {numberOfCartItems}
        </span>
      </button>
    </>
  );
};

export default CartButton;
