import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.username === 'admin' && values.password === 'admin') {
        navigate('/secured/home');  
      } else {
        alert('Invalid credentials');
      }
    }
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
      <form 
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-black flex justify-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-3 py-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded "
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          ) : null}
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
