import React from "react";
import Avatar from "../../components/Avatar";
import useFirestore from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router";

import "./ProjectSummary.css";

export default function ProjectSummary({ project }) {
  const history = useHistory();
  const { user } = useAuthContext();

  const { deleteDocument } = useFirestore("projects");
  const handleComplete = () => {
    deleteDocument(project.id);
    history.push("/");
  };

  return (
    <>
      <div className="project-summary">
        <h2 className="page-title">{project.projectName}</h2>
        <p>By: {project.createdBy.name}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleComplete}>
          Mark as complete
        </button>
      )}
    </>
  );
}
