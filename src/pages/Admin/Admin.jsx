// Admin.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="volunteer-history">Volunteer History</Link> |{" "}
        <Link to="event-management">Event Management</Link> |{" "}
        <Link to="volunteer-matching">Volunteer Matching</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
