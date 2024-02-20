export type Category = {
  id: number;
  name: string;
  image: string;
};

export type CategoryInitialState = {
  categories: Category[];
  categLoading: boolean;
  categError?: string | null;
};
