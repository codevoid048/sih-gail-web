import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import SecuredNavigation from './navbar/SecuredNavigation';

const ProtectedRoute = () => {
  const isAuthenticated = true;
  return isAuthenticated ? (
    <div className='flex w-screen'>
      <SecuredNavigation />
      <div className='flex-1 w-full bg-[#f0f0f0]'>
      <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );

}

export default ProtectedRoute