import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
  
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

   
    navigate("/", { replace: true });
  }, [navigate]);

  return null; 
}
