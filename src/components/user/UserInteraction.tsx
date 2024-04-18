import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppState } from '../../redux/store';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import UserInteractionDropdown from './UserInteractionDropdown';

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

  return (
    <div className='ml-5 flex items-center relative' ref={userInfoRef}>
      <button
        className='rounded-full w-[30px] h-[30px] overflow-hidden border border-blue-500 animate-fade'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {loggedUser && loggedUser.avatar ? (
          <img
            src={loggedUser.avatar}
            alt={loggedUser.username}
            className='w-full h-full object-cover animate-fade'
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleUser}
            className='text-[30px] text-blue-500'
          />
        )}
      </button>
      <UserInteractionDropdown
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
    </div>
  );
};

export default UserInfo;
