import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
// import StudentDashboard from "./pages/StudentDashboard";
// import AdminDashboard from "./pages/AdminDashboard";

import AddStudent from "./pages/AddStudent";
import AddCompany from "./pages/AddCompany";
import ViewEligibility from "./pages/ViewEligibility";
import UploadResume from "./pages/UploadResume";
import ManageCompanies from "./pages/ManageCompanies";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />


      {/* IMPORTANT ROUTES */}
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/add-company" element={<AddCompany />} />
      <Route path="/view-eligibility" element={<ViewEligibility />} />
      <Route path="/upload-resume/:applicationId" element={<UploadResume />} />
      <Route path="/manage-companies" element={<ManageCompanies />} />
      


    </Routes>
  );
}

export default App;
