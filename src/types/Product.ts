import { Category } from './Category';

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
};

export type ProductInitialState = {
  products: ProductType[];
  selectedSingleProduct?: ProductType | null;
  loading: boolean;
  error?: string | null;
};

export type NewProductType = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};
