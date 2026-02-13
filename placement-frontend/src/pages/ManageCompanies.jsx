import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-2xl font-bold mb-6">
        Manage Companies
      </h1>

      {companies.length === 0 ? (
        <p>No companies found</p>
      ) : (
        <div className="bg-white p-6 rounded shadow max-w-3xl">
          {companies.map((company) => (
            <div
              key={company._id}
              className="flex justify-between items-center border p-3 mb-2 rounded"
            >
              <div>
                <p className="font-semibold">
                  {company.companyName}
                </p>
                <p className="text-sm">
                  Status: {company.status}
                </p>
              </div>

              {company.status === "Open" && (
                <button
                  onClick={() => handleCloseCompany(company._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
