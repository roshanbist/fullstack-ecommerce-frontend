import React from 'react';
import { useNavigate } from 'react-router-dom';

import CartImage from '../../assets/images/empty-cart.png';
import { EmptyCartMessage } from '../../types/Cart';

const EmptyCart = ({ message }: { message: EmptyCartMessage }) => {
  const navigate = useNavigate();

  return (
    <div className='max-w-[400px] mx-auto text-color-primary text-center animate-fade'>
      <div className='mb-6 max-w-[350px] mx-auto'>
        <img src={CartImage} className='w-full' alt='Empty Cart' />
      </div>
      <p className='text-xl font-medium tracking-wide mb-5'>
        {message.message1}
      </p>
      <p className='tracking-wide mb-8'>{message.message2}</p>
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
