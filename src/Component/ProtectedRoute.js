import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthWrapper = ({ element: Component, ...rest }) => {
   
  const isAuthenticated = localStorage.getItem("role") || localStorage.getItem("role1") !==null;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default AuthWrapper;
