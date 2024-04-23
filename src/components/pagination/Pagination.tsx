import React from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { PaginationUIProps } from '../../types/Pagination';

const Pagination = (props: PaginationUIProps) => {
  return (
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
      pageCount={props.totalPage}
      marginPagesDisplayed={2}
      onPageChange={props.handlePageChange}
      containerClassName='flex items-center justify-center mt-8 mb-8 pagination' // <ul>
      activeClassName='active'
      renderOnZeroPageCount={null}
      forcePage={props.currentPage}
    />
  );
};

export default Pagination;
