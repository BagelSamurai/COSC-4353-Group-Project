import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin/Admin";
import VolunteerHistory from "./pages/Admin/VolunteerHistory";
import Events from "./pages/Admin/Events";
import VolunteerMatching from "./pages/Admin/VolunteerMatching";
import "./App.css";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleAdminLogin = () => setUserRole("admin");
  const handleLogout = () => setUserRole(null);

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
