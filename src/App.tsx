import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState, useAppDispatch } from './redux/store';
import { fetchAllProducts } from './redux/slices/ProductSlice';
import Wrapper from './components/wrapper/Wrapper';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Home, Products, ProductDetail } from './pages';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const productData = useSelector((state: AppState) => state.products.products);

  console.log('product data', productData);

  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
      </Routes>
      <Footer />
    </Wrapper>
  );
}

export default App;
