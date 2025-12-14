import api from "../api/axios.js";
import { useEffect, useState } from "react";
import "../styles/tasks.css";
import {Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TaskCard from "../component/TaskCard.jsx";

export default function Tasks(){
    const[tasks, setTasks]=useState([]);
    const[tab,setTab]=useState("ALL");
    const navigate=useNavigate();

    useEffect(()=>{
        loadTasks();
    },[]);

    async function loadTasks() {
        try{
            const res=await api.get("/tasks");
            setTasks(res.data || []);
        }catch(err){
            console.error(err);
            toast.error("could not load tasks");
            if(err.response && err.response.status === 401){
                localStorage.removeItem("token");
                navigate("/");
            }
        }
    }

    function filteredTasks(){
        if(tab==="HIGH") return tasks.filter(t=> t.priority === "HIGH");
        return tasks;
    }

    async function handleDelete(taskId) {
        if(!confirm("Delete this task?"))return;
        try{
            await api.delete(`/tasks/${taskId}`);
            toast.success("Deleted");
            setTasks(prev=>prev.filter(t=>t.id !== taskId));
        }catch(err){
            console.log(err);
            toast.error("Delete failed");
        }
    }

    function goEdit(taskId){
        navigate(`/edit/${taskId}`);
    }

     function handleLogout() {
        navigate("/logout");
    }

    return(
        <div className="tasks-page">
            <div className="header-row">
        <h2>My Tasks</h2>
            <div className="user-bubble">
                <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700 }}><h1>Your</h1></div>
                    <div style={{ fontSize: 12, color: "#64748b" }}><h2>Tasks</h2></div>
                </div>
            </div>
            <button onClick={handleLogout}>Logout</button>          

            </div>

            <div className="tabs">
                <button className={`tab ${tab === "ALL" ? "active" : ""}`} onClick={() => setTab("ALL")}>All</button>
                <button className={`tab ${tab === "HIGH" ? "active" : ""}`} onClick={() => setTab("HIGH")}>High Priority</button>
            </div>

             <div className="task-grid">
                 {filteredTasks().map(t => (
                   <TaskCard key={t.id} task={t} onDelete={() => handleDelete(t.id)} onEdit={() => goEdit(t.id)} />
                     ))}
             </div>

             <Link to="/add-task" className="add-btn" aria-label="Add">+</Link>
        </div>
    );
}