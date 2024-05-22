import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default PrivateRoute;
