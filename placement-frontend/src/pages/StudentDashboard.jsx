import { useEffect, useState } from "react";
import axios from "axios";
import "../css/StudentDashboard.css";

export default function StudentDashboard() {

  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);

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
    <div className="student-dashboard-container">

      <h1 className="dashboard-heading">
        Available Companies
      </h1>

      <div className="company-list">
        {companies.map((company) => (
          <div key={company._id} className="company-card">

            <h2 className="company-title">
              {company.companyName}
            </h2>

            <p className="company-detail">
              Min CGPA: {company.minCGPA}
            </p>

            <p className="company-detail">
              Max Arrears: {company.maxArrears}
            </p>

            <button
              onClick={() => handleApply(company._id)}
              className="apply-btn"
            >
              Apply
            </button>

          </div>
        ))}
      </div>

      <hr className="section-divider" />

      <h1 className="dashboard-heading">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p className="no-data">No applications yet.</p>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <div key={app._id} className="application-card">

              <p>
                <strong>Company:</strong> {app.companyId?.companyName}
              </p>

              <p>
                <strong>Status:</strong> 
                <span className="status-text">
                  {app.status}
                </span>
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
