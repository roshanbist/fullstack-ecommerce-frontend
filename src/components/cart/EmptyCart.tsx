import React from 'react';

import CartImage from '../../assets/images/empty-cart.png';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className='max-w-[400px] mx-auto text-color-primary text-center'>
      <div className='mb-6 max-w-[350px] mx-auto animate-fade'>
        <img src={CartImage} className='w-full' alt='Empty Cart' />
      </div>
      <p className='text-xl font-medium tracking-wide mb-5'>
        Your cart is empty
      </p>
      <p className='tracking-wide mb-8'>
        Looks like you have not added anything to your cart. Explore the
        products.
      </p>
      <button
        className='btn-primary rounded-lg animate-bounce'
        onClick={() => navigate('/products')}
      >
        Shop Now
      </button>
    </div>
  );
};

export default EmptyCart;
