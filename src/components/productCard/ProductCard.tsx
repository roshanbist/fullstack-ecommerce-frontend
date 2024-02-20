import React from 'react';
import { Link } from 'react-router-dom';

import { ProductType } from '../../types/Product';
import ProductPlaceholder from '../../assets/images/productPlaceholder.png';

const ProductCard = ({ productData }: { productData: ProductType }) => {
  return (
    <div className='bg-white rounded-sm p-3 shadow-sm border text-center'>
      <Link
        className='block h-[350px] w-full overflow-hidden mb-4'
        to={`/products/${productData.id}`}
      >
        <img
          className='object-cover w-full h-full rounded-tr-sm rounded-tl-sm'
          src={
            productData.images[0].startsWith('https')
              ? productData.images[0]
              : ProductPlaceholder
          }
          alt={productData.title}
        />
      </Link>
      <h3 className='text-lg mb-3 font-medium border-t border-b pb-3'>
        {productData.title}
      </h3>
      <p>{productData.price}</p>
    </div>
  );
};

export default ProductCard;
