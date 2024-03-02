import React, { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import UserInteractionDropdown from './UserInteractionDropdown';
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
    <div className='ml-5 relative' ref={userInfoRef}>
      <button
        className='text-blue-500 rounded-full w-[26px] h-[26px] text-[26px] flex items-center'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {loggedUser ? userAvatar : <FontAwesomeIcon icon={faCircleUser} />}
      </button>
      <UserInteractionDropdown
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
    </div>
  );
};

export default UserInfo;
