// Admin.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="/admin/volunteer-history">Volunteer History</Link> |{" "}
        <Link to="/admin/event-management">Event Management</Link> |{" "}
        <Link to="/admin/volunteer-matching">Volunteer Matching</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
