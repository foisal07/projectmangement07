import React from "react";
import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router";
import ProjectSummary from "./ProjectSummary";

export default function ProjectDetail() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);

  console.log(document);

  return (
    <div className="project-details">
      {error && <p className="error">{error}</p>}
      {!document && <p className="loading">Loading...</p>}
      {document && <ProjectSummary project={document} />}
    </div>
  );
}
