import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({adminData, children}) {
  // Check if user is authenticated by verifying both adminData and token
  const isAuthenticated = adminData !== null && localStorage.getItem("adminToken") !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children;
}
