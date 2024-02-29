import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { Link } from 'react-router-dom';

const UserDropdown = ({
  showDropdown,
  setShowDropdown,
}: {
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
}) => {
  const loggedUserInfo = useSelector(
    (state: AppState) => state.users.loggedUser
  );

  const guestButtonList = (
    <>
      <Link
        to={'/login'}
        className='btn-primary mb-3 w-full rounded-lg'
        onClick={() => setShowDropdown(false)}
      >
        Login
      </Link>
      <Link
        to={'/register'}
        className='btn-primary mb-3 w-full rounded-lg'
        onClick={() => setShowDropdown(false)}
      >
        Register
      </Link>
    </>
  );

  const userButtonList = (
    <ul>
      <li>
        <Link to={'/'}>Profile</Link>
      </li>
      <li>
        <Link to={'/'}>Orders</Link>
      </li>
      <li>
        <Link to={'/'}>Logout</Link>
      </li>
    </ul>
  );

  return (
    <div className={`user-dropdown ${showDropdown ? 'active' : ''}`}>
      <h2 className='transition-none text-lg mb-2 font-medium'>{`Welcome ${
        loggedUserInfo ? loggedUserInfo.name : 'Guest'
      }`}</h2>
      <p className='transition-none tracking-wide mb-7 pb-5 border-b-2 border-b-palette-accent'>
        Lets start shopping and managing the carts.
      </p>
      {loggedUserInfo ? userButtonList : guestButtonList}
    </div>
  );
};

export default UserDropdown;
