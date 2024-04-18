import cartReducer, {
  addItem,
  clearCart,
  deleteItem,
  removeItem,
} from '../../redux/slices/CartSlice';
import { CartInitialState } from '../../types/Cart';

const initialState: CartInitialState = {
  items: [
    {
      _id: '1',
      title: 'Product 1',
      price: 10,
      description: 'Description 1',
      category: { _id: '1', name: 'Category 1', image: 'Image 1' },
      images: ['Image 1'],
      amount: 2,
    },

    {
      _id: '2',
      title: 'Product 2',
      price: 20,
      description: 'Description 2',
      category: { _id: '2', name: 'Category 2', image: 'Image 2' },
      images: ['Image 2'],
      amount: 3,
    },
  ],
  totalAmount: 80,
};

const cartMockItem = {
  _id: '3',
  title: 'Product 3',
  price: 20,
  description: 'Description 3',
  category: { _id: '3', name: 'Category 3', image: 'Image 3' },
  images: ['Image 3'],
  amount: 3,
};

// test suits
describe('cart reducers', () => {
  test('should add product item to the cart', () => {
    const itemNewState = cartReducer(initialState, addItem(cartMockItem));
    expect(itemNewState.items.length).toBe(3);
    const newTotalAmount = itemNewState.items.reduce(
      (total, item) => total + (item?.amount as number) * item.price,
      0
    );

    expect(itemNewState.totalAmount).toBe(newTotalAmount);
  });

  test('should remove amount of individual item from the cart', () => {
    const itemToRemove = {
      _id: '2',
      title: 'Product 2',
      price: 20,
      description: 'Description 2',
      category: { _id: '2', name: 'Category 2', image: 'Image 2' },
      images: ['Image 2'],
      amount: 3,
    };

    const stateAfterRemove = cartReducer(
      initialState,
      removeItem(itemToRemove)
    );

    expect(stateAfterRemove.items.length).toBe(2);

    const reducedItem = stateAfterRemove.items.find(
      (item) => item._id === itemToRemove._id
    );

    expect(reducedItem?.amount).toBe(2);
    expect(stateAfterRemove.totalAmount).toBe(60);
  });

  test('should delete item from the cart', () => {
    const itemToDelete = {
      _id: '2',
      title: 'Product 2',
      price: 20,
      description: 'Description 2',
      category: { _id: '2', name: 'Category 2', image: 'Image 2' },
      images: ['Image 2'],
      amount: 3,
    };

    const stateAfterDelete = cartReducer(
      initialState,
      deleteItem(itemToDelete)
    );

    expect(stateAfterDelete.items.length).toBe(1);

    const newTotalAmount =
      initialState.totalAmount - itemToDelete.amount * itemToDelete.price;

    expect(stateAfterDelete.totalAmount).toBe(newTotalAmount);
  });

  test('should not delete any item if it doesnot exist in cart', () => {
    const itemToDelete = {
      _id: '4',
      title: 'Product 4',
      price: 20,
      description: 'Description 4',
      category: { _id: '4', name: 'Category 4', image: 'Image 4' },
      images: ['Image 4'],
      amount: 3,
    };

    const stateAfterDelete = cartReducer(
      initialState,
      deleteItem(itemToDelete)
    );

    expect(stateAfterDelete.items.length).toBe(2);
  });

  test('should update the amount of the individual item in the cart if added again', () => {
    const itemToAdd = {
      _id: '1',
      title: 'Product 1',
      price: 20,
      description: 'Description 1',
      category: { _id: '1', name: 'Category 1', image: 'Image 1' },
      images: ['Image 1'],
      amount: 3,
    };

    const stateAfterAdd = cartReducer(initialState, addItem(itemToAdd));

    expect(stateAfterAdd.items[0].amount).toBe(5);
  });

  test('should clear all the cart items and amount', () => {
    const stateAfterClear = cartReducer(initialState, clearCart());

    expect(stateAfterClear.items).toEqual([]);
    expect(stateAfterClear.totalAmount).toBe(0);
  });
});
