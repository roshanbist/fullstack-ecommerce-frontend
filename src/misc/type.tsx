export type Category = {
  id: number;
  name: string;
  image: string;
};

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
