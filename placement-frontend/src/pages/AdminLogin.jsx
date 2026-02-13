import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminLogin.css";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      alert("Admin Login Successful ✅");
      navigate("/admin-dashboard");
    } else {
      setError("Invalid Admin Credentials ❌");
    }
  };

  return (
    <div className="admin-login-container">

      <div className="admin-login-card">

        <h2 className="admin-login-title">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="admin-login-form">

          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="login-error">{error}</p>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}
