import React, { useState, useEffect } from "react";
import Select from "react-select";
import useCollections from "../../hooks/useCollections";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function CreateProjects() {
  const { documents } = useCollections("users");
  const [users, setUsers] = useState([]);

  // form fields
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  useEffect(() => {
    const userOptions = documents.map((user) => {
      return {
        value: user,
        label: user.displayName,
      };
    });

    setUsers(userOptions);
  }, [documents]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(assignedUsers, documents, name, details, dueDate, category.value);
  };

  return (
    <form>
      <h2>Create a project</h2>
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
          required
          options={categories}
          onChange={(option) => setCategory(option)}
        />
      </label>

      <label>
        <span>Assign to:</span>
        <Select
          required
          options={users}
          onChange={(option) => setAssignedUsers(option)}
          isMulti
        />
      </label>
      <button className="btn" onClick={handleSubmit}>
        Add Project
      </button>
    </form>
  );
}
