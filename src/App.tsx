import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Wrapper from './components/wrapper/Wrapper';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Home, Products, ProductDetail } from './pages';

function App() {
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
