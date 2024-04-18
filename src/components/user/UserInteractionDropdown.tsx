import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { AppState, useAppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/slices/UserSlice';
import { clearCart } from '../../redux/slices/CartSlice';

const UserDropdown = ({
  showDropdown,
  setShowDropdown,
}: {
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  const dropdownCloseHandler = () => {
    setShowDropdown(false);
  };

  const logoutHandler = () => {
    setShowDropdown(false);
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate('/login');
  };

  const guestButtonList = (
    <>
      <ul>
        <li className='mx-5 mb-3'>
          <Link
            to={'/login'}
            className='btn-primary w-full rounded-lg'
            onClick={dropdownCloseHandler}
          >
            Login
          </Link>
        </li>
        <li className='mx-5 mb-3'>
          <Link
            to={'/register'}
            className='btn-primary w-full rounded-lg'
            onClick={dropdownCloseHandler}
          >
            Register
          </Link>
        </li>
      </ul>
    </>
  );

  const userButtonList = (
    <ul>
      <li className='border-b border-b-palette-accent'>
        <Link
          className='text-color-primary block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
          to={'/customer-profile'}
          onClick={dropdownCloseHandler}
        >
          Profile
        </Link>
      </li>
      <li className='border-b border-b-palette-accent'>
        <button
          className='w-full text-left block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
          onClick={logoutHandler}
          type='button'
        >
          Logout
        </button>
      </li>
    </ul>
  );

  const adminButtonList = (
    <ul>
      <li className='border-b border-b-palette-accent'>
        <Link
          className='text-color-primary block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
          to={'/admin'}
          onClick={dropdownCloseHandler}
        >
          Admin Profile
        </Link>
      </li>
      <li className='border-b border-b-palette-accent'>
        <Link
          className='text-color-primary block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
          to={'/product-dashboard'}
          onClick={dropdownCloseHandler}
        >
          Product Dashboard
        </Link>
      </li>
      <li className='border-b border-b-palette-accent'>
        <button
          className='w-full text-left block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
          onClick={logoutHandler}
        >
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <div className={`user-dropdown ${showDropdown ? 'active' : ''}`}>
      <div className='p-3.5 border-b-2 border-b-palette-accent mb-3.5'>
        <h2 className='transition-none text-lg mb-2 font-medium'>{`Welcome ${
          loggedUserInfo ? loggedUserInfo.firstname : 'Guest'
        }`}</h2>
        <p className='transition-none tracking-wide'>
          {/* {loggedUserInfo && loggedUserInfo.role.toLowerCase() === 'admin' */}
          {loggedUserInfo && loggedUserInfo.role === 'admin'
            ? 'Lets start managing the products.'
            : 'Lets start shopping.'}
        </p>
      </div>

      {loggedUserInfo
        ? loggedUserInfo.role === 'admin'
          ? adminButtonList
          : userButtonList
        : guestButtonList}
    </div>
  );
};

export default UserDropdown;
