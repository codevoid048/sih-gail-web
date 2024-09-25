import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleLogout = () => {
    // localStorage.removeItem('role');
    // localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    navigate('/'); 
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    navigate(-1); 
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {showConfirmation && (
        <div className="bg-black shadow-md rounded-lg p-6 text-center w-1/3">
          <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
          <p className="mb-6">Are you sure you want to log out?</p>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
