import { Link,useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { toast } from "react-toastify";
import "../styles/login.css";
import { useState } from "react";
import { useEffect } from "react";
export default function Login(){
    const navigate=useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

     useEffect(() => {
        setUsername("");
        setPassword("");
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
      

        try{
            const res=await api.post("/auth/login",{
                username: username.trim()
                ,password});
            const token=res.data;
            if(!token) throw new Error("No token returned");

            localStorage.setItem("token",token);
            toast.success("Login sucessful");
            setUsername("");
            setPassword("");
            navigate("/tasks");
        }catch(err){
            toast.error("Login failed: check username/password");
            console.log(err);
        }
    }

    return(
        <div className="card login-card">
            <div className="logo">TaskPro</div>
            <div className="subtitle">Log in to your account</div>

            <form onSubmit={handleLogin}>
                <div className="form-field">
                    <input name="username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} autoComplete="username" required/>
                </div>
                <div className="form-field">
                    <input name="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="password" required/>
                </div>

                <button className="btn" type="submit" >Login</button>
            </form>

            <div className="small-link">
                <Link to="/register">Create an account</Link>
            </div>
        </div>
        
    );
}