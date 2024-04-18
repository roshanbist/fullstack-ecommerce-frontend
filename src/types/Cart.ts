import { Category } from './Category';

export type CartType = {
  // id: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  amount?: number;
  size?: string[];
};

export type CartInitialState = {
  items: CartType[];
  totalAmount: number;
};
