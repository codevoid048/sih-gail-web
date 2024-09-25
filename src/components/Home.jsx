/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  Button, Card, CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Grow,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


const Employees = ({ onAddEmployee, onViewEmployee }) => {
  const [employees, setEmployees] = useState([
    { id: 1, employerId : 1, name: 'John Prakash', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email: 'john@gmail.com', managerID : 1 },
    { id: 2, employerId : 2, name: 'Praveen', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'praveen@gmail.com', managerID : 1 },
    { id: 3, employerId : 3, name: 'Vikram', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'vikram@gmail.com', managerID : 2},
    { id: 4, employerId : 4, name: 'William', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'william@gmail.com', managerID : 3},
    { id: 5, employerId : 5, name: 'Revathi', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'revathi@gmail.com', managerID : 3},
    { id: 6, employerId : 6, name: 'Jahnavi', role: 'Employee', initialOfficeLocation : 'BVRM', phoneNum : '9999999999', email : 'jahnavi@gmail.com', managerID : 1}
  
  ]);
  
//   useEffect(() => {
//     const fetchEmployees = async () => {
//   try {
//     const response = await fetch('https://attandance-backend-sih.onrender.com/api/user');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     setEmployees(data); // Adjust if your data structure is different
//   } catch (error) {
//     setError('Failed to fetch Employees');
//   } finally {
//     setLoading(false);
//   }
// };

// fetchEmployees();
// }, []);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 ">
      {filteredEmployees.map((employee, index) => (
        <Grow 
          in={true} 
          timeout={(index + 1) * 100} 
          key={employee.id} 
          style={{ transformOrigin: '0 0 0' }} 
        >
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="flex flex-col items-center p-6 transition-transform duration-300 transform hover:scale-105">
              <div className="bg-gray-300 w-24 h-24 rounded-full mb-4 flex items-center justify-center">
                <Typography variant="h5" className="text-gray-700 font-bold">{employee.name.charAt(0)}</Typography>
              </div>
              <Typography variant="h6" className="text-lg font-semibold text-gray-800 mb-1">
                {employee.name}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => onViewEmployee(employee)}
                className="w-full mt-2 hover:bg-blue-800"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grow>
      ))}
    </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredEmployees.map(employee => (
          <div 
            key={employee.id} 
            className="bg-white p-4 rounded-md shadow-md transition-transform duration-300 transform hover:scale-105" // Add transition and scale classes
          >
            <div className="flex flex-col items-center">
              <div className="bg-gray-300 w-16 h-16 rounded-full mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-600">{employee.name}</h3>
              <button 
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
                onClick={() => onViewEmployee(employee)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

const AddEmployee = ({ onCancel }) => {
  const navigate = useNavigate();
  const [isCancelPopupVisible, setCancelPopupVisible] = useState(false);
  const manager = localStorage.getItem('managerName');
  const [fileName, setFileName] = useState(''); // State to store file name


  const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee ID is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNum: Yup.string().required('Phone Number is required').matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    officeAddress: Yup.string().required('Initial Office Address is required'),
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
      formData.append('name', values.firstName + values.lastName);
      formData.append('phoneNum', values.phoneNum);
      formData.append('email', values.email);
      formData.append('officeAddress', values.officeAddress);
      formData.append('managerId', 1);  // Modify this based on logic
      formData.append('profilePic', values.profilePic);
      
      try {
        await axios.post('https://attandance-backend-sih.onrender.com/api/user/createemployee', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
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
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '90vh', backgroundColor: '#f0f0f0' }}>
      <Paper elevation={3} style={{ padding: '30px', width: '600px' }}>
        <Typography variant="h5" gutterBottom>Create New Employee</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="employeeId"
                name="employeeId"
                label="Employee ID"
                value={formik.values.employeeId}
                onChange={formik.handleChange}
                error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                helperText={formik.touched.employeeId && formik.errors.employeeId}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="phoneNum"
                name="phoneNum"
                label="Phone Number"
                value={formik.values.phoneNum}
                onChange={formik.handleChange}
                error={formik.touched.phoneNum && Boolean(formik.errors.phoneNum)}
                helperText={formik.touched.phoneNum && formik.errors.phoneNum}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Initial Office Address</InputLabel>
                <Select
                  id="officeAddress"
                  name="officeAddress"
                  value={formik.values.officeAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.officeAddress && Boolean(formik.errors.officeAddress)}
                >
                  <MenuItem value="BVRM">BVRM</MenuItem>
                  <MenuItem value="HYD">HYD</MenuItem>
                  <MenuItem value="BLR">BLR</MenuItem>
                  <MenuItem value="DEL">DEL</MenuItem>
                  <MenuItem value="MUM">MUM</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.officeAddress && formik.errors.officeAddress && (
                <Typography variant="caption" color="error">{formik.errors.officeAddress}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="managerId"
                label="Manager"
                value={manager}
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Profile Picture
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    formik.setFieldValue('profilePic', file);
                    setFileName(file ? file.name : ''); // Store file name
                  }}
                />
              </Button>

              {/* Display the file name after it's selected */}
              {fileName && (
                <Typography variant="body2" color="textSecondary">
                  Selected file: {fileName}
                </Typography>
              )}

              {/* Show validation errors */}
              {formik.touched.profilePic && formik.errors.profilePic && (
                <Typography variant="caption" color="error">
                  {formik.errors.profilePic}
                </Typography>
              )}
            </Grid>

          </Grid>

          <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Grid>
        </form>
      </Paper>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={isCancelPopupVisible} onClose={() => setCancelPopupVisible(false)}>
        <DialogTitle>Cancel Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to cancel?</DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelPopupVisible(false)} color="primary">
            No
          </Button>
          <Button onClick={confirmCancel} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

const ViewEmployee = ({ employee, onCancel }) => {
  return (
    <div className="flex items-center justify-center h-100vh">
      <div className="w-full max-w-2xl h-90vh">
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Employee Details</h2>
          <form className="space-y-6">

            {/* Employee Name */}
            <div>
              <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">Name </label>
              <input
                type="text"
                id="name"
                value={employee.name}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Employee ID */}
            <div>
              <label htmlFor="employeeId" className="block text-gray-600 font-semibold mb-2">Employee ID </label>
              <input
                type="text"
                id="employeeId"
                value={employee.employerId}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNum" className="block text-gray-600 font-semibold mb-2">Phone Number </label>
              <input
                type="text"
                id="phoneNum"
                value={employee.phoneNum}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Email </label>
              <input
                type="email"
                id="email"
                value={employee.email}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Office Address */}
            <div>
              <label htmlFor="officeAddress" className="block text-gray-600 font-semibold mb-2">Office Address </label>
              <input
                type="text"
                id="officeAddress"
                value={employee.initialOfficeLocation}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-all duration-200 focus:outline-none"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all duration-200 focus:outline-none"
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
  const location = useLocation();
  useEffect(() => {
    if (location.state?.fromLogin) {
      toast.success('Welcome to the secured home page!');
    }
  }, [location]);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  return (
    <div className="p-6">
      {!isAddingEmployee && !selectedEmployee ? (
        <Employees 
          onAddEmployee={() => setIsAddingEmployee(true)} 
          onViewEmployee={(employee) => setSelectedEmployee(employee)} 
        />
      ) : isAddingEmployee ? (
        <AddEmployee onCancel={() => setIsAddingEmployee(false)} />
      ) : (
        <ViewEmployee 
          employee={selectedEmployee} 
          onCancel={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};

export default Home;