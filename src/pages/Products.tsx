import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lodash from 'lodash';

import { AppState, useAppDispatch } from '../redux/store';
import {
  fetchAllProducts,
  filterProductsList,
} from '../redux/slices/ProductSlice';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { fetchAllCategories } from '../redux/slices/CategorySlice';
import { priceOption } from '../constants';
import { ProductFilters } from '../types/Product';
import Pagination from '../components/pagination/Pagination';
import usePagination from '../hook/usePagination';
import { PaginationProps } from '../types/Pagination';
import ProductCard from '../components/product/ProductCard';

const Products = () => {
  const dispatch = useAppDispatch();

  const [filterProducts, setFilterProducts] = useState<ProductFilters>({
    categoryId: 0,
    price: 0,
    title: '',
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
        filterProductsList({ ...filterProducts, categoryId: +e.target.value })
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

  const inputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterProducts((prevFilters) => ({
      ...prevFilters,
      title: value,
    }));

    const searchValue = value;

    return debouncedHandleSearch(searchValue);
  };

  const debounceSearchByTitle = (value: string) => {
    dispatch(filterProductsList({ ...filterProducts, title: value }));
  };

  const debouncedHandleSearch = useCallback(
    lodash.debounce(debounceSearchByTitle, 600),
    []
  );

  return (
    <ContentWrapper>
      <section className='py-10'>
        <div className='max-container'>
          <h2 className='text-2xl font-medium mb-6'>Product List</h2>

          <div className='mb-5'>
            <input
              className='form-input border border-palette-accent bg-palette-ebony'
              type='search'
              value={filterProducts.title}
              placeholder='Search here'
              onChange={inputSearchHandler}
            />
          </div>
          <div className='mb-5 flex flex-wrap gap-5'>
            <div className='w-[220px]'>
              <select
                className='border border-palette-accent bg-palette-ebony h-[50px] rounded-lg p-3 text-color-primary shadow-lg w-full outline-none'
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
            <div className='w-[200px]'>
              <select
                className='border border-palette-accent bg-palette-ebony h-[50px] rounded-lg p-3 text-color-primary shadow-lg w-full outline-none'
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
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 relative gap-7'>
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
                  <ProductCard key={product.id} productData={product} />
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
      </section>
    </ContentWrapper>
  );
};

export default Products;
