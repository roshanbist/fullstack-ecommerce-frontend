import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { AppState, useAppDispatch } from '../../redux/store';
import { clearCart } from '../../redux/slices/CartSlice';
import { getLoggedUserInfo } from '../../redux/slices/UserSlice';
import { BASE_URL } from '../../utils/api';

const CartSummary = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const totalAmount = useSelector((state: AppState) => state.carts.totalAmount);
  const totalAmountAfterDiscount = Number(0.9 * totalAmount).toFixed(2);

  const orderProducts = useSelector((state: AppState) => state.carts.items);

  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  useEffect(() => {
    if (!loggedUserInfo) {
      dispatch(getLoggedUserInfo);
    }
  }, [dispatch, loggedUserInfo]);

  const checkoutHandler = async () => {
    try {
      if (loggedUserInfo) {
        const { accessToken } = JSON.parse(
          localStorage.getItem('userToken') as string
        );

        const response = await fetch(`${BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: orderProducts,
            totalPrice: totalAmountAfterDiscount,
            shippingAddress: loggedUserInfo.address,
          }),
        });

        if (response.status === 201) {
          toast.success('Thank you for Ordering');
          localStorage.removeItem('cartCollection');
          dispatch(clearCart());
          navigate('/');
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'An error occurred');
        }
      } else {
        toast.info('Please login to your account');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className='p-4 md:p-6 lg:p-7 bg-palette-ebony text-color-primary rounded-lg md:w-[36%] self-start'>
      <h1 className='text-lg lg:text-xl font-medium tracking-wide mb-5 sm:mb-7 pb-5 sm:pb-7 border-b border-b-ebony'>
        Cart Summary
      </h1>
      <div className='mb-6 lg:text-lg flex justify-between'>
        <p className='tracking-wide'>Subtotal</p>
        <p>€ {totalAmount.toFixed(2)}</p>
      </div>
      <div className='mb-6 lg:text-lg flex justify-between'>
        <p className='tracking-wide'>Discount (10%)</p>
        <p>€ {(0.1 * totalAmount).toFixed(2)}</p>
      </div>
      <div className='mb-6 lg:text-lg flex justify-between'>
        <p className='tracking-wide font-bold'>Grand Total</p>
        <p className='font-bold'>€ {(0.9 * totalAmount).toFixed(2)}</p>
      </div>
      <button
        className='btn-primary w-full rounded-full'
        onClick={checkoutHandler}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
