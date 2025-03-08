import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import VolunteerMatching from "./pages/VolunteerMatching";
import Admin from "./pages/Admin/Admin";
import VolunteerHistory from "./pages/Admin/VolunteerHistory";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1>Welcome</h1>
        <h1 style={{ color: "#8c5dbf" }}>Volunteer Management System</h1>
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
          <Link to="/profile">Profile</Link> |{" "}
          <Link to="/volunteermatching">Volunteer Matching</Link> |{" "}
          <Link to="/admin">Admin</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/volunteermatching" element={<VolunteerMatching />} />
        <Route path="/admin/*" element={<Admin />}>
          <Route path="volunteer-history" element={<VolunteerHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
