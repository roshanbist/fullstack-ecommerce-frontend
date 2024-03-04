import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userToken') ? true : false;

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
