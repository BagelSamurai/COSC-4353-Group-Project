import React, { useState } from "react";
import Select from "react-select";

const Events = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [urgency, setUrgency] = useState("");
  const [date, setDate] = useState("");

  const skillOptions = [
    { value: "first-aid", label: "First Aid" },
    { value: "teaching", label: "Teaching" },
    { value: "tech-support", label: "Technical Support" },
    { value: "event-planning", label: "Event Planning" },
    { value: "mentoring", label: "Mentoring" },
    { value: "fundraising", label: "Fundraising" },
    { value: "public-speaking", label: "Public Speaking" },
    { value: "graphic-design", label: "Graphic Design" },
    { value: "web-development", label: "Web Development" },
    { value: "social-media", label: "Social Media Management" },
    { value: "content-writing", label: "Content Writing" },
    { value: "data-entry", label: "Data Entry" },
    { value: "translation", label: "Translation" },
    { value: "community-outreach", label: "Community Outreach" },
    { value: "conflict-resolution", label: "Conflict Resolution" },
    { value: "tutoring", label: "Tutoring" },
    { value: "childcare", label: "Childcare" },
    { value: "elder-care", label: "Elder Care" },
    { value: "disaster-relief", label: "Disaster Relief Assistance" },
    { value: "counseling", label: "Counseling" },
    { value: "animal-care", label: "Animal Care & Rescue" },
    { value: "environmental-cleanup", label: "Environmental Cleanup" },
    { value: "meal-prep", label: "Meal Preparation & Distribution" },
    { value: "sports-coaching", label: "Sports Coaching" },
    { value: "legal-assistance", label: "Legal Assistance" },
    { value: "crisis-hotline", label: "Crisis Hotline Support" },
    { value: "arts-crafts", label: "Arts & Crafts Instruction" },
    { value: "musical-performance", label: "Musical Performance" },
    { value: "gardening", label: "Gardening & Urban Farming" },
    { value: "recycling", label: "Recycling & Sustainability Initiatives" },
    { value: "campaigning", label: "Campaigning & Advocacy" },
    { value: "transportation", label: "Transportation Assistance" },
    { value: "health-education", label: "Health & Wellness Education" },
    { value: "library-assistance", label: "Library Assistance" },
    { value: "career-coaching", label: "Career Coaching" },
    { value: "mediation", label: "Mediation & Negotiation" },
  ];

  const urgencyLevels = ["Low", "Medium", "High"];

  const handleSkillChange = (selectedOptions) => {
    setSkills(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Event Created:", {
      eventName,
      description,
      location,
      skills: skills.map((skill) => skill.value), // Extract values
      urgency,
      date,
    });
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Event Name */}
        <label>Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          maxLength="100"
          required
        />
        <br />

        {/* Event Description */}
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />

        {/* Location */}
        <label>Location:</label>
        <textarea
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />

        {/* Required Skills (Multi-Select Dropdown) */}
        <label>Required Skills:</label>
        <Select
          options={skillOptions}
          isMulti
          value={skills}
          onChange={handleSkillChange}
          placeholder="Select required skills..."
        />
        <br />

        {/* Urgency Level */}
        <label>Urgency:</label>
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          required
        >
          <option value="">Select Urgency</option>
          {urgencyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <br />

        {/* Event Date */}
        <label>Event Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />

        {/* Submit Button */}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default Events;
