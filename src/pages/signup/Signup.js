import { useState } from "react";
import useSignup from "../../hooks/useSignup";

// styles
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailError, setThumbnailError] = useState(null);

  const { error, isLoading, signup } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password, thumbnail);
  };

  const handleFilechange = (e) => {
    setThumbnailError(null);

    let selectedFile = e.target.files[0];

    if (!selectedFile) {
      setThumbnailError("Please select a file");
    }

    if (!selectedFile.type.includes("image")) {
      setThumbnailError("Please select an image");
      return;
    }

    if (selectedFile.size > 100000) {
      setThumbnailError("File size must be less than 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selectedFile);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
        <input type="file" required onChange={handleFilechange} />
      </label>

      {thumbnailError && <div className="error">{thumbnailError}</div>}
      
      {!isLoading && <button className="btn">Sign Up</button>}
      {isLoading && (
        <button className="btn" disabled>
          Signing up...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
