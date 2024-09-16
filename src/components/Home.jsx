import React, { useState } from 'react';

const Home = () => {
  const [employees] = useState([
    { id: 1, name: 'Jeeani Basha', role: 'Employee' },
    { id: 2, name: 'Kiran Puvvala', role: 'Employee' },
    { id: 3, name: 'Sara Ali', role: 'Employee' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <input 
          type="text" 
          placeholder="Search Employee" 
          className="border px-4 py-2 rounded-md w-1/5" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          + Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEmployees.map(employee => (
          <div key={employee.id} className="bg-white p-4 rounded shadow-md">
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 w-16 h-16 rounded-full mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-600">{employee.name}</h3>
              <p className="text-gray-500">{employee.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
