import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios.js";
import { toast } from "react-toastify";
import "../styles/edittask.css";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/tasks");
        const t = (res.data || []).find(x => String(x.id) === String(id));
        if (!t) { toast.error("Task not found"); navigate("/tasks"); return; }
        setTask(t);
      } catch (err) {
        console.error(err); toast.error("Load failed"); navigate("/tasks");
      }
    }
    load();
  }, [id, navigate]);

  async function handleSave(e) {
    e.preventDefault();
    const payload = {
      title: e.target.title.value,
      description: e.target.description.value,
      deadline: e.target.deadline.value || null,
      priority: (e.target.priority.value || "LOW").toUpperCase()
    };
    try {
      await api.put(`/tasks/${id}`, payload);
      toast.success("Saved");
      navigate("/tasks");
    } catch (err) {
      console.error(err); toast.error("Save failed");
    }
  }

  if (!task) return <div className="card">Loading...</div>;

  return (
    <div className="card edit-card">
      <div className="logo">Edit Task</div>
      <form onSubmit={handleSave}>
        <div className="form-field">
          <input name="title" defaultValue={task.title} required />
        </div>
        <div className="form-field">
          <textarea name="description" defaultValue={task.description} />
        </div>
        <div className="form-field">
          <label>Deadline</label>
          <input name="deadline" type="date" defaultValue={task.deadline || ""} />
        </div>
        <div className="form-field">
          <label>Priority</label>
          <div style={{ display: "flex", gap: 8 }}>
            <label><input type="radio" name="priority" value="LOW" defaultChecked={task.priority === "LOW"} /> Low</label>
            <label><input type="radio" name="priority" value="MEDIUM" defaultChecked={task.priority === "MEDIUM"} /> Medium</label>
            <label><input type="radio" name="priority" value="HIGH" defaultChecked={task.priority === "HIGH"} /> High</label>
          </div>
        </div>

        <button className="btn" type="submit">Save</button>
        <button type="button" className="btn secondary" onClick={() => navigate("/tasks")}>Cancel</button>
      </form>
    </div>
  );
}
