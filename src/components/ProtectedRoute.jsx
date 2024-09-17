import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SecuredNavigation from './navbar/SecuredNavigation';
import ManagerNavigation from './navbar/ManagerNavigation';

const ProtectedRoute = () => {
  const isManager = true;
  const isAdmin = false;

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
