import "./Dashboard.css";
const filters = ["all", "mine", "design", "development", "sales", "marketing"];

export default function ProjectFilter({ currentFilter, changeFilter, key }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className="project-filter" key={key}>
      <nav>
        <p>Filter by:</p>
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
