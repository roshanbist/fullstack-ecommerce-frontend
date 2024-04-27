import { Category } from './Category';

export type CartType = {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  size: string;
  amount: number;
};

export type CartInitialState = {
  items: CartType[];
  totalAmount: number;
};

export type EmptyCartMessage = {
  message1: string;
  message2: string;
};
