// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ViewEligibility() {

//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [eligibleApplications, setEligibleApplications] = useState([]);

//   // ----------------------------
//   // Fetch companies on load
//   // ----------------------------
//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/companies");
//       setCompanies(res.data);
//     } catch (error) {
//       console.error("Error fetching companies");
//     }
//   };

//   // ----------------------------
//   // View eligible students
//   // ----------------------------
//   const handleViewEligible = async () => {
//     if (!selectedCompany) {
//       alert("Please select a company");
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/admin/eligible/${selectedCompany}`
//       );

//       // ⚠️ backend now returns full applications
//       setEligibleApplications(res.data);
//     } catch (error) {
//       alert("Error fetching eligible students ❌");
//     }
//   };

//   // ----------------------------
//   // Send interview emails
//   // ----------------------------
//   const handleSendMail = async () => {
//     if (!selectedCompany) {
//       alert("Please select a company");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/admin/send-interview/${selectedCompany}`
//       );

//       alert(res.data.message + " ✅");
//     } catch (error) {
//       alert("Error sending emails ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-10">

//       <h1 className="text-2xl font-bold mb-6">
//         View Eligibility
//       </h1>

//       {/* ---------------- Select Company ---------------- */}
//       <select
//         className="w-full max-w-md p-2 border rounded mb-3"
//         onChange={(e) => setSelectedCompany(e.target.value)}
//       >
//         <option value="">Select Company</option>
//         {companies.map((c) => (
//           <option key={c._id} value={c._id}>
//             {c.companyName}
//           </option>
//         ))}
//       </select>

//       {/* ---------------- Buttons ---------------- */}
//       <div className="flex gap-3 mb-6">
//         <button
//           onClick={handleViewEligible}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           View Eligible
//         </button>

//         <button
//           onClick={handleSendMail}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Send Interview Mail
//         </button>
//       </div>

//       {/* ---------------- Eligible List ---------------- */}
//       {eligibleApplications.length > 0 && (
//         <div className="space-y-4 max-w-md">
//           {eligibleApplications.map((app) => (
//             <div key={app._id} className="p-4 border rounded bg-white shadow">

//               <p><strong>Name:</strong> {app.studentId?.name}</p>
//               <p><strong>Register No:</strong> {app.studentId?.registerNo}</p>
//               <p><strong>Status:</strong> {app.status}</p>

//               {/* Resume Button */}
//               {app.resume && (
//                 <a
//                   href={`http://localhost:5000/uploads/${app.resume}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-block mt-2 text-blue-600 underline"
//                 >
//                   View Resume
//                 </a>
//               )}

//             </div>
//           ))}
//         </div>
//       )}

//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";

export default function ViewEligibility() {

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [applications, setApplications] = useState([]);

  // ================================
  // Fetch Companies
  // ================================
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

  // ================================
  // View Applications
  // ================================
  const handleViewEligible = async () => {
    if (!selectedCompany) {
      alert("Please select a company");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/eligible/${selectedCompany}`
      );

      // ✅ IMPORTANT FIX
      setApplications(res.data.applications || []);

    } catch (error) {
      alert("Error fetching applications ❌");
    }
  };

  // ================================
  // Send Interview Mail
  // ================================
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

      // Refresh after sending mail
      handleViewEligible();

    } catch (error) {
      alert("Error sending emails ❌");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-2xl font-bold mb-6">
        View Applications
      </h1>

      {/* Select Company */}
      <select
        className="w-full max-w-md p-2 border rounded mb-4"
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
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleViewEligible}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View Applications
        </button>

        <button
          onClick={handleSendMail}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Send Interview Mail
        </button>
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="space-y-4 max-w-lg">
          {applications.map((app) => (
            <div key={app._id} className="p-4 border rounded bg-white shadow">

              <p><strong>Name:</strong> {app.studentId?.name || "N/A"}</p>
              <p><strong>Register No:</strong> {app.studentId?.registerNo || "N/A"}</p>
              <p><strong>Status:</strong> {app.status}</p>

              {app.resume ? (
                <a
                  href={`http://localhost:5000/uploads/${app.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline block mt-2"
                >
                  View Resume
                </a>
              ) : (
                <p className="text-gray-500 mt-2">Resume not uploaded</p>
              )}

            </div>
          ))}
        </div>
      ) : (
        <p>No applications found.</p>
      )}

    </div>
  );
}

