import React, { useState } from "react";
import "./VolunteerMatching.css";

// Validation schemas
export const validationRules = {
  eventKey: {
    required: true,
    validate: (value) => Object.keys(eventRequirements).includes(value),
    message: "Please select a valid event",
  },
};

// Mock database data
export const volunteersData = [
  {
    id: "v1",
    name: "Volunteer A",
    skills: ["Packing"],
    preferences: "Night",
    availability: ["Monday", "Wednesday"],
    experienceLevel: "Intermediate",
  },
  {
    id: "v2",
    name: "Volunteer B",
    skills: ["Cooking"],
    preferences: "Day",
    availability: ["Tuesday", "Thursday"],
    experienceLevel: "Expert",
  },
  {
    id: "v3",
    name: "Volunteer C",
    skills: ["Assisting"],
    preferences: "Night",
    availability: ["Friday", "Saturday"],
    experienceLevel: "Beginner",
  },
  {
    id: "v4",
    name: "Volunteer D",
    skills: ["Assisting"],
    preferences: "Day",
    availability: ["Monday", "Wednesday"],
    experienceLevel: "Beginner",
  },
  {
    id: "v5",
    name: "Volunteer E",
    skills: ["Assisting"],
    preferences: "Day",
    availability: ["Tuesday", "Thursday"],
    experienceLevel: "Intermediate",
  },
];

export const eventRequirements = {
  "food-drive": {
    requiredSkills: ["Packing", "Assisting", "Cooking"],
    minExperience: "Beginner",
    timeOfDay: ["Day", "Night"],
    minVolunteers: 2,
  },
  donation: {
    requiredSkills: ["Assisting"],
    minExperience: "Beginner",
    timeOfDay: ["Day"],
    minVolunteers: 1,
  },
  Fundraisers: {
    requiredSkills: ["Assisting"],
    minExperience: "Intermediate",
    timeOfDay: ["Day", "Night"],
    minVolunteers: 1,
  },
};

// Volunteer matching service
export class VolunteerMatchingService {
  static validateEvent(eventKey) {
    const rule = validationRules.eventKey;
    if (rule.required && !eventKey) {
      return { isValid: false, error: "Event selection is required" };
    }
    if (!rule.validate(eventKey)) {
      return { isValid: false, error: rule.message };
    }
    return { isValid: true };
  }

  static matchVolunteers(eventKey) {
    // Validate input
    const validation = this.validateEvent(eventKey);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const eventReqs = eventRequirements[eventKey];

    // Match volunteers based on multiple criteria
    return volunteersData.filter((volunteer) => {
      // Check if volunteer has at least one required skill
      const hasRequiredSkill = volunteer.skills.some((skill) =>
        eventReqs.requiredSkills.includes(skill)
      );

      // Check experience level requirement
      const experienceLevels = ["Beginner", "Intermediate", "Expert"];
      const meetsExperience =
        experienceLevels.indexOf(volunteer.experienceLevel) >=
        experienceLevels.indexOf(eventReqs.minExperience);

      // Check if volunteer's preference matches event time
      const matchesTimePreference = eventReqs.timeOfDay.includes(
        volunteer.preferences
      );

      return hasRequiredSkill && meetsExperience && matchesTimePreference;
    });
  }

  static getMatchQuality(volunteer, eventKey) {
    const eventReqs = eventRequirements[eventKey];
    const matchingSkills = volunteer.skills.filter((skill) =>
      eventReqs.requiredSkills.includes(skill)
    ).length;

    return {
      matchingSkills,
      experienceLevel: volunteer.experienceLevel,
      timePreference: eventReqs.timeOfDay.includes(volunteer.preferences),
    };
  }
}

const VolunteerMatching = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);
  const [error, setError] = useState("");

  const handleEventChange = (event) => {
    const eventKey = event.target.value;
    setSelectedEvent(eventKey);
    setError("");

    try {
      if (eventKey) {
        const matches = VolunteerMatchingService.matchVolunteers(eventKey);
        setMatchedVolunteers(matches);
      } else {
        setMatchedVolunteers([]);
      }
    } catch (err) {
      setError(err.message);
      setMatchedVolunteers([]);
    }
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
            <select
              id="eventChoices"
              value={selectedEvent}
              onChange={handleEventChange}
              className={error ? "error" : ""}
            >
              <option value="">Select Events</option>
              <option value="food-drive">
                Food Drive – Skills: Packing, Assisting, Cooking | Min Level:
                Beginner | Time: Day/Night
              </option>
              <option value="donation">
                Donation – Skills: Assisting | Min Level: Beginner | Time: Day
              </option>
              <option value="Fundraisers">
                Fundraisers – Skills: Assisting | Min Level: Intermediate |
                Time: Day/Night
              </option>
            </select>
            {error && <div className="error-message">{error}</div>}
          </div>

          {/* Display Matched Volunteers */}
          {matchedVolunteers.length > 0 ? (
            <div>
              <h3>Matching Volunteers ({matchedVolunteers.length}):</h3>
              {matchedVolunteers.map((volunteer) => {
                const quality = VolunteerMatchingService.getMatchQuality(
                  volunteer,
                  selectedEvent
                );
                return (
                  <div
                    key={volunteer.id}
                    className="volunteer-info"
                    data-testid="volunteer-info"
                  >
                    <h3 className="volunteer-name">{volunteer.name}</h3>
                    <p>
                      <strong>Skills:</strong> {volunteer.skills.join(", ")}
                    </p>
                    <p>
                      <strong>Experience:</strong> {volunteer.experienceLevel}
                    </p>
                    <p>
                      <strong>Preferences:</strong> {volunteer.preferences}
                    </p>
                    <p>
                      <strong>Availability:</strong>{" "}
                      {volunteer.availability.join(", ")}
                    </p>
                    <p>
                      <strong>Match Quality:</strong> {quality.matchingSkills}{" "}
                      matching skills
                    </p>
                  </div>
                );
              })}
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
