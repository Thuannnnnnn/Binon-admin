import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/layouts/dashboard';
import Auth from '@/layouts/auth'; 
import { AuthContext } from './Auth/AuthContext';

function App() {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, loading } = auth;
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Routes>
      <Route

        path="/dashboard/*"
        element={isAuthenticated ? <Dashboard /> : <Navigate to={"/auth/sign-in"} />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth/sign-in"} replace />}
      />
    </Routes>
  );
}

export default App;
