/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Employees = ({ onAddEmployee, onViewEmployee }) => {
  const [employees, setEmployees] = useState([
  //   { id: 1, employerId : 1, name: 'John Prakash', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email: 'john@gmail.com', managerID : 1 },
  //   { id: 2, employerId : 2, name: 'Praveen', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'praveen@gmail.com', managerID : 1 },
  //   { id: 3, employerId : 3, name: 'Vikram', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'vikram@gmail.com', managerID : 2},
  //   { id: 4, employerId : 4, name: 'William', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'william@gmail.com', managerID : 3},
  //   { id: 5, employerId : 5, name: 'Revathi', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'revathi@gmail.com', managerID : 3},
  //   { id: 6, employerId : 6, name: 'Jahnavi', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'jahnavi@gmail.com', managerID : 1}
  // 
  ]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
  try {
    const response = await fetch('https://attandance-backend-sih.onrender.com/api/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setEmployees(data); // Adjust if your data structure is different
  } catch (error) {
    setError('Failed to fetch managers');
  } finally {
    setLoading(false);
  }
};

fetchEmployees();
}, []);
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
        onClick={onAddEmployee}>
          + Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEmployees.map(employee => (
          <div key={employee.id} className="bg-white p-4 rounded shadow-md">
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 w-16 h-16 rounded-full mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-600">{employee.name}</h3>
              <p className="text-gray-500">{employee.role}</p>
              <button 
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
                onClick={() => onViewEmployee(employee)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddEmployee = ({ onCancel }) => {
  const navigate = useNavigate();
  const [isCancelPopupVisible, setCancelPopupVisible] = useState(false);

  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // useEffect (() => {
  //   console.log(managers);
  // }[managers, ]);
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch('https://attandance-backend-sih.onrender.com/api/user/listmanagers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setManagers(data); // Adjust if your data structure is different
      } catch (err) {
        setError('Failed to fetch managers');
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee ID is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNum: Yup.string().required('Phone Number is required').matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    officeAddress: Yup.string().required('Initial Office Address is required'),
    managerId: Yup.string().required('Manager ID is required'),
    profilePic: Yup.mixed().required('Profile Picture is required')
  });

  const formik = useFormik({
    initialValues: {
      employeeId: '',
      firstName: '',
      lastName: '',
      phoneNum: '',
      email: '',
      officeAddress: '',
      managerId: '',
      profilePic: null
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('employeeId', values.employeeId);
      formData.append('name', value.firstName + values.lastName);
      formData.append('phoneNum', values.phoneNum);
      formData.append('email', values.email);
      formData.append('officeAddress', values.officeAddress);
      formData.append('managerId', values.managerId);
      formData.append('profilePic', values.profilePic);

      try {
        await axios.post('https://attandance-backend-sih.onrender.com/api/user/createemployee', formData, {
          headers: { 'Content-Type': 'multipart/form-data'},
        });
        alert('Employee Created Successfully');
        navigate('/employees');
      } catch (error) {
        alert('Error creating employee');
      }
    },
  });
  
  const handleCancel = () => {
    setCancelPopupVisible(true);
  };

  const confirmCancel = () => {
    setCancelPopupVisible(false);
    onCancel();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
  <form
    className="bg-white p-8 rounded shadow-md w-full max-w-4xl h-[600px]"
    onSubmit={formik.handleSubmit}
  >
    <h2 className="text-2xl font-bold mb-6">Create New Employee</h2>

    <div className="flex flex-wrap -mx-2">
      <div className="w-full md:w-1/2 px-2">
        <div className="mb-4">
          <label htmlFor="employeeId" className="block text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            onChange={formik.handleChange}
            value={formik.values.employeeId}
          />
          {formik.touched.employeeId &&  formik.errors.employeeId ? (
            <div className="text-red-500 text-sm">
              {formik.errors.employeeId}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNum" className="block text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNum"
            name="phoneNum"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            onChange={formik.handleChange}
            value={formik.values.phoneNum}
          />
          {formik.touched.phoneNum && formik.errors.phoneNum ? (
            <div className="text-red-500 text-sm">{formik.errors.phoneNum}</div>
          ) : null}
        </div>
      </div>

      <div className="w-full md:w-1/2 px-2">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="officeAddress" className="block text-gray-700">
            Initial Office Address
          </label>
          <select
            id="officeAddress"
            name="officeAddress"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            onChange={formik.handleChange}
            value={formik.values.officeAddress}
          >
            <option value="" label="Select a location" />
            <option value="BVRM" label="BVRM" />
            <option value="HYD" label="HYD" />
            <option value="BLR" label="BLR" />
            <option value="DEL" label="DEL" />
            <option value="MUM" label="MUM" />
          </select>
          {formik.touched.officeAddress && formik.errors.officeAddress ? (
            <div className="text-red-500 text-sm">
              {formik.errors.officeAddress}
            </div>
          ) : null}
        </div>


        <div className="mb-4">
          <label htmlFor="managerId" className="block text-gray-700">
            Manager ID
          </label>
          <select
            id="managerId"
            name="managerId"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            //onChange ={ e => setManager(e.target.value)}
           // Use Formik's handleChange
            onBlur={formik.handleBlur} // Handle blur for validation
            value={formik.values.managerId} // Ensure value is controlled by Formik
          >
            <option value="" label="Select Manager" />
            {loading ? (
              <option value="" disabled>Loading...</option>
            ) : error ? (
              <option value="" disabled>{error}</option>
            ) : (
              managers.map((manager) => (
                <option key={manager.id} value={manager.id}  label={manager.name} />
              ))
            )}
          </select>
          {formik.touched.managerId && formik.errors.managerId ? (
            <div className="text-red-500 text-sm">{formik.errors.managerId}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="profilePic" className="block text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            className="w-full cursor-pointer rounded border-gray border bg-clip-padding px-3 py-2 text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-2 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none  dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            onChange={(event) => {
              formik.setFieldValue('profilePic', event.currentTarget.files[0]);
            }}
          />
          {formik.touched.profilePic && formik.errors.profilePic ? (
            <div className="text-red-500 text-sm">{formik.errors.profilePic}</div>
          ) : null}
        </div>
      </div>
    </div>

    <div className="flex justify-between">
      <button
        type="button"
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  </form>

  {isCancelPopupVisible && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-black">
          Are you sure you want to cancel?
        </h3>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mr-2"
            onClick={() => setCancelPopupVisible(false)}
          >
            No
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={confirmCancel}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

const ViewEmployee = ({ employee, onCancel }) => {
  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-300'>
      <div className='w-[60%] max-w-md'>
        <div className='text-black border border-gray-300 rounded-lg p-6 bg-white shadow-lg'>
          <h2 className='text-2xl font-bold mb-4'>Employee Details</h2>
          <form className='space-y-4 flex flex-col'>
            <div>
              <label htmlFor='name' className='block text-gray-700 font-medium'>Name:</label>
              <input
                type='text'
                id='name'
                value={employee.name}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed'
              />
            </div>

            <div>
              <label htmlFor='employeeId' className='block text-gray-700 font-medium'>Employee ID:</label>
              <input
                type='text'
                id='employeeId'
                value={employee.employerId}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed'
              />
            </div>

            <div>
              <label htmlFor='phoneNum' className='block text-gray-700 font-medium'>Phone Number:</label>
              <input
                type='text'
                id='phoneNum'
                value={employee.phoneNum}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed'
              />
            </div>

            <div>
              <label htmlFor='email' className='block text-gray-700 font-medium'>Email:</label>
              <input
                type='email'
                id='email'
                value={employee.email}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed'
              />
            </div>

            <div>
              <label htmlFor='officeAddress' className='block text-gray-700 font-medium'>Office Address:</label>
              <input
                type='text'
                id='officeAddress'
                value={employee.initialOfficeLocation}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed'
              />
            </div>

            <div>
              <label htmlFor='managerId' className='block text-gray-700 font-medium'>Manager ID:</label>
              <input
                type='text'
                id='managerId'
                value={employee.managerID}
                readOnly
                className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed'
              />
            </div>

            <div className='flex justify-between mt-6'>
              <button
                type='button'
                onClick={onCancel}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200'
              >
                Back
              </button>
              <button
                type='button'
                onClick={onCancel}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200'
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // New state for selected employee

  return (
    <div className="p-6">
      {!isAddingEmployee && !selectedEmployee ? (
        <Employees 
          onAddEmployee={() => setIsAddingEmployee(true)} 
          onViewEmployee={(employee) => setSelectedEmployee(employee)} // Pass selected employee
        />
      ) : isAddingEmployee ? (
        <AddEmployee onCancel={() => setIsAddingEmployee(false)} />
      ) : (
        <ViewEmployee 
          employee={selectedEmployee} 
          onCancel={() => setSelectedEmployee(null)} // Go back to Employees list
        />
      )}
    </div>
  );
};

export default Home;