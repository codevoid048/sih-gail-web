import React from 'react';
import { NavLink } from 'react-router-dom';

const ManagerNavigation = () => {
  const alinks = [
    {id:1, name: 'overallDashboard', path: '/admin/ADashboard' },
    {id:2, name: 'OverallEmployees', path: '/admin/Ahome' }
  ]
  return (
    <div className='bg-white h-screen w-60 '>
      <div className='flex justify-center gap-10 py-3 flex-col'>
      {
        alinks?.map(link=>{
          return (
          <NavLink key={link.id} to={link.path} >
            {link.name}
          </NavLink>
          );
        })
      }
      </div>
    </div>
  )
}

export default ManagerNavigation;