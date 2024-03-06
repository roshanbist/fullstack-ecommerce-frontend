import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState, useAppDispatch } from '../../redux/store';
import { fetchAllProducts } from '../../redux/slices/ProductSlice';
import ProductCard from './ProductCard';
import Loader from '../loader/Loader';

const ProductHighlights = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useSelector(
    (state: AppState) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <section className='py-12'>
      <div className='max-container'>
        <h2 className='text-xl sm:text-2xl text-blue-500 mb-5 uppercase text-center font-bold'>
          Products Highlight
        </h2>
        <span className='block w-[120px] h-[2px] bg-blue-500 mx-auto mb-7'></span>
        {loading ? (
          <Loader />
        ) : (
          products &&
          products.length > 0 && (
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 relative gap-7 mb-7'>
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} productData={product} />
              ))}
            </div>
          )
        )}

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
