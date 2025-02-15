// VolunteerHistory.jsx
import React, { useState, useEffect } from "react";
import "./VolunteerHistory.css"; // Make sure this file contains the CSS below

const VolunteerHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchedHistory = [
      {
        id: 1,
        eventName: "Charity Run",
        eventDescription: "A running event for charity.",
        location: "Central Park",
        requiredSkills: ["Running", "First Aid"],
        urgency: "High",
        eventDate: "2025-03-10",
        participationStatus: "Confirmed",
      },
      {
        id: 2,
        eventName: "Food Drive",
        eventDescription: "Collecting food for the needy.",
        location: "Community Center",
        requiredSkills: ["Organization", "Cooking"],
        urgency: "Medium",
        eventDate: "2025-04-15",
        participationStatus: "Pending",
      },
    ];
    setHistory(fetchedHistory);
  }, []);

  return (
    <div className="volunteer-app-container">
      <header className="app-header">
        <h1 className="app-title">Volunteer History</h1>
      </header>
      <div className="form-section">
        {history.length > 0 ? (
          <table border="1" cellPadding="8" cellSpacing="0">
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
                <tr key={event.id}>
                  <td>{event.eventName}</td>
                  <td>{event.eventDescription}</td>
                  <td>{event.location}</td>
                  <td>{event.requiredSkills.join(", ")}</td>
                  <td>{event.urgency}</td>
                  <td>{event.eventDate}</td>
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
