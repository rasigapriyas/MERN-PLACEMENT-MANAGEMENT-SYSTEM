import { useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import "../css/AddStudent.css";

export default function AddStudent() {

  const [student, setStudent] = useState({
    name: "",
    registerNo: "",
    email: "",
    cgpa: "",
    arrears: "",
    skills: ""
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/students/add", {
        name: student.name,
        registerNo: student.registerNo,
        email: student.email,
        cgpa: Number(student.cgpa),
        arrears: Number(student.arrears),
        skills: student.skills.split(",").map(s => s.trim())
      });

      alert("Student Added Successfully ✅");

      setStudent({
        name: "",
        registerNo: "",
        email: "",
        cgpa: "",
        arrears: "",
        skills: ""
      });

    } catch (error) {
      alert(error.response?.data?.message || "Error ❌");
    }
  };

  return (
  
      <div className="student-page">

        <h2 className="student-title">Add Student</h2>

        <form onSubmit={handleSubmit} className="student-form">

          <input
            name="name"
            placeholder="Name"
            value={student.name}
            onChange={handleChange}
            className="student-input"
            required
          />

          <input
            name="registerNo"
            placeholder="Register Number"
            value={student.registerNo}
            onChange={handleChange}
            className="student-input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            className="student-input"
            required
          />

          <input
            type="number"
            name="cgpa"
            placeholder="CGPA"
            value={student.cgpa}
            onChange={handleChange}
            className="student-input"
            required
          />

          <input
            type="number"
            name="arrears"
            placeholder="Arrears"
            value={student.arrears}
            onChange={handleChange}
            className="student-input"
            required
          />

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={student.skills}
            onChange={handleChange}
            className="student-input"
            required
          />

          <button type="submit" className="student-button">
            Add Student
          </button>

        </form>

      </div>
    
  );
}
