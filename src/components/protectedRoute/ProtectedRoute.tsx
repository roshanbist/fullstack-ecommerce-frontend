import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppState } from '../../redux/store';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { loggedUser } = useSelector((state: AppState) => state.users);

  return loggedUser &&
    (loggedUser.role === 'admin' || loggedUser.role === 'customer') ? (
    children
  ) : (
    <Navigate to='/login' replace />
  );
};

export default ProtectedRoute;
