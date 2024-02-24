import React from 'react';

import { ProductType } from '../../types/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const ProductDescription = ({ productData }: { productData: ProductType }) => {
  return (
    <section className='md:flex-1 p-5 text-color-primary'>
      <h1 className='text-xl md:text-2xl font-medium pb-4 mb-5 border-b border-color-primary tracking-wide'>
        {productData?.title}
      </h1>
      <span className='text-xl font-bold block mb-5'>
        <span className='text-sm'>As low as</span> € {productData.price}
      </span>
      <p className='tracking-wider mb-8'>{productData.description}</p>
      <div className='flex gap-4'>
        <div className='flex border border-color-primary items-center gap-x-4 py-4 px-6 rounded-xl'>
          <span
            className='icon-minus cursor-pointer text-color-primary'
            role='button'
          >
            <FontAwesomeIcon icon={faMinus} className='text-lg' />
          </span>
          <p className='w-4 text-center select-none font-medium'>1</p>
          <span
            className='icon-plus cursor-pointer text-color-primary'
            role='button'
          >
            <FontAwesomeIcon icon={faPlus} className='text-lg' />
          </span>
          <input type='hidden' name='quantity' value='1' />
        </div>
        <button
          className='btn-primary w-full max-w-full rounded-xl'
          type='submit'
        >
          Add To Cart
        </button>
      </div>
    </section>
  );
};

export default ProductDescription;
