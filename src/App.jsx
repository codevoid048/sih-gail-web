import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className=' h-screen '>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/secured" element={<ProtectedRoute />}>
          <Route path="home" element={<Home />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App