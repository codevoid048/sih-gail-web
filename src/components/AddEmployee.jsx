import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [isCancelPopupVisible, setCancelPopupVisible] = useState(false);

  const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee ID is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNum: Yup.string().required('Phone Number is required'),
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
      // Create FormData to send file and other data
      const formData = new FormData();
      formData.append('employeeId', values.employeeId);
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('phoneNum', values.phoneNum);
      formData.append('email', values.email);
      formData.append('officeAddress', values.officeAddress);
      formData.append('managerId', values.managerId);
      formData.append('profilePic', values.profilePic);

      try {
        // Send data to the backend via API
        await axios.post('/api/employees', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
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
    navigate('/secured/home');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
  <form
    className="bg-white p-8 rounded shadow-md w-full max-w-4xl h-[600px]"
    onSubmit={formik.handleSubmit}
  >
    <h2 className="text-2xl font-bold mb-6">Create New Employee</h2>

    {/* Flex container for two columns */}
    <div className="flex flex-wrap -mx-2">
      {/* Column 1 */}
      <div className="w-full md:w-1/2 px-2">
        {/* Employee ID */}
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

        {/* First Name */}
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

        {/* Last Name */}
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

        {/* Phone Number */}
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

      {/* Column 2 */}
      <div className="w-full md:w-1/2 px-2">
        {/* Email */}
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

        {/* Office Address */}
        <div className="mb-4">
          <label htmlFor="officeAddress" className="block text-gray-700">
            Initial Office Address
          </label>
          <input
            type="text"
            id="officeAddress"
            name="officeAddress"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            onChange={formik.handleChange}
            value={formik.values.officeAddress}
          />
          {formik.touched.officeAddress && formik.errors.officeAddress ? (
            <div className="text-red-500 text-sm">
              {formik.errors.officeAddress}
            </div>
          ) : null}
        </div>

        {/* Manager ID */}
        <div className="mb-4">
          <label htmlFor="managerId" className="block text-gray-700">
            Manager ID
          </label>
          <input
            type="text"
            id="managerId"
            name="managerId"
            className="w-full px-3 py-2 border-gray border rounded-md bg-white text-black"
            onChange={formik.handleChange}
            value={formik.values.managerId}
          />
          {formik.touched.managerId && formik.errors.managerId ? (
            <div className="text-red-500 text-sm">{formik.errors.managerId}</div>
          ) : null}
        </div>

        {/* Profile Picture */}
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

    {/* Submit and Cancel Buttons */}
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

export default AddEmployee;