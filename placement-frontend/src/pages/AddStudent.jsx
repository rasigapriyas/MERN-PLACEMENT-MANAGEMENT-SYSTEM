
import { useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

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
    <AdminLayout>

      <h2 className="text-3xl font-semibold mb-6">
        Add Student
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md max-w-lg space-y-4"
      >

        <input
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="registerNo"
          placeholder="Register Number"
          value={student.registerNo}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="number"
          name="cgpa"
          placeholder="CGPA"
          value={student.cgpa}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          type="number"
          name="arrears"
          placeholder="Arrears"
          value={student.arrears}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={student.skills}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-slate-800 text-white p-3 rounded hover:bg-slate-900"
        >
          Add Student
        </button>

      </form>

    </AdminLayout>
  );
}
