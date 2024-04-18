export type Category = {
  _id: string;
  name: string;
  image: string;
};

export type CategoryInitialState = {
  categories: Category[];
  categLoading: boolean;
  categError?: string | null;
};
