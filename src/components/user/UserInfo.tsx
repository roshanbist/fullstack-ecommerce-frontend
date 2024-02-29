import React, { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from './UserDropdown';

const UserInfo = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const userInfoRef = useRef<HTMLInputElement | null>(null);

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
    <div className='ml-3 relative' ref={userInfoRef}>
      <button
        className='text-blue-500 w-[30px] h-[30px] text-[30px] flex items-center'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FontAwesomeIcon icon={faCircleUser} />
      </button>
      <UserDropdown
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
    </div>
  );
};

export default UserInfo;
