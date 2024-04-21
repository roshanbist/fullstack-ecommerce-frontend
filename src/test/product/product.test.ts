import productReducer, {
  createNewProduct,
  deleteProduct,
  fetchAllProducts,
  fetchSingleProduct,
  filterProductsList,
  updateSingleProduct,
} from '../../redux/slices/ProductSlice';
import {
  NewProductType,
  ProductInitialState,
  ProductType,
} from '../../types/Product';

const initialState: ProductInitialState = {
  products: [],
  totalNumber: 0,
  selectedSingleProduct: null,
  loading: false,
  error: '',
};

const mockProductsData = [
  {
    _id: '1',
    title: 'Product 1',
    price: 30,
    description: 'Description 1',
    category: { _id: '1', name: 'Category 1', image: 'Image 1' },
    images: ['Image 1'],
    size: ['S', 'M'],
  },
  {
    _id: '2',
    title: 'Product 2',
    price: 50,
    description: 'Description 2',
    category: { _id: '2', name: 'Category 2', image: 'Image 2' },
    images: ['Image 2a', 'Image 2b'],
    size: ['S', 'M'],
  },
  {
    _id: '3',
    title: 'Product 3',
    price: 50,
    description: 'Description 3',
    category: { _id: '3', name: 'Category 3', image: 'Image 3' },
    images: ['Image 3a', 'Image 3b'],
    size: ['S', 'M'],
  },
];

const mockSingleProductData = {
  _id: '4',
  title: 'Product 4',
  price: 40,
  description: 'Description 4',
  category: { _id: '4', name: 'Category 4', image: 'Image 4' },
  images: ['Image 4a', 'Image4b'],
  size: ['S', 'M'],
};

describe('product reducers', () => {
  // initial state of the product
  test('should return initial state of the products', () => {
    const productState = productReducer(undefined, { type: '' });
    expect(productState).toEqual(initialState);
  });

  // fetchAllProducts pending state
  // test('should have loading value true when fetching is pending', () => {
  //   const productState = productReducer(
  //     initialState,
  //     fetchAllProducts.pending('pending')
  //   );

  //   const updatedProductState = {
  //     products: [],
  //     selectedSingleProduct: null,
  //     loading: true,
  //     error: '',
  //   };

  //   expect(productState).toEqual(updatedProductState);
  // });

  // fetchAllProducts fulfilled state
  // test('should fetch all products when action is fulfilled', () => {
  //   const productState = productReducer(
  //     initialState,
  //     fetchAllProducts.fulfilled(mockProductsData, 'fulfilled')
  //   );

  //   const updatedProductState = {
  //     products: mockProductsData,
  //     selectedSingleProduct: null,
  //     loading: false,
  //     error: '',
  //   };

  //   expect(productState).toEqual(updatedProductState);
  // });

  // fetchAllProducts error state
  // test('should have error message when fetching action is rejected', () => {
  //   const errorResponse = new Error('error');

  //   const productState = productReducer(
  //     initialState,
  //     fetchAllProducts.rejected(errorResponse, 'rejected')
  //   );

  //   const updatedProductState = {
  //     products: [],
  //     selectedSingleProduct: null,
  //     loading: false,
  //     error: errorResponse.message,
  //   };

  //   expect(productState).toEqual(updatedProductState);
  // });

  // fetchsingle product data pending state of the action
  test('should have loading true when fetching single product data', () => {
    // const id = mockProductsData[0].id;

    const singleProductState = productReducer(
      initialState,
      fetchSingleProduct.pending('pending', '1')
    );

    const updatedSingleProductState = {
      products: [],
      selectedSingleProduct: null,
      loading: true,
      error: '',
    };

    expect(singleProductState).toEqual(updatedSingleProductState);
  });

  // fetchsingle product data pending state of the action
  test('should fetch single product data', () => {
    const singleProductState = productReducer(
      initialState,
      fetchSingleProduct.fulfilled(mockSingleProductData, 'fulfilled', '1')
    );

    const updatedSingleProductState = {
      products: [],
      selectedSingleProduct: mockSingleProductData,
      loading: false,
      error: '',
    };

    expect(singleProductState).toEqual(updatedSingleProductState);
  });

  // fetchsingle product rejected state
  test('should have error when rejected', () => {
    const errorResponse = new Error('error');
    const singleProductState = productReducer(
      initialState,
      fetchSingleProduct.rejected(errorResponse, 'rejected', '1')
    );

    const updatedSingleProductState = {
      products: [],
      selectedSingleProduct: null,
      loading: false,
      error: errorResponse.message,
    };

    expect(singleProductState).toEqual(updatedSingleProductState);
  });

  // createproduct pending state
  test('should have loading true when creating product is pending', () => {
    const newProduct: NewProductType = {
      title: 'Product 5',
      price: 50,
      description: 'Description 5',
      categoryId: '1',
      images: ['Image 5a', 'Image5b'],
      size: ['S', 'M'],
    };

    const newProductState = productReducer(
      initialState,
      createNewProduct.pending('pending', newProduct)
    );

    const updatedSingleProductState = {
      products: [],
      selectedSingleProduct: null,
      loading: true,
      error: '',
    };

    expect(newProductState).toEqual(updatedSingleProductState);
  });

  // createproduct fulfilled state
  test('should have product added to the products list', () => {
    const newProductData: NewProductType = {
      title: 'Product 5',
      price: 50,
      description: 'Description 5',
      categoryId: '5',
      images: ['Image 5a', 'Image5b'],
      size: ['S', 'M'],
    };

    const apiResponseData: ProductType = {
      _id: '5',
      title: newProductData.title,
      price: newProductData.price,
      description: newProductData.description,
      images: newProductData.images,
      size: newProductData.size,
      category: {
        _id: newProductData.categoryId,
        name: 'Category 5',
        image: 'Image 5',
      },
    };

    const newProductState = productReducer(
      initialState,
      createNewProduct.fulfilled(apiResponseData, 'fulfilled', newProductData)
    );

    const updatedProductsState = {
      products: [apiResponseData],
      selectedSingleProduct: null,
      loading: false,
      error: '',
    };

    expect(newProductState).toEqual(updatedProductsState);
  });

  // create product rejected state
  test('should have error when rejected for creating new product', () => {
    const errorResponse = new Error('error');

    const newProductData: NewProductType = {
      title: 'Product 5',
      price: 50,
      description: 'Description 5',
      categoryId: '1',
      images: ['Image 5a', 'Image5b'],
      size: ['S', 'M'],
    };

    const newProductState = productReducer(
      initialState,
      createNewProduct.rejected(errorResponse, 'rejected', newProductData)
    );

    const updatedProductsState = {
      products: [],
      selectedSingleProduct: null,
      loading: false,
      error: errorResponse.message,
    };

    expect(newProductState).toEqual(updatedProductsState);
  });

  // update product pending state
  test('should have loading true when updating product is pending', () => {
    const productInitialState = {
      ...initialState,
      products: [mockSingleProductData],
    };

    const updateProductData = {
      ...mockSingleProductData,
      price: 60,
    };

    const newProductState = productReducer(
      productInitialState,
      updateSingleProduct.pending('pending', {
        ...updateProductData,
      })
    );

    const expectedProductState = {
      products: [mockSingleProductData],
      selectedSingleProduct: null,
      loading: true,
      error: '',
    };

    expect(newProductState).toEqual(expectedProductState);
  });

  // update product fulfilled state
  test('should update product when fulfilled', () => {
    const productInitialState = {
      ...initialState,
      products: [mockSingleProductData],
    };

    const updateProductData = {
      ...mockSingleProductData,
      price: 60,
    };

    const newProductState = productReducer(
      productInitialState,
      updateSingleProduct.fulfilled(updateProductData, 'fulfilled', {
        ...updateProductData,
      })
    );

    const expectedProductState = {
      products: [updateProductData],
      selectedSingleProduct: null,
      loading: false,
      error: '',
    };

    expect(newProductState).toEqual(expectedProductState);
  });

  // update product rejected state
  test('should have error when rejected while updating product', () => {
    const productInitialState = {
      ...initialState,
      products: [mockSingleProductData],
    };

    const updateProductData = {
      ...mockSingleProductData,
      price: 60,
    };

    const errorResponse = new Error('error');

    const newProductState = productReducer(
      productInitialState,
      updateSingleProduct.rejected(errorResponse, 'rejected', {
        ...updateProductData,
      })
    );

    const expectedProductState = {
      products: [mockSingleProductData],
      selectedSingleProduct: null,
      loading: false,
      error: errorResponse.message,
    };

    expect(newProductState).toEqual(expectedProductState);
  });

  // delete product pending state
  test('should have loading true when deletion is pending', () => {
    const productInitialState = {
      ...initialState,
      products: [mockSingleProductData],
    };

    const newProductState = productReducer(
      productInitialState,
      deleteProduct.pending('pending', '1')
    );

    const expectedProductState = {
      products: [mockSingleProductData],
      selectedSingleProduct: null,
      loading: true,
      error: '',
    };

    expect(newProductState).toEqual(expectedProductState);
  });

  // delete product fulfilled state
  test('should delete product when action is fulfilled', () => {
    const productInitialState = {
      ...initialState,
      products: [mockSingleProductData],
    };

    const newProductState = productReducer(
      productInitialState,
      deleteProduct.fulfilled(
        { productId: mockSingleProductData._id, data: true },
        'fulfilled',
        '1'
      )
    );

    const expectedProductState = {
      products: [],
      selectedSingleProduct: null,
      loading: false,
      error: '',
    };

    expect(newProductState).toEqual(expectedProductState);
  });

  // delete product error state
  test('should have error when rejected while deleting product', () => {
    const productInitialState = {
      ...initialState,
      products: [mockSingleProductData],
    };

    const errorResponse = new Error('error');

    const newProductState = productReducer(
      productInitialState,
      deleteProduct.rejected(errorResponse, 'rejected', '1')
    );

    const expectedProductState = {
      products: [mockSingleProductData],
      selectedSingleProduct: null,
      loading: false,
      error: errorResponse.message,
    };

    expect(newProductState).toEqual(expectedProductState);
  });

  // filter product pending state
  // test('should have loading true when filtering products', () => {
  //   const productInitialState = {
  //     ...initialState,
  //     products: mockProductsData,
  //   };

  //   const filterParams = {
  //     title: 'product1',
  //     categoryId: '1',
  //     price: 30,
  //   };

  //   const newProductState = productReducer(
  //     productInitialState,
  //     filterProductsList.pending('pending', filterParams)
  //   );

  //   const expectedProductState = {
  //     products: mockProductsData,
  //     selectedSingleProduct: null,
  //     loading: true,
  //     error: '',
  //   };

  //   expect(newProductState).toEqual(expectedProductState);
  // });

  // filter product fulfilled state
  // test('should have filtered products', () => {
  //   const productInitialState = {
  //     ...initialState,
  //     products: mockProductsData,
  //   };

  //   const filterParams = {
  //     title: 'product1',
  //     categoryId: '1',
  //     price: 50,
  //   };

  //   const newProductState = productReducer(
  //     productInitialState,
  //     filterProductsList.fulfilled(
  //       [mockProductsData[0]],
  //       'fulfilled',
  //       filterParams
  //     )
  //   );

  //   const expectedProductState = {
  //     products: [mockProductsData[0]],
  //     selectedSingleProduct: null,
  //     loading: false,
  //     error: '',
  //   };

  //   expect(newProductState).toEqual(expectedProductState);
  // });

  // filter product error state
  // test('should have error when rejected while filtering products', () => {
  //   const productInitialState = {
  //     ...initialState,
  //     products: mockProductsData,
  //   };

  //   const filterParams = {
  //     title: 'product1',
  //     categoryId: '1',
  //     price: 50,
  //   };

  //   const errorResponse = new Error('error');

  //   const newProductState = productReducer(
  //     productInitialState,
  //     filterProductsList.rejected(errorResponse, 'rejected', filterParams)
  //   );

  //   const expectedProductState = {
  //     products: mockProductsData,
  //     selectedSingleProduct: null,
  //     loading: false,
  //     error: errorResponse.message,
  //   };

  //   expect(newProductState).toEqual(expectedProductState);
  // });
});
