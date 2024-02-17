import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import MainWrapper from '../components/wrapper/MainWrapper';
import { AppState, useAppDispatch } from '../redux/store';
import { fetchAllProducts } from '../redux/slices/ProductSlice';
import ProductCard from '../components/productCard/ProductCard';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // console.log('product data', products);
  // console.log('loading', loading);
  // console.log('error', error);
  return (
    <MainWrapper>
      <section className='py-10'>
        <div className='max-container'>
          <h2 className='text-2xl font-medium mb-6'>Product List</h2>
          <div className='card-wrap grid sm:grid-cols-2 lg:grid-cols-3 relative gap-7'>
            {loading ? (
              <p>loading...</p>
            ) : error ? (
              <p className='text-lg font-medium text-red-600'>{error}</p>
            ) : (
              products &&
              products.map((product) => (
                <ProductCard key={product.id} productData={product} />
              ))
            )}
          </div>
        </div>
      </section>
    </MainWrapper>
  );
};

export default Products;
