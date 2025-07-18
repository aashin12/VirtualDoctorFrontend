// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected page
  return children;
};

export default ProtectedRoute;
