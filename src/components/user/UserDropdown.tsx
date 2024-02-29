import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState, useAppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/slices/UserSlice';

const UserDropdown = ({
  showDropdown,
  setShowDropdown,
}: {
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  const dropdownCloseHandler = () => {
    setShowDropdown(false);
  };

  const logoutHandler = () => {
    setShowDropdown(false);
    dispatch(logoutUser());
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
            className='btn-primary  w-full rounded-lg'
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
      <li className='border-b border-b-palette-primary'>
        <Link
          className='block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
          to={'/customer/profile'}
        >
          Profile
        </Link>
      </li>
      <li className='border-b border-b-palette-primary'>
        <Link
          className='block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
          to={'/'}
        >
          Orders
        </Link>
      </li>
      <li className='border-b border-b-palette-primary'>
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
    <>
      <Link
        to={'/admin'}
        className='block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
        onClick={dropdownCloseHandler}
      >
        Admin
      </Link>
      <button
        className='w-full block py-3 px-5 hover:bg-blue-600 font-medium hover:text-white transition-colors ease-in-out duration-300'
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  );

  return (
    <div className={`user-dropdown ${showDropdown ? 'active' : ''}`}>
      <div className='p-3.5 border-b-2 border-b-palette-accent mb-3.5'>
        <h2 className='transition-none text-lg mb-2 font-medium'>{`Welcome ${
          loggedUserInfo ? loggedUserInfo.name : 'Guest'
        }`}</h2>
        <p className='transition-none tracking-wide'>
          Lets start shopping and managing the carts.
        </p>
      </div>
      {loggedUserInfo &&
      (loggedUserInfo.role === 'admin'
        ? adminButtonList
        : loggedUserInfo.role === 'customer')
        ? userButtonList
        : guestButtonList}
    </div>
  );
};

export default UserDropdown;
