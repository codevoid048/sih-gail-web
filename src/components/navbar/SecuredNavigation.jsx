//import React from 'react';
import { NavLink } from 'react-router-dom';

const SecuredNavigation = () => {
  const links = [
    {id:1, name:'Dashboard',path:'/secured/Dashboard'},
    {id:2, name: 'Employees', path: '/secured/home' }
  ]
  return (
    <div className='bg-white h-screen w-60 '>
        <div className='flex justify-center gap-10 py-3 flex-col'>
      {
        links?.map(link=>{
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

export default SecuredNavigation;