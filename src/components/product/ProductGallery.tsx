import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css'; // Import the style
import { ImageUrlClear } from '../../utils/ImageUrlClear';

const ProductGallery = ({ productImages }: { productImages: string[] }) => {
  console.log('product images', productImages);

  const productGalleryList = productImages.map((img) => {
    const image = ImageUrlClear(img);
    return image;
  });

  return (
    <div className='w-full sm:self-start sm:w-[48%] lg:w-[600px] md:mr-2 lg:mr-5 rounded-lg p-2 bg-palette-ebony border border-palette-accent'>
      {productGalleryList.length > 1 ? (
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation={true}
          loop={true}
          className='h-[350px] md:h-[450px] lg:h-[600px] overflow-hidden'
          pagination={{
            clickable: true,
          }}
          autoplay={true}
        >
          {productGalleryList?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt='product images'
                className='rounded-lg object-cover w-full h-full'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='h-[350px] md:h-[450px] lg:h-[600px] overflow-hidden'>
          <img
            src={productGalleryList[0]}
            alt='product images'
            className='rounded-lg object-cover w-full h-full'
          />
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
