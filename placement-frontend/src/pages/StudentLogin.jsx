import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const navigate = useNavigate();

  const [registerNo, setRegisterNo] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();   // 🔥 prevent page refresh

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/login",
        {
          registerNo,
          email
        }
      );

      // Save full student object
      localStorage.setItem("student", JSON.stringify(res.data));

      navigate("/student-dashboard");

    } catch (error) {
      setError("Invalid Credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center">
          Student Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Register Number"
            className="w-full p-2 border rounded"
            value={registerNo}
            onChange={(e) => setRegisterNo(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-slate-700 text-white p-2 rounded hover:bg-slate-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
