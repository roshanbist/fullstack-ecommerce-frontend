import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import {
  Home,
  Products,
  ProductDetail,
  Login,
  Register,
  CustomerProfile,
  Admin,
  Cart,
} from './pages';
import { useAppDispatch } from './redux/store';
import { getLoggedUserInfo } from './redux/slices/UserSlice';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import EditProfile from './components/user/EditProfile';
import ProductDashboard from './components/adminContent/ProductDashboard';
import AddNewProduct from './components/adminContent/AddNewProduct';
import UpdateProduct from './components/adminContent/UpdateProduct';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const storedUser = localStorage.getItem('userToken');

  useEffect(() => {
    if (storedUser) {
      dispatch(getLoggedUserInfo());
    }
  }, [dispatch, storedUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className='overflow-hidden w-full relative'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/customer-profile'
          element={<ProtectedRoute>{<CustomerProfile />}</ProtectedRoute>}
        />
        <Route
          path='/edit-profile/:id'
          element={<ProtectedRoute>{<EditProfile />}</ProtectedRoute>}
        />
        <Route
          path='/admin'
          element={<ProtectedRoute>{<Admin />}</ProtectedRoute>}
        />
        <Route
          path='/product-dashboard'
          element={<ProtectedRoute>{<ProductDashboard />}</ProtectedRoute>}
        />
        <Route
          path='/add-new-product'
          element={<ProtectedRoute>{<AddNewProduct />}</ProtectedRoute>}
        />
        <Route
          path='/update-product/:id'
          element={<ProtectedRoute>{<UpdateProduct />}</ProtectedRoute>}
        />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default App;
