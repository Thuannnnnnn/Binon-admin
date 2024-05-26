import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/layouts/dashboard'; // Adjust the path as necessary
import Auth from '@/layouts/auth'; // Adjust the path as necessary
import { AuthContext } from './Auth/AuthContext'; // Import AuthContext

function App() {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated, loading } = auth;
  console.log("isAuthenticated: " + isAuthenticated)
  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while checking authentication
  }

  return (
    <Routes>
      <Route

        path="/dashboard/*"
        element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth/sign-in"} replace />}
      />
    </Routes>
  );
}

export default App;
