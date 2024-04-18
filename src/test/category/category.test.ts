import { CategoryInitialState } from '../../types/Category';
import categoryReducer, {
  fetchAllCategories,
} from '../../redux/slices/CategorySlice';

const initialState: CategoryInitialState = {
  categories: [],
  categLoading: false,
  categError: '',
};

const mockCategoryData = [
  { _id: '1', name: 'Category 1', image: 'Image 1' },
  { _id: '2', name: 'Category 2', image: 'Image 2' },
];

describe('category Reducer', () => {
  // initial state of the categories
  test('should handle initial state', () => {
    const newCategoryState = categoryReducer(undefined, { type: '' });
    expect(newCategoryState).toEqual(initialState);
  });

  // fetch category fulfilled
  test('should fetch all categories when action is fulfilled', () => {
    const newCategoryState = categoryReducer(
      initialState,
      fetchAllCategories.fulfilled(mockCategoryData, 'fulfilled')
    );

    const updateCategoryState = {
      categories: mockCategoryData,
      categLoading: false,
      categError: '',
    };

    expect(newCategoryState).toEqual(updateCategoryState);
  });

  // fetch category pending
  test('should have loading true when fetching is pending', () => {
    const newCategoryState = categoryReducer(
      initialState,
      fetchAllCategories.pending('pending')
    );

    const updateCategoryState = {
      categories: [],
      categLoading: true,
      categError: '',
    };

    expect(newCategoryState).toEqual(updateCategoryState);
  });

  // fetch category rejected
  test('should have error message when fetching is rejected', () => {
    const errorResponse = new Error('error');

    const newCategoryState = categoryReducer(
      initialState,
      fetchAllCategories.rejected(errorResponse, 'rejected')
    );

    const updateCategoryState = {
      categories: [],
      categLoading: false,
      categError: errorResponse.message,
    };

    expect(newCategoryState).toEqual(updateCategoryState);
  });
});
