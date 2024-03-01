import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import CartItemHolder from './CartItemHolder';

const CartContainer = ({
  showCart,
  setShowCart,
}: {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
}) => {
  const cartCloseHandler = () => {
    setShowCart(false);
    document.body.classList.remove('cart-open');
  };

  return (
    <>
      <div
        className={`cart-overlay bg-[#113c4e]/80 ${
          showCart ? 'cart-open' : ''
        } fixed top-0 left-0 w-full h-full z-[13]`}
      />
      <div
        className={`cart-container w-[400px] fixed top-0 right-0 h-full bg-palette-accent z-[14] p-5  ${
          showCart ? 'cart-open' : ''
        }`}
      >
        <div className='border-b border-b-color-primary text-color-primary mb-3.5 pb-3.5'>
          <span className='uppercase font-medium tracking-wide text-xl block mb-2'>
            Shopping Cart
          </span>
          <p className='tracking-wider'>Get Up To 30% OFF on your 1st order</p>
        </div>
        <button className='text-blue-500 absolute right-[20px] top-[20px]'>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={cartCloseHandler}
            className='text-[30px]'
          />
        </button>
        <CartItemHolder />
      </div>
    </>
  );
};

export default CartContainer;
