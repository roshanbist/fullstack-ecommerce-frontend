import React from 'react';

import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import CartDetail from '../components/cart/CartDetail';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
  return (
    <ContentWrapper>
      <div className='max-container'>
        <section className='py-10 md:flex md:justify-between gap-10'>
          <CartDetail />
          <CartSummary />
        </section>
      </div>
    </ContentWrapper>
  );
};

export default Cart;
