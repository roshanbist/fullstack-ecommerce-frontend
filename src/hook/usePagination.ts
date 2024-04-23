import React, { useEffect, useState } from 'react';
import { PaginationProps } from '../types/Pagination';

const usePagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(props.showPerPage);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(props.totalItems / props.showPerPage)
  );

  useEffect(() => {
    setStartIndex(currentPage * props.showPerPage);
    setLastIndex(startIndex + props.showPerPage);
    setTotalPage(Math.ceil(props.totalItems / props.showPerPage));
  }, [currentPage, props.showPerPage, props.totalItems, startIndex]);

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  // const startIndex = currentPage * props.showPerPage;
  // const lastIndex = Math.min(startIndex + props.showPerPage, props.totalItems);

  return {
    currentPage,
    startIndex,
    lastIndex,
    totalPage,
    handlePageChange,
  };
};

export default usePagination;
