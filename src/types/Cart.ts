import { Category } from './Category';

export type CartType = {
  // id: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  size: string;
  amount?: number;
};

export type CartInitialState = {
  items: CartType[];
  totalAmount: number;
};
