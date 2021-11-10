import { useState } from "react";

// styles
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleFilechange = (e) => {};

  return (
    <form className="auth-form">
      <h2>Sign Up</h2>
      <label>
        <span>Name</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>Name</span>
        <input
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="text"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Upload profile photo</span>
        <input
          type="file"
        />
      </label>
      <button className="btn">Sign Up</button>
    </form>
  );
}
