import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Attendance from "./components/Attendance";
import Dashboard from "./components/Dashboard";
import EmployeeLocations from "./components/EmployeeLocations";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ADashboard from "./components/Manager/ADashboard";
import Ahome from "./components/Manager/Ahome";
import ProtectedRoute from "./components/ProtectedRoute";
import Worksite from "./Worksite";

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null; 
  };

  const getUserRole = () => {
    return localStorage.getItem('role'); 
  };

  return (
    <div className="h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        {/* Public route for login */}
        <Route path="/" element={<Login />} />

        {/* Protected routes for secured user */}
        <Route path="/secured/*" element={<ProtectedRoute isAuthenticated={isAuthenticated()} role={getUserRole()} />}>
          <Route path="home" element={<Home />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Attendance" element={<Attendance />} />
          <Route path="Worksite" element={<Worksite />} />
          <Route path="EmployeeLocations" element={<EmployeeLocations />} />
          <Route path="Logout" element={<Logout />} />
        </Route>

        {/* Protected routes for admin */}
        <Route path="/admin/*" element={<ProtectedRoute isAuthenticated={isAuthenticated()} role={getUserRole()} />}>
          <Route path="ADashboard" element={<ADashboard />} />
          <Route path="Ahome" element={<Ahome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
