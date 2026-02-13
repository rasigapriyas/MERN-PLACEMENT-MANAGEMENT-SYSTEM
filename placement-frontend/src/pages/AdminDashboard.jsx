import { useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">

      <div className="admin-dashboard-card">

        <h1 className="admin-dashboard-title">
          Admin Dashboard
        </h1>

        <button
          onClick={() => navigate("/add-student")}
          className="dashboard-btn btn-blue"
        >
          Add Student
        </button>

        <button
          onClick={() => navigate("/add-company")}
          className="dashboard-btn btn-green"
        >
          Add Company
        </button>

        <button
          onClick={() => navigate("/view-eligibility")}
          className="dashboard-btn btn-purple"
        >
          View Eligible Students
        </button>

      </div>

    </div>
  );
}
