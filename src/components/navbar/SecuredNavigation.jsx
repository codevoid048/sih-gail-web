
import { NavLink } from 'react-router-dom';

const SecuredNavigation = () => {
  const links = [
    { id: 1, name: 'Dashboard', path: '/secured/Dashboard' },
    { id: 2, name: 'Employees', path: '/secured/home' },
    { id: 3, name: 'Attendance', path:'/secured/Attendance'},
    { id: 4, name: 'Worksite', path:'/secured/Worksite'},
    { id: 5, name: 'EmployeeLocations', path: '/secured/EmployeeLocations' },
    { id: 6, name: 'Logout', path:'/secured/Logout'}
  ];

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 h-screen w-60 text-white shadow-lg">
      <div className="flex flex-col py-6 space-y-4">
        <h1 className="text-center text-2xl font-bold mb-6">Manager Panel</h1>
        {
          links.map(link => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? 'bg-gray-700 px-6 py-3 rounded-lg shadow-md text-white font-medium transition-colors duration-300'
                  : 'px-6 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300'
              }
            >
              {link.name}
            </NavLink>
          ))
        }
      </div>
      
    </div>
  );
}

export default SecuredNavigation;
