import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CartContainer from './CartContainer';

<FontAwesomeIcon icon={faCartShopping} />;

const Cart = () => {
  const [showCart, setShowCart] = useState<boolean>(false);

  const cartOpenHandler = () => {
    setShowCart(true);
    document.body.classList.add('cart-open');
  };

  return (
    <>
      <button
        type='button'
        className='text-blue-500 text-[25px] w-[30px] h-[30px] flex items-center'
        onClick={cartOpenHandler}
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
      <CartContainer showCart={showCart} setShowCart={setShowCart} />
    </>
  );
};

export default Cart;
