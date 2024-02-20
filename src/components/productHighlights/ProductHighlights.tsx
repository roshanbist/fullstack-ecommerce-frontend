import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState, useAppDispatch } from '../../redux/store';
import ProductCard from '../productCard/ProductCard';
import { fetchAllProducts } from '../../redux/slices/ProductSlice';

const ProductHighlights = () => {
  const dispatch = useAppDispatch();
  const productList = useSelector((state: AppState) => state.products.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // console.log('product list', productList);

  return (
    <section className='py-12 bg-bkg-primary'>
      <div className='max-container'>
        <h2 className='text-xl sm:text-2xl text-brown-50 mb-5 uppercase text-center font-bold'>
          Products Highlight
        </h2>
        <span className='block w-[120px] h-[2px] bg-brown-50 mx-auto mb-5'></span>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 relative gap-7 mb-5'>
          {productList?.slice(4, 7).map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))}
        </div>
        <Link
          className='btn-primary flex justify-center rounded-full max-w-[200px] mx-auto'
          to={`/products`}
        >
          Explore
        </Link>
      </div>
    </section>
  );
};

export default ProductHighlights;
