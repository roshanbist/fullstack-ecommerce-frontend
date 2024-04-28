import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { AppState, useAppDispatch } from '../redux/store';
import { fetchAllProducts } from '../redux/slices/ProductSlice';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { fetchAllCategories } from '../redux/slices/CategorySlice';
import { priceOption, sortTitle } from '../constants';
import { FilterProduct } from '../types/Product';
import Pagination from '../components/pagination/Pagination';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/loader/Loader';
import NoMatchFound from '../components/noMatchFound/NoMatchFound';

const Products = () => {
  const dispatch = useAppDispatch();

  const [filterProducts, setFilterProducts] = useState<FilterProduct>({
    categoryId: '',
    price: 0,
    title: '',
    sortTitle: '',
    offset: 1,
    limit: 9,
  });

  const [currentPage, setCurrentPage] = useState(0);

  const { products, total, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  const { categories } = useSelector((state: AppState) => state.categories);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
    setFilterProducts((prevFilters) => ({
      ...prevFilters,
      offset: data.selected + 1,
    }));
  };

  useEffect(() => {
    dispatch(fetchAllProducts(filterProducts));
  }, [dispatch, filterProducts]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilterProducts({
      categoryId: '',
      price: 0,
      title: '',
      sortTitle: '',
      offset: 1,
      limit: 9,
    });
  }, []);

  const onCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterProducts((prevFilters) => ({
        ...prevFilters,
        categoryId: e.target.value,
        offset: 1,
      }));
      setCurrentPage(0);
    },
    []
  );

  const onPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilterProducts((prevFilters) => ({
        ...prevFilters,
        price: +e.target.value,
        offset: 1,
      }));
      setCurrentPage(0);
    },
    []
  );

  const onSortTitle = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterProducts((prevFilters) => ({
      ...prevFilters,
      sortTitle: e.target.value,
      offset: 1,
    }));
    setCurrentPage(0);
  }, []);

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFilterProducts((prevFilters) => ({
        ...prevFilters,
        title: value,
        offset: 1,
      }));
      setCurrentPage(0);
    },
    []
  );

  const debounceHandleSearch = debounce(onTitleChange, 500);
  const debounceHandleCategory = debounce(onCategoryChange, 300);
  const debounceHandlePrice = debounce(onPriceChange, 300);
  const debounceHandleSortTitle = debounce(onSortTitle, 200);

  const totalPage = Math.ceil(total / (filterProducts.limit as number));

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
              type='text'
              placeholder='Search here'
              onChange={debounceHandleSearch}
            />
          </div>
          <div className='sm:mb-5 flex flex-wrap -mx-[10px]'>
            <div className='w-[50%] sm:w-[200px] px-[10px] max-md:mb-5'>
              <select
                className='border border-palette-accent bg-palette-ebony h-[50px] rounded-lg p-3 text-color-primary shadow-lg w-full outline-none'
                onChange={debounceHandleCategory}
              >
                <option value=''>Filter by category</option>
                {categories?.map((categ) => (
                  <option key={categ._id} value={categ._id}>
                    {categ.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='w-[50%] sm:w-[200px] px-[10px] max-md:mb-5'>
              <select
                className='border border-palette-accent bg-palette-ebony h-[50px] rounded-lg p-3 text-color-primary shadow-lg w-full outline-none'
                onChange={debounceHandlePrice}
              >
                <option value={0}>Filter by price</option>
                {priceOption?.map((price, index) => (
                  <option key={index} value={price.value}>
                    {price.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='w-[50%] sm:w-[200px] px-[10px] max-md:mb-5'>
              <select
                className='border border-palette-accent bg-palette-ebony h-[50px] rounded-lg p-3 text-color-primary shadow-lg w-full outline-none'
                onChange={debounceHandleSortTitle}
              >
                <option value={''}>Sort title</option>
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
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 relative gap-7'>
              {products.map((product) => (
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
