import { useNavigate } from "react-router-dom";
import "../styles/addtask.css";
import { toast } from "react-toastify";
import api from "../api/axios.js";

export default function AddTask(){
    const navigate=useNavigate();

    async function handleSave(e) {
        e.preventDefault();
        const payload={
            title: e.target.title.value,
            description: e.target.description.value,
            deadline: e.target.deadline.value || null,
            priority: (e.target.priority.value || "LOW").toUpperCase()
        };

        try {
            await api.post("/tasks",payload);
            toast.success("Task added");
            navigate("/tasks");
        } catch (err) {
            console.error(err);
            toast.error("Could not add task");
        }
    }

    return(
        <div className="card add-card">
            <div className="logo">New Task</div>

            <form onSubmit={handleSave}>
                <div className="form-field">
                    <input name="title" placeholder="Task title" required />
                </div>
                <div className="form-field">
                     <textarea name="description" placeholder="Description" />
                </div>
                <div className="form-field">
                      <label>Deadline</label>
                      <input name="deadline" type="date" />
                </div>
                
                 <div className="form-field">
                      <label>Priority</label>
                    <div style={{ display: "flex", gap: 8 }}>
                        <label><input type="radio" name="priority" value="LOW" defaultChecked /> Low</label>
                        <label><input type="radio" name="priority" value="MEDIUM" /> Medium</label>
                        <label><input type="radio" name="priority" value="HIGH" /> High</label>
                    </div>
                </div>

                <button className="btn" type="submit">Save</button>
                <button type="button" className="btn secondary" style={{ marginTop: 8 }} onClick={() => navigate("/tasks")}>Cancel</button>
            </form>
        </div>
    );
}