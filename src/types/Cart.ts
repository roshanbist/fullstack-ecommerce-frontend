import { Category } from './Category';

export type CartType = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  amount?: number;
};

export type CartInitialState = {
  items: CartType[];
  totalAmount: number;
};
