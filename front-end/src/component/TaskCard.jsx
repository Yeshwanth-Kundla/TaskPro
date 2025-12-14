import React from "react";
import "../styles/card.css";

export default function TaskCard({task, onEdit, onDelete}){
    const{title, description, deadline, priority}=task;

    const cls=`task-cark priority-${priority}`;

    return(
        <div className={cls}>
            <div>
                <h3>{title}</h3>
                <p style={{opacity: 0.95,marginTop: 6}}>{description}</p>
            </div>
            <div className="task-meta">
                <div>
                    <small>Deadline: {deadline}</small>
                </div>
                <div style={{display: "flex",gap: 8}}>
                    <button className="btn secondary" onClick={onEdit}>Edit</button>
                    <button className="btn secondary" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}