import React, { useState } from "react";
import Select from "react-select";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function CreateProjects() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, details, dueDate, category.value);
  };

  return (
    <form>
      <h2>Add project</h2>
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>

      <label>
        <span>Details:</span>
        <input
          required
          type="text"
          onChange={(e) => setDetails(e.target.value)}
          value={details}
        />
      </label>

      <label>
        <span>Due date:</span>
        <input
          required
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
      </label>

      <label>
        <span>Pick category:</span>
        <Select
          onChange={(option) => setCategory(option)}
          options={categories}
        />
      </label>

      {/* <label>
        <span>Assign to:</span>
        <input
          required
          type="text"
          onChange={(e) => setAssignedUsers(e.target.value)}
          value={assignedUsers}
        />
      </label> */}
      <button className="btn" onClick={handleSubmit}>Add Project</button>
    </form>
  );
}
