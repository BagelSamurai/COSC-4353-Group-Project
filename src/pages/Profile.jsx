import React, { useState } from "react";
import Select from "react-select"; // Import react-select

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState("");
  const [availability, setAvailability] = useState("");

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
    { value: "mediation", label: "Mediation & Negotiation" }
  ];

  const handleSkillsChange = (selectedOptions) => {
    setSkills(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      fullName,
      address1,
      address2,
      city,
      state,
      zip,
      skills: skills.map(skill => skill.value), // Store values only
      preferences,
      availability,
    });
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          maxLength="50"
          required
        />
        <input
          type="text"
          placeholder="Address 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          maxLength="100"
          required
        />
        <input
          type="text"
          placeholder="Address 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          maxLength="100"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          maxLength="100"
          required
        />
        <select value={state} onChange={(e) => setState(e.target.value)} required>
          <option value="">Select State</option>
          <option value="TX">Texas</option>
          <option value="CA">California</option>
          <option value="FL">Florida</option>
          <option value="NY">New York</option>
          {/* Add all other states as needed */}
        </select>
        <input
          type="text"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          maxLength="9"
          required
        />

        {/* Multi-Select Dropdown for Skills */}
        <Select
          options={skillOptions}
          isMulti
          value={skills}
          onChange={handleSkillsChange}
          placeholder="Select Skills"
        />

        <textarea
          placeholder="Preferences"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          maxLength="500"
        />
        <input
          type="date"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          required
        />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
