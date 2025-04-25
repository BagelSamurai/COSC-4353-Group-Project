import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin/Admin";
import VolunteerHistory from "./pages/Admin/VolunteerHistory";
import Events from "./pages/Admin/Events";
import VolunteerMatching from "./pages/Admin/VolunteerMatching";
import CompleteProfile from "./pages/CompleteProfile";
import "./App.css";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Optionally restore role from localStorage or session if needed
    const savedRole = localStorage.getItem("role");
    if (savedRole) setUserRole(savedRole);
  }, []);

  const handleAdminLogin = () => {
    setUserRole("admin");
    localStorage.setItem("role", "admin");
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  return (
    <Router>
      <div>
        <h1>Volunteer Management System</h1>
        <nav>
          {userRole === "admin" ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link> |{" "}
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>

      <Routes>
        <Route
          path="/login"
          element={<Login onAdminLogin={handleAdminLogin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />

        <Route
          path="/admin/*"
          element={userRole === "admin" ? <Admin /> : <div />}
        >
          <Route index />
          <Route path="volunteer-history" element={<VolunteerHistory />} />
          <Route path="event-management" element={<Events />} />
          <Route path="volunteer-matching" element={<VolunteerMatching />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
