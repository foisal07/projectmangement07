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

  console.log(documents);

  const projects = documents.filter((project) => {
    if (currentFilter === "all") {
      return true;
    }

    if (currentFilter === "mine") {
      let assignedToMe = false;

      project.assignedUsersList.forEach((u) => {
        if (u.id === user.uid) {
          assignedToMe = true;
        }
      });

      return assignedToMe;
    }

    if (project.category === currentFilter) {
      return true;
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
