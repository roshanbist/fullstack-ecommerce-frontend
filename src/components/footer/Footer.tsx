import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { footerMenuLinks, socialMediaLinks } from '../../constants';
import { Link } from 'react-router-dom';
import ScrollTop from '../scrollTop/ScrollTop';

const Footer = () => {
  return (
    <footer className='bg-gray-700 py-12 text-center text-white'>
      <div className='max-container'>
        <div>
          <h4 className='text-xl font-bold capitalize mb-4'>Help</h4>
          <ul className='flex flex-wrap gap-3 md:gap-5 justify-center mb-5'>
            {footerMenuLinks.map((menu) => (
              <li key={menu.label}>
                <Link
                  className='text-white hover:text-brown-50 transition-colors ease-in-out duration-300'
                  to={menu.href}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='text-xl font-bold capitalize mb-4'>Follow Us</h4>
          <ul className='flex gap-5 justify-center mb-5 text-[28px]'>
            {socialMediaLinks.map((item, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={item.icon} />
              </li>
            ))}
          </ul>
        </div>
        <div className='border-b h-[2px] border-gray-300 mb-8'></div>
        <div className='text-sm'>
          <p>
            This website is developed as part of Integrify Frontend Project for
            educational purpose by{' '}
            <Link
              target='_blank'
              rel='noreferrer'
              to='https://github.com/roshanbist'
              className='text-brown-50 hover:text-white transition-colors ease-in-out duration-300'
            >
              Roshan
            </Link>
          </p>
        </div>
      </div>
      <ScrollTop />
    </footer>
  );
};

export default Footer;
