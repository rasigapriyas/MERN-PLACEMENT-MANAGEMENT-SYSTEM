import { useState, useEffect } from "react";
import axios from "axios";
import "../css/ViewEligibility.css";

export default function ViewEligibility() {

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies");
      setCompanies(res.data);
    } catch (error) {
      console.error("Error fetching companies");
    }
  };

  const handleViewEligible = async () => {
    if (!selectedCompany) {
      alert("Please select a company");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/eligible/${selectedCompany}`
      );

      setApplications(res.data.applications || []);

    } catch (error) {
      alert("Error fetching applications ❌");
    }
  };

  const handleSendMail = async () => {
    if (!selectedCompany) {
      alert("Please select a company");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/admin/send-interview/${selectedCompany}`
      );

      alert(res.data.message + " ✅");
      handleViewEligible();

    } catch (error) {
      alert("Error sending emails ❌");
    }
  };

  return (
    <div className="eligibility-container">

      <h1 className="eligibility-title">
        View Applications
      </h1>

      {/* Company Select */}
      <select
        className="eligibility-select"
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="">Select Company</option>
        {companies.map((c) => (
          <option key={c._id} value={c._id}>
            {c.companyName}
          </option>
        ))}
      </select>

      {/* Buttons */}
      <div className="eligibility-buttons">

        <button
          onClick={handleViewEligible}
          className="btn-primary"
        >
          View Applications
        </button>

        <button
          onClick={handleSendMail}
          className="btn-success"
        >
          Send Interview Mail
        </button>

      </div>

      {/* Applications */}
      {applications.length > 0 ? (
        <div className="application-list">

          {applications.map((app) => (
            <div key={app._id} className="application-card">

              <p><strong>Name:</strong> {app.studentId?.name || "N/A"}</p>
              <p><strong>Register No:</strong> {app.studentId?.registerNo || "N/A"}</p>
              <p><strong>Status:</strong> {app.status}</p>

              {app.resume ? (
                <a
                  href={`http://localhost:5000/uploads/${app.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-link"
                >
                  View Resume
                </a>
              ) : (
                <p className="no-resume">Resume not uploaded</p>
              )}

            </div>
          ))}

        </div>
      ) : (
        <p className="no-data">No applications found.</p>
      )}

    </div>
  );
}
