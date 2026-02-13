import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white p-6">

        <h2 className="text-2xl font-bold mb-10">
          Placement Admin
        </h2>

        <div className="space-y-3">

          <button
            onClick={() => navigate("/add-student")}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add Student
          </button>

          <button
            onClick={() => navigate("/add-company")}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add Company
          </button>

          <button
            onClick={() => navigate("/view-eligibility")}
            className="w-full text-left px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            View Applications
          </button>

        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
}
