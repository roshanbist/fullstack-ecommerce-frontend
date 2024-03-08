import React from 'react';
import ScrollToTop from 'react-scroll-to-top';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollTop = () => {
  return (
    <ScrollToTop
      className='w-[36px] h-[36px] rounded-full animate-bounce'
      smooth
      component={
        <FontAwesomeIcon
          icon={faCircleArrowUp}
          className='text-[36px] text-blue-500 hover:text-blue-600 transition-colors ease-in-out duration-300'
        />
      }
    />
  );
};

export default ScrollTop;
