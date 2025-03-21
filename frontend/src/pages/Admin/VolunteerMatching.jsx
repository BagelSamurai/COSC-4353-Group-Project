import React, { useState, useEffect } from "react";
import "./VolunteerMatching.css";
import axios from 'axios';

const VolunteerMatching = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Fetch all events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch all events from the database
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (err) {
      setError('Error fetching events: ' + err.message);
    } finally {
      setLoadingEvents(false);
    }
  };

  // Handle event selection and fetch matching volunteers
  const handleEventChange = async (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    setError("");

    if (!eventId) {
      setMatchedVolunteers([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/volunteer-matching/events/${eventId}/matches`);
      setMatchedVolunteers(response.data.matchedVolunteers || []);
    } catch (err) {
      setError('Error finding matches: ' + err.message);
      setMatchedVolunteers([]);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="volunteer-app-container">
      <header className="app-header">
        <h1 className="app-title">Volunteer Matching Form</h1>
      </header>

      <div className="forms-container">
        <div className="form-section">
          <h2>Match Volunteers</h2>

          {/* Select Event */}
          <div className="input-field">
            <label htmlFor="eventChoices">Select an Event</label>
            {loadingEvents ? (
              <p>Loading events...</p>
            ) : (
              <select
                id="eventChoices"
                value={selectedEvent}
                onChange={handleEventChange}
                className={error ? "error" : ""}
              >
                <option value="">Select Events</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>
                    {event.eventName} - {formatDate(event.date)} - Required Skills: {event.skills.join(", ")}
                  </option>
                ))}
              </select>
            )}
            {error && <div className="error-message">{error}</div>}
          </div>

          {/* Display Matched Volunteers */}
          {loading ? (
            <div className="loading-spinner">Finding matches...</div>
          ) : matchedVolunteers.length > 0 ? (
            <div>
              <h3>Matching Volunteers ({matchedVolunteers.length}):</h3>
              {matchedVolunteers.map((match) => (
                <div
                  key={match.userId}
                  className="volunteer-info"
                  data-testid="volunteer-info"
                >
                  <h3 className="volunteer-name">{match.userProfile?.fullName || 'Unknown Volunteer'}</h3>
                  <p>
                    <strong>Match Score:</strong> {match.matchScore}%
                  </p>
                  <p>
                    <strong>Matching Skills:</strong> {match.matchingSkills.join(", ")}
                  </p>
                  <p>
                    <strong>Experience:</strong> {match.userProfile?.experienceLevel || 'Not specified'}
                  </p>
                  <p>
                    <strong>Preferences:</strong> {match.userProfile?.preferences || 'Not specified'}
                  </p>
                  <p>
                    <strong>Availability:</strong>{" "}
                    {match.userProfile?.availability?.join(", ") || 'Not specified'}
                  </p>
                  <button 
                    onClick={() => handleMatchStatusUpdate(match.userId, 'Accepted')}
                    className="match-action-button accept"
                  >
                    Accept Match
                  </button>
                  <button 
                    onClick={() => handleMatchStatusUpdate(match.userId, 'Rejected')}
                    className="match-action-button reject"
                  >
                    Reject Match
                  </button>
                </div>
              ))}
            </div>
          ) : selectedEvent ? (
            <p>No matching volunteers found for this event.</p>
          ) : (
            <p>Select an event to find matching volunteers.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerMatching;
