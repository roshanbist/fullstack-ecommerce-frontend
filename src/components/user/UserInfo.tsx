import React, { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from './UserDropdown';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';

const UserInfo = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const userInfoRef = useRef<HTMLInputElement | null>(null);

  const loggedUser = useSelector((state: AppState) => state.users.loggedUser);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!userInfoRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const userAvatar = loggedUser && (
    <img
      src={loggedUser.avatar}
      alt={loggedUser.name}
      className='rounded-full'
    />
  );

  return (
    <div className='ml-3 relative' ref={userInfoRef}>
      <button
        className='text-blue-500 border-2 border-blue-500 rounded-full w-[30px] h-[30px] text-[30px] flex items-center'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {loggedUser ? userAvatar : <FontAwesomeIcon icon={faCircleUser} />}
      </button>
      <UserDropdown
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
    </div>
  );
};

export default UserInfo;
