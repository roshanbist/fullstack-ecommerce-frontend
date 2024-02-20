import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navLinks } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const location = useLocation();

  const mobileMenuHandler = () => {
    setIsMobile(true);
  };

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
    <nav className='md:flex-1 md:mx-10' ref={navRef}>
      <span className='md:hidden cursor-pointer text-[20px] relative z-10'>
        {isMobile ? (
          <FontAwesomeIcon icon={faXmark} onClick={() => setIsMobile(false)} />
        ) : (
          <FontAwesomeIcon icon={faBars} onClick={mobileMenuHandler} />
        )}
      </span>
      <div
        className={`max-md:fixed w-full left-0 top-0 max-md:pt-[67px] bottom-0 max-md:transition-all max-md:ease-in-out max-md:duration-300 ${
          isMobile ? 'translate-x-0' : 'max-md:translate-x-full'
        } max-md:bg-light-white max-md:border-t max-md:border-t-neutral-300`}
      >
        <ul className='md:flex md:gap-10 font-medium md:text-[18px] max-md:border-t max-md:border-t-brown-50'>
          {navLinks.map((navItem) => (
            <li
              key={navItem.label}
              className='max-md:px-5 max-md:py-4 max-md:border-b border-b-brown-50'
            >
              <Link
                className={`hover:text-brown-80 font-medium transition-colors ease-in-out duration-300 ${
                  location.pathname === navItem.href ? 'text-brown-80' : ''
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
  );
};

export default Navbar;
