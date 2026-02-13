import { useState, useEffect } from "react";
import axios from "axios";
import "../css/ManageCompanies.css";

export default function ManageCompanies() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/companies/all"
      );
      setCompanies(res.data);
    } catch {
      alert("Error fetching companies");
    }
  };

  const handleCloseCompany = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/close-company/${id}`
      );

      alert("Company Closed Successfully");
      fetchCompanies();
    } catch {
      alert("Error closing company");
    }
  };

  return (
    <div className="manage-companies-container">

      <h1 className="manage-title">
        Manage Companies
      </h1>

      {companies.length === 0 ? (
        <p className="no-companies">No companies found</p>
      ) : (
        <div className="companies-card">

          {companies.map((company) => (
            <div
              key={company._id}
              className="company-row"
            >

              <div className="company-info">
                <p className="company-name">
                  {company.companyName}
                </p>
                <p className="company-status">
                  Status: {company.status}
                </p>
              </div>

              {company.status === "Open" && (
                <button
                  onClick={() => handleCloseCompany(company._id)}
                  className="close-btn"
                >
                  Close Drive
                </button>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
