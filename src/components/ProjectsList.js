import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

// styles
import "./ProjectsList.css";

export default function ProjectsList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects created yet!</p>}
      {projects.map((project) => {
        return (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.projectName}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
              <p>Assigned to:</p>
              <ul>
                {project.assignedUsersList.map((user) => {
                  return (
                    <li>
                      <Avatar src={user.photoURL} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
