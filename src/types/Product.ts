import { Category } from './Category';

export type ProductType = {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  size: string[];
};

export type ProductInitialState = {
  products: ProductType[];
  totalNumber: number;
  selectedSingleProduct?: ProductType | null;
  loading: boolean;
  error?: string | null;
};

export type NewProductType = {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  images: string[];
  size: string[];
};

export type ProductsList = {
  total: number;
  products: ProductType[];
};

export type PriceOption = {
  value: string;
  label: string;
};

export type sortTitle = {
  value: string;
  label: string;
};

// export type ProductFilters = {
//   title?: string;
//   categoryId?: string;
//   price?: number;
//   sortTitle?: string;
// };

export type FilterProduct = {
  title?: string;
  categoryId?: string;
  price?: number;
  sortTitle?: string;
};

export type TestNewProductType = {
  _id?: string;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
  category?: Category;
};
