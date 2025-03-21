// VolunteerHistory.jsx
import React, { useState, useEffect } from "react";
import "./VolunteerHistory.css";

const VolunteerHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      try {
        // Update this URL or use a proxy if needed
        const response = await fetch(
          "http://localhost:5000/api/volunteer-history"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch volunteer history");
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching volunteer history:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerHistory();
  }, []);

  return (
    <div className="volunteer-app-container">
      <header className="app-header">
        <h1 className="app-title">Volunteer History</h1>
      </header>

      <div className="form-section">
        {loading ? (
          <p>Loading volunteer history...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : history.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Required Skills</th>
                <th>Urgency</th>
                <th>Event Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((event) => (
                <tr key={event._id}>
                  <td>{event.eventName}</td>
                  <td>{event.eventDescription}</td>
                  <td>{event.location}</td>
                  <td>{event.requiredSkills?.join(", ")}</td>
                  <td>{event.urgency}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>{event.participationStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No volunteer history available.</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerHistory;
