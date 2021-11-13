import React, { useState, useEffect } from "react";
import Select from "react-select";
import useCollections from "../../hooks/useCollections";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFirestore from "../../hooks/useFirestore";
import { useHistory } from "react-router";

// styles
import "./CreateProject.css";
import { firestore, timestamp } from "../../firbase/config";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function CreateProjects() {
  const { documents } = useCollections("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore("projects");
  const history = useHistory();

  // form fields
  const [projectName, setProjectName] = useState("");
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

  const handleSubmit = async (e) => {
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

    const createdBy = {
      name: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        name: user.label,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const project = {
      createdBy,
      assignedUsersList,
      projectName,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
    };

    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
    console.log(project);
  };

  return (
    <form className="create-project" onSubmit={handleSubmit}>
      <h2>Create a project</h2>
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
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
