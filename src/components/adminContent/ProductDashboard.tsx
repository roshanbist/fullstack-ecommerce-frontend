import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppState, useAppDispatch } from '../../redux/store';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { ProductFilters } from '../../types/Product';
import { PaginationProps } from '../../types/Pagination';
import usePagination from '../../hook/usePagination';
import {
  fetchAllProducts,
  filterProductsList,
} from '../../redux/slices/ProductSlice';
import { fetchAllCategories } from '../../redux/slices/CategorySlice';
import Pagination from '../pagination/Pagination';
import AdminProductCard from './AdminProductCard';
import { priceOption } from '../../constants';

const ProductDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [filterProducts, setFilterProducts] = useState<ProductFilters>({
    categoryId: 0,
    price: 0,
  });

  const { products, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  const { categories } = useSelector((state: AppState) => state.categories);

  let paginationInput: PaginationProps = {
    totalItems: products.length,
    showPerPage: 12,
  };

  const { currentPage, startIndex, lastIndex, totalPage, handlePageChange } =
    usePagination(paginationInput);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const categoryHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterProducts((prevFilters) => ({
        ...prevFilters,
        categoryId: +e.target.value,
      }));

      dispatch(
        filterProductsList({
          ...filterProducts,
          categoryId: +e.target.value,
        })
      );
    },
    [dispatch, filterProducts]
  );

  const priceHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterProducts((prevFilters) => ({
        ...prevFilters,
        price: +e.target.value,
      }));

      dispatch(
        filterProductsList({ ...filterProducts, price: +e.target.value })
      );
    },
    [dispatch, filterProducts]
  );

  const addProductHandler = () => {
    navigate('/add-new-product');
  };

  return (
    <ContentWrapper>
      <div className='max-container'>
        <section className='py-10 lg:py-12'>
          <div className='flex flex-wrap justify-between items-center pb-6 mb-6 border-b border-b-palette-accent'>
            <h1 className='text-lg md:text-xl uppercase font-bold tracking-wide text-color-primary'>
              Manage Product Items
            </h1>
            <button
              className='btn-primary ml-3 rounded-xl'
              onClick={addProductHandler}
            >
              Add Product
            </button>
          </div>
        </section>
        <div className='mb-5'>
          <select
            className='border border-palette-accent'
            value={filterProducts.categoryId}
            onChange={categoryHandler}
          >
            <option value=''>Filter by category</option>
            {categories?.map((categ) => (
              <option key={categ.id} value={categ.id}>
                {categ.name}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-5'>
          <select
            className='border border-palette-accent'
            value={filterProducts.price}
            onChange={priceHandler}
          >
            <option value={0}>Filter by price</option>
            {priceOption?.map((price, index) => (
              <option key={index} value={price.value}>
                {price.label}
              </option>
            ))}
          </select>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-5 relative gap-5'>
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            <p className='text-lg font-medium text-red-600'>
              Sorry for disruption due to error
            </p>
          ) : (
            products &&
            products
              .slice(startIndex, lastIndex)
              .map((product) => (
                <AdminProductCard key={product.id} productData={product} />
              ))
          )}
        </div>
        {products && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </ContentWrapper>
  );
};

export default ProductDashboard;
