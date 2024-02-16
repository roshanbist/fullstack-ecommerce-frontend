import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navLinks } from '../../constants';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className='flex-1 mx-3 sm:mx-10'>
      <ul className='flex gap-5 md:gap-10 font-medium md:text-[18px]'>
        {navLinks.map((navItem) => (
          <li key={navItem.label}>
            <Link
              className={`hover:text-brown-80 font-medium transition-colors ease-in-out duration-300 ${
                location.pathname === navItem.href ? 'text-brown-80' : ''
              }`}
              to={navItem.href}
            >
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
