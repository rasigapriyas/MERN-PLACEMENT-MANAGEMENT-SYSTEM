import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/StudentLogin.css";

export default function StudentLogin() {

  const navigate = useNavigate();

  const [registerNo, setRegisterNo] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/login",
        {
          registerNo,
          email
        }
      );

      localStorage.setItem("student", JSON.stringify(res.data));
      navigate("/student-dashboard");

    } catch (error) {
      setError("Invalid Credentials ❌");
    }
  };

  return (
    <div className="student-login-container">

      <div className="student-login-card">

        <h2 className="student-login-title">
          Student Login
        </h2>

        <form onSubmit={handleLogin} className="student-login-form">

          <input
            type="text"
            placeholder="Register Number"
            className="student-login-input"
            value={registerNo}
            onChange={(e) => setRegisterNo(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="student-login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && (
            <p className="student-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="student-login-button"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}
