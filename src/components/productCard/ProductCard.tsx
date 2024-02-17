import React from 'react';

import { ProductType } from '../../misc/type';

const ProductCard = ({ productData }: { productData: ProductType }) => {
  return (
    <div className='bg-white rounded-xl p-5 shadow-xl border text-center'>
      <div>
        <img src={productData.images[0]} alt='image' />
      </div>
      <h3 className='text-lg mb block mb-3 font-medium border-b pb-3'>
        {productData.title}
      </h3>
      <p>{productData.price}</p>
    </div>
  );
};

export default ProductCard;
