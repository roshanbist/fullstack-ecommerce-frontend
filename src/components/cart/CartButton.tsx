import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { AppState, useAppDispatch } from '../../redux/store';
import { getLoggedUserInfo } from '../../redux/slices/UserSlice';

const CartButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items = useSelector((state: AppState) => state.carts.items);
  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  const numberOfCartItems = items?.reduce(
    (acc, currItem) => acc + (currItem.amount as number),
    0
  );

  const cartHandler = () => {
    navigate('/cart');
  };

  useEffect(() => {
    if (!loggedUserInfo) {
      dispatch(getLoggedUserInfo());
    }
  }, [loggedUserInfo, dispatch]);

  return (
    <>
      {/* {loggedUserInfo && loggedUserInfo.role === 'customer' && ( */}
      <button
        type='button'
        className='text-blue-500 w-[30px] h-[30px] flex items-center ml-5 relative animate-fade'
        onClick={cartHandler}
      >
        <FontAwesomeIcon icon={faCartShopping} className='text-[26px]' />
        {numberOfCartItems !== 0 ? (
          <span className='animate-fade absolute rounded-[44px] bg-blue-500 text-[12px] px-2 -top-[16px] -right-3.5 py-1.5 text-white font-medium leading-[1]'>
            {numberOfCartItems}
          </span>
        ) : (
          ''
        )}
      </button>
      {/* // )} */}
    </>
  );
};

export default CartButton;
