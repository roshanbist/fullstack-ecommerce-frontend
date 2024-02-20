import React, { useEffect } from 'react';

import Navbar from '../navbar/Navbar';
import ShopLyst from '../../assets/images/logo-shoplyst.png';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header className='w-full py-2 fixed top-0 bg-light-white bg-opacity-75 z-10 shadow-sm'>
      <div className='max-container w-full flex max-md:justify-between items-center'>
        <a href='/' className='block w-[55px] md:w-[80px]'>
          <img src={ShopLyst} alt='Trolley Cart' width={100} height={106} />
        </a>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
