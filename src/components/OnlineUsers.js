import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useCollections from "../hooks/useCollections";
import Avatar from "./Avatar";

import "./OnlineUsers.css";

export default function OnlineUsers() {
  const { documents, error } = useCollections("users");
  console.log(documents);
  return (
    <>
      <div className="user-list">
        <h2>All Users</h2>
        {documents &&
          documents.map((user) => (
            <div className="user-list-item" key={user.id}>
              {user.online && <span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          ))}
      </div>
      {error && <div className={error}>{error}</div>}
    </>
  );
}
