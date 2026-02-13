// // import { useNavigate } from "react-router-dom";

// // export default function AdminDashboard() {

// //   const navigate = useNavigate();

// //   return (
// //     <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center space-y-6">

// //       <h1 className="text-3xl font-bold text-slate-700 mb-6">
// //         Admin Dashboard
// //       </h1>

// //       {/* Add Student */}
// //       <button
// //         onClick={() => navigate("/add-student")}
// //         className="w-64 bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition"
// //       >
// //         Add Student
// //       </button>

// //       {/* Add Company */}
// //       <button
// //         onClick={() => navigate("/add-company")}
// //         className="w-64 bg-green-600 text-white p-3 rounded-lg shadow hover:bg-green-700 transition"
// //       >
// //         Add Company
// //       </button>

// //       {/* View Eligibility */}
// //       <button
// //         onClick={() => navigate("/view-eligibility")}
// //         className="w-64 bg-purple-600 text-white p-3 rounded-lg shadow hover:bg-purple-700 transition"
// //       >
// //         View Eligibility
// //       </button>

// //       {/* NEW: Manage Companies */}
// //       <button
// //         onClick={() => navigate("/manage-companies")}
// //         className="w-64 bg-red-600 text-white p-3 rounded-lg shadow hover:bg-red-700 transition"
// //       >
// //         Manage Companies
// //       </button>

// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function StudentDashboard() {

//   const [companies, setCompanies] = useState([]);
//   const [applications, setApplications] = useState([]);

//   const student = JSON.parse(localStorage.getItem("student"));
//   const studentId = student?._id;

//   useEffect(() => {
//     fetchCompanies();
//     if (studentId) {
//       fetchApplications();
//     }
//   }, []);

//   const fetchCompanies = async () => {
//     const res = await axios.get("http://localhost:5000/api/companies");
//     setCompanies(res.data);
//   };

//   const fetchApplications = async () => {
//     const res = await axios.get(
//       `http://localhost:5000/api/students/applications/${studentId}`
//     );
//     setApplications(res.data);
//   };

//   const handleApply = async (companyId) => {
//     try {
//       await axios.post("http://localhost:5000/api/students/apply", {
//         studentId,
//         companyId
//       });

//       alert("Applied Successfully ✅");
//       fetchApplications();

//     } catch (error) {
//       alert(error.response?.data?.message || "Already Applied");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10">

//       <div className="max-w-6xl mx-auto">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-bold text-indigo-800">
//             Welcome, {student?.name}
//           </h1>

//           <button
//             onClick={() => {
//               localStorage.removeItem("student");
//               window.location.href = "/";
//             }}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Available Companies */}
//         <h2 className="text-2xl font-semibold mb-6 text-gray-700">
//           Available Companies
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6 mb-12">

//           {companies.map((company) => (
//             <div key={company._id}
//               className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

//               <h3 className="text-xl font-bold text-indigo-700 mb-3">
//                 {company.companyName}
//               </h3>

//               <p className="text-gray-600 mb-1">
//                 <strong>Min CGPA:</strong> {company.minCGPA}
//               </p>

//               <p className="text-gray-600 mb-4">
//                 <strong>Max Arrears:</strong> {company.maxArrears}
//               </p>

//               <button
//                 onClick={() => handleApply(company._id)}
//                 className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//               >
//                 Apply
//               </button>

//             </div>
//           ))}

//         </div>

//         {/* My Applications */}
//         <h2 className="text-2xl font-semibold mb-6 text-gray-700">
//           My Applications
//         </h2>

//         {applications.length === 0 ? (
//           <p className="text-gray-500">No applications yet.</p>
//         ) : (
//           <div className="bg-white rounded-xl shadow-lg p-6">

//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b">
//                   <th className="p-3">Company</th>
//                   <th className="p-3">Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {applications.map((app) => (
//                   <tr key={app._id} className="border-b">
//                     <td className="p-3">
//                       {app.companyId?.companyName}
//                     </td>

//                     <td className="p-3 font-semibold text-indigo-600">
//                       {app.status}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 text-center space-y-5">

        <h1 className="text-2xl font-bold text-slate-700">
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/add-student")}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Add Student
        </button>

        <button
          onClick={() => navigate("/add-company")}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Add Company
        </button>

        <button
          onClick={() => navigate("/view-eligibility")}
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
        >
          View Eligibility
        </button>

      </div>
    </div>
  );
}
