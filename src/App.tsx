import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import {
  Home,
  Products,
  ProductDetail,
  Login,
  Register,
  Profile,
} from './pages';
import { ToastContainer } from 'react-toastify';
import { AppState, useAppDispatch } from './redux/store';
import { useSelector } from 'react-redux';
import { getLoggedUserInfo } from './redux/slices/UserSlice';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(getLoggedUserInfo);
  }, [dispatch]);

  return (
    <div className='overflow-hidden w-full relative'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default App;
