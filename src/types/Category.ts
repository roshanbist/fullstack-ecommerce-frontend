export type CategoryBase = {
  name: string;
  image: string;
};

export type Category = CategoryBase & {
  _id: string;
  // name: string;
  // image: string;
};

export type CategoryInitialState = {
  categories: Category[];
  selectedSingleCategory?: Category | null;
  categLoading: boolean;
  categError?: string | null;
};
