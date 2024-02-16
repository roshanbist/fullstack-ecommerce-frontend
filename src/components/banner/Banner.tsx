import React from 'react';

const Banner = () => {
  return (
    <section className='bg-banner bg-cover bg-center min-h-screen flex items-center relative pt-[130px] pb-10'>
      <div className='overlay absolute w-full top-0 bottom-0 bg-black bg-opacity-20'></div>
      <div className='max-container w-full'>
        <div className='flex flex-col py-10 px-5 justify-center items-center relative max-w-lg mx-auto text-center bg-light-white opacity-90 rounded-lg shadow-lg'>
          <h1 className='text-3xl text-gray-700 mb-5 font-bold'>
            Our <span className='text-brown-50'>Winter Sale</span> is Finally
            here!
          </h1>
          <button className='btn-primary rounded-full'>shop now</button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
