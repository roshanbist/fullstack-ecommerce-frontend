import React from 'react';
import { Link } from 'react-router-dom';

import { ProductType } from '../../misc/type';
import ProductPlaceholder from '../../assets/images/productPlaceholder.png';

const ProductCard = ({ productData }: { productData: ProductType }) => {
  return (
    <div className='bg-white rounded-sm p-3 shadow-sm border text-center'>
      <Link
        className='h-[350px] w-full overflow-hidden hover:translate-y-[-4px]'
        to={`/products/${productData.id}`}
      >
        <img
          className='object-cover w-full h-full'
          src={
            productData.images[0].startsWith('https')
              ? productData.images[0]
              : ProductPlaceholder
          }
          alt={productData.title}
        />
      </Link>
      <h3 className='text-lg mb block mb-3 font-medium border-b pb-3'>
        {productData.title}
      </h3>
      <p>{productData.price}</p>
    </div>
  );
};

export default ProductCard;
