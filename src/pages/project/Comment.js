import { useState } from "react";
import { timestamp } from "../../firbase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import useFirestore from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";

import "./Comment.css";

export default function Comment({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updatedDocument, response } = useFirestore("projects");

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
      { comments: [...project.comments, commentToAdd] },
      project.id
    );

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project comment</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>date here</p>
              </div>
              <div className="comment-content">
                <p>{comment.comment}</p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
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
