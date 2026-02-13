// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="center-box">
//       <div className="card" style={{ width: "400px", textAlign: "center" }}>
//         <h1 className="title">Placement Management System</h1>

//         <button
//           className="btn btn-primary"
//           style={{ width: "100%", marginBottom: "15px" }}
//           onClick={() => navigate("/student-login")}
//         >
//           Student Login
//         </button>

//         <button
//           className="btn btn-secondary"
//           style={{ width: "100%" }}
//           onClick={() => navigate("/admin-login")}
//         >
//           Admin Login
//         </button>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-blue-300">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 text-center">

        <h1 className="text-3xl font-bold text-indigo-800 mb-8">
          Placement Management System
        </h1>

        <Link to="/student-login">
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg mb-4 hover:bg-indigo-700 transition">
            Student Login
          </button>
        </Link>

        <Link to="/admin-login">
          <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition">
            Admin Login
          </button>
        </Link>

      </div>
    </div>
  );
}
