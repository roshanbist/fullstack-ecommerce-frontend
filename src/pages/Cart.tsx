import React from 'react';

import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import CartDetail from '../components/cart/CartDetail';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';

const Cart = () => {
  const { items } = useSelector((state: AppState) => state.carts);

  return (
    <ContentWrapper>
      <div className='max-container'>
        <section className='py-10 md:py-12 md:flex md:justify-between md:gap-5 lg:gap-10'>
          {items.length > 0 ? (
            <>
              <CartDetail />
              <CartSummary />
            </>
          ) : (
            <EmptyCart />
          )}
        </section>
      </div>
    </ContentWrapper>
  );
};

export default Cart;
