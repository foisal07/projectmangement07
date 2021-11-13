import React, { useState, useEffect } from "react";
import Select from "react-select";
import useCollections from "../../hooks/useCollections";

// styles
import "./CreateProject.css";

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
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const userOptions = documents.map((user) => {
        return {
          value: user,
          label: user.displayName,
        };
      });
      setUsers(userOptions);
    }
  }, [documents]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a proejct category");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assign user to the project");
      return;
    }

    console.log(
      assignedUsers,
      documents,
      name,
      details,
      dueDate,
      category.value
    );
  };

  return (
    <form className="create-project" onSubmit={handleSubmit}>
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
        <textarea
          required
          type="text"
          onChange={(e) => setDetails(e.target.value)}
          value={details}
        ></textarea>
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
      <button className="btn">Add Project</button>
      {formError && <p className="error">{formError}</p>}
    </form>
  );
}
