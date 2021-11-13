import React from "react";
import ProjectsList from "../../components/ProjectsList";
import useCollections from "../../hooks/useCollections";

export default function Dashboard() {
  const { documents, error } = useCollections("projects");

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectsList projects={documents} />}
    </div>
  );
}
