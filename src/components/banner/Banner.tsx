import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className='bg-banner bg-cover bg-center min-h-screen flex items-center relative pt-[130px] pb-10'>
      <div className='overlay absolute w-full top-0 bottom-0 bg-brown-80 bg-opacity-10'></div>
      <div className='max-container w-full'>
        <div className='flex flex-col py-10 px-5 justify-center items-center relative max-w-sm sm:max-w-lg mx-auto text-center bg-light-white opacity-90 rounded-lg shadow-lg'>
          <h1 className='text-2xl sm:text-3xl text-gray-700 mb-5 font-bold'>
            Our <span className='text-brown-50'>Winter Sale</span> is Finally
            here!
          </h1>
          <Link className='btn-primary rounded-full' to={`/products`}>
            shop now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
