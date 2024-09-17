import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
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
    onSubmit: (values) => {
      if (values.username === 'admin' && values.password === 'admin') {
        navigate('/secured/home');
      } 
      else if(values.username === 'manager' && values.password === 'manager'){
          navigate('/admin/ahome');
      }
      else {
        alert('Invalid credentials');
      }
    }
  });

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-300">
      {/* Main container: Grid layout with two columns */}
      <div className="flex w-3/4 h-4/5 shadow-lg rounded-lg border-2 border-gray-400 overflow-hidden">
        {/* Left Side: Image */}
        <div className="w-2/3 border-r border-gray-400">
          <img
            src="https://wallpapercave.com/wp/wp9764031.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Login Form */}
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