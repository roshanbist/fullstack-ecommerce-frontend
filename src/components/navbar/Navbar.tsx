import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navLinks } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import UserInfo from '../user/UserInfo';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const location = useLocation();

  // const mobileMenuHandler = () => {
  //   setIsMobile(true);
  // };

  // adding classname in body
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('mobile-nav');
    } else {
      document.body.classList.remove('mobile-nav');
    }
  }, [isMobile]);

  // closing mobile nav if clicked outside of nav
  useEffect(() => {
    const menuHandler = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setIsMobile(false);
        document.body.classList.remove('mobile-nav');
      }
    };

    const resizeHandler = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
        document.body.classList.remove('mobile-nav');
      }
    };

    document.addEventListener('mousedown', menuHandler);
    window.addEventListener('resize', resizeHandler);

    return () => {
      document.removeEventListener('mousedown', menuHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const navCloseHandler = () => {
    setIsMobile(false);
  };

  return (
    <div className='flex flex-1 max-md:justify-end max-md:items-center'>
      <nav className='md:flex-1 md:mx-10' ref={navRef}>
        <span className='md:hidden cursor-pointer text-[28px] relative z-10'>
          {isMobile ? (
            <FontAwesomeIcon
              className='text-blue-500'
              icon={faXmark}
              onClick={() => setIsMobile(false)}
            />
          ) : (
            <FontAwesomeIcon
              className='text-blue-500'
              icon={faBars}
              onClick={() => setIsMobile(true)}
            />
          )}
        </span>
        <div
          className={`max-md:fixed w-full left-0 max-md:top-[65px] bottom-0 max-md:transition-all max-md:ease-in-out max-md:duration-300 ${
            isMobile ? 'translate-x-0' : 'max-md:translate-x-full'
          } max-md:bg-palette-primary max-md:border-t max-md:border-t-palette-accent`}
        >
          <ul className='md:flex md:gap-10 font-medium md:text-[18px]'>
            {navLinks.map((navItem) => (
              <li
                key={navItem.label}
                className='max-md:px-5 max-md:py-4 max-md:border-b max-md:border-b-palette-accent'
              >
                <Link
                  className={`hover:text-blue-600 font-medium transition-colors ease-in-out duration-300 ${
                    location.pathname === navItem.href ? 'text-blue-600' : ''
                  }`}
                  to={navItem.href}
                  onClick={navCloseHandler}
                >
                  {navItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <UserInfo />
    </div>
  );
};

export default Navbar;
