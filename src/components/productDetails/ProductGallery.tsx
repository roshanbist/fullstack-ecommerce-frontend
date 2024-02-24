import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css'; // Import the style

const ProductGallery = ({ productImages }: { productImages: string[] }) => {
  return (
    <section className='w-full md:w-[600px] md:mr-5 rounded-lg p-2 bg-palette-ebony border border-palette-accent'>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={true}
        loop={true}
        className='h-[350px] md:h-[600px] overflow-hidden'
        pagination={{
          clickable: true,
        }}
        autoplay={true}
      >
        {productImages?.map((img, index) => (
          <SwiperSlide key={index} className='hello'>
            <img
              src={img}
              alt='product images'
              className='rounded-lg object-cover w-full h-full'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductGallery;
