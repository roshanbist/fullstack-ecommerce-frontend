export type PaginationProps = {
  totalItems: number;
  showPerPage: number;
};

export type PaginationUIProps = {
  currentPage: number;
  totalPage: number;
  handlePageChange: (data: { selected: number }) => void;
};
