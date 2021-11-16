import "./Dashboard.css";
const filters = ["all", "mine", "design", "development", "sales", "aarketing"];

export default function ProjectFilter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by</p>
        {filters.map((filter) => {
          return (
            <button
              onClick={() => handleClick(filter)}
              className={currentFilter === filter ? "active" : ""}
            >
              {filter}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
