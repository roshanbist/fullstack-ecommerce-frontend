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
import Loader from '../components/loader/Loader';
import NoMatchFound from '../components/noMatchFound/NoMatchFound';

const Products = () => {
  const dispatch = useAppDispatch();

  const [filterProducts, setFilterProducts] = useState<ProductFilters>({
    categoryId: '',
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

  useEffect(() => {
    setFilterProducts({
      categoryId: '',
      price: 0,
      title: '',
    });
  }, []);

  const categoryHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterProducts((prevFilters) => ({
        ...prevFilters,
        categoryId: e.target.value,
      }));

      dispatch(
        filterProductsList({ ...filterProducts, categoryId: e.target.value })
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

    debouncedHandleSearch(searchValue);
  };

  const debounceSearchByTitle = (value: string) => {
    dispatch(filterProductsList({ ...filterProducts, title: value }));
  };

  const debouncedHandleSearch = useCallback(
    lodash.debounce(debounceSearchByTitle, 600),
    [filterProducts.title]
  );

  return (
    <ContentWrapper>
      <section className='py-10'>
        <div className='max-container'>
          <h2 className='text-2xl font-medium mb-6 text-color-primary'>
            Products List
          </h2>

          <div className='mb-5'>
            <input
              className='form-input border border-palette-accent bg-palette-ebony'
              type='search'
              value={filterProducts.title}
              placeholder='Search here'
              onChange={inputSearchHandler}
            />
          </div>
          <div className='mb-5 flex flex-wrap max-md:-mx-[5px] sm:gap-5'>
            <div className='w-[50%] sm:w-[200px] px-[5px] sm:p-0'>
              <select
                className='border border-palette-accent bg-palette-ebony h-[50px] rounded-lg p-3 text-color-primary shadow-lg w-full outline-none'
                value={filterProducts.categoryId}
                onChange={categoryHandler}
              >
                <option value=''>Filter by category</option>
                {categories?.map((categ) => (
                  <option key={categ._id} value={categ._id}>
                    {categ.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-[50%] sm:w-[200px] px-[5px] sm:p-0'>
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
          {loading ? (
            <Loader />
          ) : products && products.length > 0 ? (
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 relative gap-7'>
              {products.slice(startIndex, lastIndex).map((product) => (
                <ProductCard key={product._id} productData={product} />
              ))}
            </div>
          ) : (
            !error &&
            products.length === 0 && (
              <NoMatchFound data='Sorry, No Product found!' />
            )
          )}

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
