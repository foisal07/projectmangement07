import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

// styles
import "./Navbar.css";
import Temple from "../assets/temple.svg";

export default function Navbar() {
  const { logout, isLoading } = useLogout();
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>Managey</span>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          {!isLoading && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isLoading && (
            <button className="btn" disabled>
              Logging out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
