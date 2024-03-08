import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import CartDetail from '../components/cart/CartDetail';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { AppState } from '../redux/store';
import Loader from '../components/loader/Loader';

const Cart = () => {
  const [itemExist, setItemExist] = useState<boolean>(true);
  const { items } = useSelector((state: AppState) => state.carts);

  useEffect(() => {
    if (items) {
      setItemExist(false);
    }
  }, [items]);

  return (
    <ContentWrapper>
      <div className='max-container'>
        <section className='py-10 md:py-12'>
          {itemExist ? (
            <Loader />
          ) : items && items.length > 0 ? (
            <div className='md:flex md:justify-between md:gap-5 lg:gap-10'>
              <CartDetail />
              <CartSummary />
            </div>
          ) : (
            items && items.length === 0 && <EmptyCart />
          )}
        </section>
      </div>
    </ContentWrapper>
  );
};

export default Cart;
