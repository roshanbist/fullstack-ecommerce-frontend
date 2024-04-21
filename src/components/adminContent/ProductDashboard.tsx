import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import lodash from 'lodash';

import { AppState, useAppDispatch } from '../../redux/store';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { FilterProduct } from '../../types/Product';
import { PaginationProps } from '../../types/Pagination';
import usePagination from '../../hook/usePagination';
import {
  fetchAllProducts,
  filterProductsList,
} from '../../redux/slices/ProductSlice';
import { fetchAllCategories } from '../../redux/slices/CategorySlice';
import Pagination from '../pagination/Pagination';
import AdminProductCard from './AdminProductCard';
import { priceOption, sortTitle } from '../../constants';
import Loader from '../loader/Loader';
import NoMatchFound from '../noMatchFound/NoMatchFound';

const ProductDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [filterProducts, setFilterProducts] = useState<FilterProduct>({
    categoryId: '0',
    price: 0,
    title: '',
    sortTitle: 'ASC',
  });

  const { products, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  const { categories } = useSelector((state: AppState) => state.categories);

  let paginationInput: PaginationProps = {
    totalItems: products.length,
    showPerPage: 15,
  };

  const { currentPage, startIndex, lastIndex, totalPage, handlePageChange } =
    usePagination(paginationInput);

  useEffect(() => {
    dispatch(fetchAllProducts(filterProducts));
  }, [dispatch, filterProducts]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilterProducts({
      categoryId: '0',
      price: 0,
      title: '',
      sortTitle: 'ASC',
    });
  }, []);

  const categoryHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterProducts((prevFilters) => ({
        ...prevFilters,
        categoryId: e.target.value,
      }));

      dispatch(
        filterProductsList({
          ...filterProducts,
          categoryId: e.target.value,
        })
      );
    },
    [dispatch, filterProducts]
  );

  const inputSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterProducts((prevFilters) => ({
      ...prevFilters,
      title: value.trim().toLowerCase(),
    }));

    const searchValue = value.trim();

    return debouncedHandleSearch(searchValue);
  };

  const debounceSearchByTitle = (value: string) => {
    dispatch(filterProductsList({ ...filterProducts, title: value.trim() }));
  };

  const debouncedHandleSearch = useCallback(
    lodash.debounce(debounceSearchByTitle, 600),
    [filterProducts.title]
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

  const sortTitleHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterProducts((prevFilters) => ({
        ...prevFilters,
        sortTitle: e.target.value,
      }));

      dispatch(
        filterProductsList({ ...filterProducts, sortTitle: e.target.value })
      );
    },
    [dispatch, filterProducts]
  );

  return (
    <ContentWrapper>
      <div className='max-container'>
        <section className='py-10 lg:py-12 animate-fade'>
          <div className='flex flex-wrap justify-between items-center pb-6 mb-10 border-b border-b-palette-accent'>
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
            <div className='w-[50%] sm:w-[220px] px-[5px] sm:p-0'>
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
            <div className='w-[50%] sm:w-[200px] px-[5px] sm:p-0'>
              <select
                className='border border-palette-accent bg-palette-ebony h-[50px] rounded-lg p-3 text-color-primary shadow-lg w-full outline-none'
                value={filterProducts.sortTitle}
                onChange={sortTitleHandler}
              >
                <option value={'ASC'}>Sort title</option>
                {sortTitle?.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : products && products.length > 0 ? (
            <div className='grid sm:grid-cols-3 lg:grid-cols-5 relative gap-5'>
              {products.slice(startIndex, lastIndex).map((product) => (
                <AdminProductCard key={product._id} productData={product} />
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
        </section>
      </div>
    </ContentWrapper>
  );
};

export default ProductDashboard;
