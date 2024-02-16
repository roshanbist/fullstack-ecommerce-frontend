import React from 'react';

import Navbar from '../navbar/Navbar';
import ShopLogo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <header className='w-full py-2 fixed top-0 bg-light-white bg-opacity-75 z-10 shadow-sm'>
      <div className='max-container flex max-sm:justify-between items-center'>
        <a href='/' className='block w-[80px]'>
          <img src={ShopLogo} alt='Trolley Cart' width={100} height={106} />
        </a>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
