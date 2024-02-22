import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppState, useAppDispatch } from '../redux/store';
import {
  createNewProduct,
  fetchAllProducts,
} from '../redux/slices/ProductSlice';
import ProductCard from '../components/productCard/ProductCard';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { fetchAllCategories } from '../redux/slices/CategorySlice';

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  const { categories, categLoading, categError } = useSelector(
    (state: AppState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <ContentWrapper>
      <section className='py-10'>
        <div className='max-container'>
          <h2 className='text-2xl font-medium mb-6'>Product List</h2>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 relative gap-7'>
            {loading ? (
              <p>loading...</p>
            ) : error ? (
              <p className='text-lg font-medium text-red-600'>
                Sorry for disruption due to error
              </p>
            ) : (
              products &&
              products.map((product) => (
                <ProductCard key={product.id} productData={product} />
              ))
            )}
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default Products;
