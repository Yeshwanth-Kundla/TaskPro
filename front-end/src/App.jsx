import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./component/Logout";

function RequireAuth({children}){
  const token=localStorage.getItem("token");
  if(!token) return <Navigate to="/" replace/>
  return children;
}

export default function App(){
  return(
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 

        <Route path="/tasks"    element={<RequireAuth> <Tasks /> </RequireAuth>} />
        <Route path="/add-task" element={<RequireAuth> <AddTask/> </RequireAuth>} />
        <Route path="/edit/:id" element={<RequireAuth> <EditTask/> </RequireAuth>} />
        <Route path="/logout"   element={<RequireAuth> <Logout />  </RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}