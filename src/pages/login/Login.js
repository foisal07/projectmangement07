import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import "./Login.css";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login, isLoading, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <label>
          <span>Email</span>
          <input
            type="text"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <span>Password</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!isLoading && (
        <button className="btn" onClick={handleSubmit}>
          Login
        </button>
      )}

      {isLoading && (
        <button className="btn" disabled>
          Logging In...
        </button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
}
