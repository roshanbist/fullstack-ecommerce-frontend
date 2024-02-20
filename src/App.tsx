import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Home, Products, ProductDetail } from './pages';

function App() {
  // const storeIt: string = 'hello world';
  // localStorage.setItem('new', storeIt);
  return (
    <div className='overflow-hidden w-full relative'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
