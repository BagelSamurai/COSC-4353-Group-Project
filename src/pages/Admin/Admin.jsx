// Admin.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import NotificationBell from "./NotificationSystem"; // Adjust path if needed

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="/admin/volunteer-history">Volunteer History</Link> |{" "}
        <Link to="/admin/event-management">Event Management</Link> |{" "}
        <Link to="/admin/volunteer-matching">Volunteer Matching</Link>
        <NotificationBell />
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
