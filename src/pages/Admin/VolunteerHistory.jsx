// VolunteerHistory.jsx
import React, { useState, useEffect } from "react";

const VolunteerHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Simulate fetching volunteer history data from an API
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
    <div className="volunteer-history">
      <h2>Volunteer History</h2>
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
  );
};

export default VolunteerHistory;
