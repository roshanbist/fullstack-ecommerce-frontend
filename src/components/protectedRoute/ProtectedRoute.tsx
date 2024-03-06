import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  children: JSX.Element;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const storedRole = localStorage.getItem('userRole');
  const allowedRolesLength = allowedRoles?.length;

  if (storedRole) {
    if (allowedRoles) {
      if (allowedRoles.includes(storedRole)) {
        return children;
      } else {
        return <Navigate to='/' />;
      }
    } else if (allowedRolesLength === 0 && storedRole === 'customer') {
      return <Navigate to='/customer-profile' />;
    } else if (allowedRolesLength === 0 && storedRole === 'admin') {
      return <Navigate to='/admin' />;
    }
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};

export default ProtectedRoute;
