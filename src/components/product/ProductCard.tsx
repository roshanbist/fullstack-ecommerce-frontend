import React from 'react';
import { Link } from 'react-router-dom';

import { ProductType } from '../../types/Product';
import ProductPlaceholder from '../../assets/images/productPlaceholder.png';

const ProductCard = ({ productData }: { productData: ProductType }) => {
  return (
    <div className='bg-palette-accent rounded-sm shadow-sm border border-palette-accent'>
      <Link
        className='block h-[350px] w-full overflow-hidden'
        to={`/products/${productData.id}`}
      >
        <img
          className='object-cover w-full h-full rounded-tr-sm rounded-tl-sm hover:scale-125 transition-transform duration-300 ease-in-out'
          src={
            productData.images[0].startsWith('https')
              ? productData.images[0]
              : ProductPlaceholder
          }
          alt={productData.title}
        />
      </Link>
      <div className='p-4 text-color-primary'>
        <h3 className='text-lg mb-3 font-medium'>{productData.title}</h3>
        <span className='font-bold text-[18px]'>
          Price: € {productData.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
