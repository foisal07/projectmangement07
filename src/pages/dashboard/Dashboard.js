import { useState } from "react";
import ProjectsList from "../../components/ProjectsList";
import useCollections from "../../hooks/useCollections";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const { documents, error, isLoading } = useCollections("projects");
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents.filter((project) => {
    if (currentFilter === "all") {
      return project;
    }

    if (project.category === currentFilter) {
      return project;
    }
  });

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}

      {documents && (
        <ProjectFilter
          key={currentFilter}
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}

      {documents && (
        <ProjectsList
          projects={projects}
          isLoading={isLoading}
          currentFilter={changeFilter}
        />
      )}
    </div>
  );
}
