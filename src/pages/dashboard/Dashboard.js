import { useState } from "react";
import ProjectsList from "../../components/ProjectsList";
import useCollections from "../../hooks/useCollections";
import ProjectFilter from "./ProjectFilter";

export default function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const { documents, error, isLoading } = useCollections("projects");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <ProjectsList projects={documents} isLoading={isLoading} />}
    </div>
  );
}
