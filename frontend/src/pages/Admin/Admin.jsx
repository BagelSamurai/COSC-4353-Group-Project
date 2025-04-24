// Admin.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import NotificationBell from "./NotificationSystem";

const Admin = () => {
  const downloadReport = (format) => {
    const url = `http://localhost:5000/api/reports/volunteers?format=${format}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="/admin/volunteer-history">Volunteer History</Link> |{" "}
        <Link to="/admin/event-management">Event Management</Link> |{" "}
        <Link to="/admin/volunteer-matching">Volunteer Matching</Link>
        <NotificationBell />
      </nav>

      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <button
          onClick={() => downloadReport("pdf")}
          style={{ marginRight: "10px" }}
        >
          Download PDF Report
        </button>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
