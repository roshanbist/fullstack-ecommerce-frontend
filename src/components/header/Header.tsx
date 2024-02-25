import React, { useEffect } from 'react';

import Navbar from '../navbar/Navbar';
import ShopLyst from '../../assets/images/logo.svg';
import { useLocation } from 'react-router-dom';
import ThemeToggle from '../themeToggle/ThemeToggle';

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header className='w-full py-2 fixed top-0 bg-palette-primary/90 z-10 border-b border-b-palette-accent'>
      <div className='max-container w-full flex items-center'>
        <a href='/' className='block w-[55px] md:w-[80px] z-10'>
          <img src={ShopLyst} alt='Shoplyst' width={100} height={106} />
        </a>
        <Navbar />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
