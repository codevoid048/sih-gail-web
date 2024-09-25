import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://attandance-backend-sih.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.username,
            password: values.password
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const userDetails = {
            username: values.username,
            token: data.token,
          };
          localStorage.setItem('user', JSON.stringify(userDetails));
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('role', data.user.role);
          localStorage.setItem('managerName', data.user.name);
          localStorage.setItem('managerId', data.user.managerId);
          toast.success('Login Successful!');
          navigate('/secured/home');
        } else {
          toast.error('Invalid credentials');
        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error('Something went wrong. Please try again later.');
      }
    }
  });

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-300">
      <div className="flex w-3/4 h-4/5 shadow-lg rounded-lg border-2 border-gray-400 overflow-hidden">
        <div className="w-2/3 border-r border-gray-400">
          <img
            src="https://wallpapercave.com/wp/wp9764031.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/3 flex flex-col justify-center items-center p-8 bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-2xl">
          <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
            <h2 className="text-3xl font-bold mb-6 text-black text-center">Login</h2>

            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="username" 
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
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
