import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {

  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);

  // GET FULL STUDENT OBJECT
  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = student?._id;

  useEffect(() => {
    if (studentId) {
      fetchCompanies();
      fetchApplications();
    }
  }, [studentId]);

  const fetchCompanies = async () => {
    const res = await axios.get("http://localhost:5000/api/companies");
    setCompanies(res.data);
  };

  const fetchApplications = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/students/applications/${studentId}`
    );
    setApplications(res.data);
  };

  const handleApply = async (companyId) => {
    try {
      await axios.post("http://localhost:5000/api/students/apply", {
        studentId,
        companyId
      });

      alert("Applied Successfully ✅");
      fetchApplications();

    } catch (error) {
      alert(error.response?.data?.message || "Error applying");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-slate-100">

      <h1 className="text-2xl font-bold mb-6">
        Available Companies
      </h1>

      {companies.map((company) => (
        <div key={company._id} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="font-bold">{company.companyName}</h2>
          <p>Min CGPA: {company.minCGPA}</p>
          <p>Max Arrears: {company.maxArrears}</p>

          <button
            onClick={() => handleApply(company._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
          >
            Apply
          </button>
        </div>
      ))}

      <hr className="my-8" />

      <h1 className="text-2xl font-bold mb-4">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="bg-white p-4 rounded shadow mb-2">
            <p><b>Company:</b> {app.companyId?.companyName}</p>
            <p><b>Status:</b> {app.status}</p>
          </div>
        ))
      )}

    </div>
  );
}
