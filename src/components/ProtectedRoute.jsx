/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ManagerNavigation from './navbar/ManagerNavigation';
import SecuredNavigation from './navbar/SecuredNavigation';

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const role = localStorage.getItem('role');
  const isManager = role === 'manager';
  const isAdmin = role === 'admin';

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (isAdmin) {
    return (
      <div className="flex w-screen">
        <SecuredNavigation />
        <div className="flex-1 w-full bg-[#f0f0f0]">    
          <Outlet />
        </div>
      </div>
    );
  } else if (isManager) {
    return (
      <div className="flex w-screen">
        <ManagerNavigation />
        <div className="flex-1 w-full bg-[#f0f0f0]">
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
