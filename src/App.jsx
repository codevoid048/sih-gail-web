import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import ADashboard from "./components/Manager/ADashboard";
import Ahome from "./components/Manager/Ahome";
import Attendance from "./components/Attendance";
import Worksite from "./Worksite";

function App() {
  return (
    <div className=' h-screen '>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/secured" element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="Dashboard" element={<Dashboard/>}/>
          <Route path="Attendance" element={<Attendance/>}/>
          <Route path="Worksite" element={<Worksite/>}/>


          </Route>
          <Route path="/admin" element={<ProtectedRoute/>}>
          <Route path="ADashboard" element={<ADashboard/>}/>
          <Route path="Ahome" element={<Ahome/>}/>

          </Route>
        </Routes>
    </div>
  )
}

export default App