// import { useState } from "react";
// import axios from "axios";

// export default function AddCompany() {
//   const [form, setForm] = useState({
//     companyName: "",
//     minCGPA: "",
//     maxArrears: "",
//     skills: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:5000/api/companies/add", {
//         ...form,
//         skills: form.skills.split(",")
//       });

//       alert("Company Added Successfully ✅");
//     } catch (err) {
//       alert("Error adding company ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-6 text-center">
//           Add Company
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input name="companyName" placeholder="Company Name" onChange={handleChange} className="input" required />
//           <input name="minCGPA" placeholder="Minimum CGPA" onChange={handleChange} className="input" required />
//           <input name="maxArrears" placeholder="Maximum Arrears" onChange={handleChange} className="input" required />
//           <input name="skills" placeholder="Required Skills (comma separated)" onChange={handleChange} className="input" required />

//           <button className="w-full bg-slate-700 text-white p-2 rounded">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";

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
        skills: company.skills.split(",")
      });

      alert("Company Added Successfully ✅");

    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div className="min-h-screen p-10">
      <h2 className="text-2xl font-bold mb-5">Add Company</h2>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">

        <input name="companyName" placeholder="Company Name"
          onChange={handleChange}
          className="w-full p-2 border rounded" required />

        <input name="minCGPA" placeholder="Minimum CGPA"
          onChange={handleChange}
          className="w-full p-2 border rounded" required />

        <input name="maxArrears" placeholder="Maximum Arrears"
          onChange={handleChange}
          className="w-full p-2 border rounded" required />

        <input name="skills" placeholder="Required Skills"
          onChange={handleChange}
          className="w-full p-2 border rounded" required />

        <button className="bg-slate-700 text-white p-2 rounded w-full">
          Add Company
        </button>

      </form>
    </div>
  );
}

