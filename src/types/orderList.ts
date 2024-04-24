import { CartType } from './Cart';
import { UserType } from './User';

export type OrderList = {
  _id: string;
  user: Partial<UserType>;
  items: CartType[];
  createdAt: string;
  totalPrice: number;
  shippingAddress: string;
};

export type OrderInitialState = {
  orders: OrderList[];
  selectedSingleOrder: OrderList | null;
  loading: boolean;
  error?: string | null;
};
