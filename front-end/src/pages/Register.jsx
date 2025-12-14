import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import "../styles/register.css";

export default function Register(){
    const navigate=useNavigate();

    async function handleRegister(e) {
         e.preventDefault();
         const username=e.target.username.value.trim();
         const password=e.target.password.value;

         try{
            await api.post("/auth/register", { username, password });
            toast.success("Registered");
            navigate("/");
         }catch(err){
            toast.error("Registration failed");
            console.log(err);
         }
    }

     return (
    <div className="card register-card">
      <div className="logo">TaskPro</div>
      <div className="subtitle">Create a new account</div>

      <form onSubmit={handleRegister}>
        <div className="form-field">
          <input name="username" placeholder="Username" required />
        </div>
        <div className="form-field">
          <input name="password" type="password" placeholder="Password" required />
        </div>
        <button className="btn" type="submit">Register</button>
      </form>

      <div className="small-link">
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
}