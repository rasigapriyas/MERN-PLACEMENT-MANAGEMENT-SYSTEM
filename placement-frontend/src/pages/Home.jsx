import { Link } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="home-container">

      <div className="home-card">

        <h1 className="home-title">
          Placement Management System
        </h1>

        <Link to="/student-login">
          <button className="home-btn btn-primary">
            Student Login
          </button>
        </Link>

        <Link to="/admin-login">
          <button className="home-btn btn-secondary">
            Admin Login
          </button>
        </Link>

      </div>

    </div>
  );
}
