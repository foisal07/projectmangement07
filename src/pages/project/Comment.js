import { useState } from "react";
import { timestamp } from "../../firbase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Comment.css";

export default function Comment() {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      comment: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    console.log(commentToAdd);
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
