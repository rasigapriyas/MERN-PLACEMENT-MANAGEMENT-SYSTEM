import { useState } from "react";
import axios from "axios";
import "../css/AddCompany.css";

export default function AddCompany() {

  const [company, setCompany] = useState({
    companyName: "",
    minCGPA: "",
    maxArrears: "",
    skills: ""
  });

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/companies/add", {
        ...company,
        minCGPA: Number(company.minCGPA),
        maxArrears: Number(company.maxArrears),
        skills: company.skills.split(",").map(s => s.trim())
      });

      alert("Company Added Successfully ✅");

      setCompany({
        companyName: "",
        minCGPA: "",
        maxArrears: "",
        skills: ""
      });

    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div className="add-company-container">
      <div className="add-company-card">
        <h2 className="add-company-title">Add Company</h2>

        <form onSubmit={handleSubmit} className="add-company-form">

          <input
            name="companyName"
            placeholder="Company Name"
            value={company.companyName}
            onChange={handleChange}
            className="form-input"
            required
          />

          <input
            type="number"
            name="minCGPA"
            placeholder="Minimum CGPA"
            value={company.minCGPA}
            onChange={handleChange}
            className="form-input"
            required
          />

          <input
            type="number"
            name="maxArrears"
            placeholder="Maximum Arrears"
            value={company.maxArrears}
            onChange={handleChange}
            className="form-input"
            required
          />

          <input
            name="skills"
            placeholder="Required Skills (comma separated)"
            value={company.skills}
            onChange={handleChange}
            className="form-input"
            required
          />

          <button type="submit" className="submit-button">
            Add Company
          </button>

        </form>
      </div>
    </div>
  );
}