import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section className='bg-banner bg-cover bg-center min-h-screen flex items-center relative pt-[130px] pb-10 before:absolute before:w-full before:h-full before:bg-blue-500/10 before:top-0 before:left-0 animate-fade'>
      <div className='max-container w-full'>
        <div className='flex flex-col py-10 px-5 justify-center items-center relative max-w-sm sm:max-w-lg mx-auto text-center bg-palette-secondary/60 rounded-lg shadow-lg animate-fade'>
          <h1 className='text-2xl text-color-primary sm:text-3xl mb-5 font-bold'>
            Our <span className='text-blue-500'>Winter Sale</span> is Finally
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
