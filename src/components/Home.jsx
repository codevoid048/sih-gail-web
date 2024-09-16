/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const [employees] = useState([
    { id: 1, name: 'John Prakash', role: 'Employee' },
    { id: 2, name: 'Praveen', role: 'Employee' },
    { id: 3, name: 'Vikram', role: 'Employee' },
    { id: 4, name: 'William', role: 'Employee'},
    { id: 5, name: 'Revathi', role: 'Employee'},
    { id: 6, name: 'Jahnavi', role: 'Employee'}
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
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        onClick={() => navigate('/secured/Home')}>
          + Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
