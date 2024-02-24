import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { AppState, useAppDispatch } from '../redux/store';
import { fetchAllProducts } from '../redux/slices/ProductSlice';
import ProductCard from '../components/productCard/ProductCard';
import ContentWrapper from '../components/contentWrapper/ContentWrapper';
import { fetchAllCategories } from '../redux/slices/CategorySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Products = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: AppState) => state.products
  );

  const { categories, categLoading, categError } = useSelector(
    (state: AppState) => state.categories
  );

  let showPerPage = 12;
  const startIndex = currentPage * showPerPage;
  const lastIndex = startIndex + showPerPage;

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const totalPage = Math.ceil(products?.length / showPerPage);

  const handlePageChange = (data: { selected: number }) => {
    // console.log('clicked', data.selected);
    setCurrentPage(data.selected);
  };

  // filtered Product using pagination
  // const filteredProduct = product

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
              products
                .slice(startIndex, lastIndex)
                .map((product) => (
                  <ProductCard key={product.id} productData={product} />
                ))
            )}
          </div>
          {products && (
            <ReactPaginate
              previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
              nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
              previousClassName='page-item' // previous button <li>
              pageClassName='page-item' // <li>
              pageLinkClassName='page-link' // <a>
              previousLinkClassName='page-link' // previous button <li> <a>
              nextClassName='page-item'
              nextLinkClassName='page-link'
              breakLabel={'...'}
              breakClassName='page-item'
              breakLinkClassName='page-link'
              pageCount={totalPage}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName='flex items-center justify-center mt-8 mb-8 pagination' // <ul>
              activeClassName='active'
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </section>
    </ContentWrapper>
  );
};

export default Products;
