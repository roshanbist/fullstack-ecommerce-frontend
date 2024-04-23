import { CartType } from './Cart';
import { UserType } from './User';

export type OrderList = CartType &
  Partial<UserType> & {
    items: CartType[];
    createdAt: string;
    totalPrice: number;
  };
