import { useState } from "react";
import { timestamp } from "../../firbase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFirestore from "../../hooks/useFirestore";

import "./Comment.css";

export default function Comment({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updatedDocument, response } = useFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      comment: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updatedDocument(
      { comments: [...project.cpmments, commentToAdd] },
      project.id
    );

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project comment</h4>
      <form className="add-comment" onSubmit={handleSubmit}>
        <span>Add comment</span>
        <label>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
}
