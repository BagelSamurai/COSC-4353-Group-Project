import React, { useState } from "react";
import axios from "axios";
import "./Admin/VolunteerMatching.css"; // or create a new CSS if needed

const CompleteProfile = () => {
  const [form, setForm] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    skills: [],
    preferences: "",
    availability: [],
  });

  const [message, setMessage] = useState("");

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (e) => {
    setForm({
      ...form,
      skills: e.target.value.split(",").map((skill) => skill.trim()),
    });
  };

  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...form.availability, value]
      : form.availability.filter((day) => day !== value);
    setForm({ ...form, availability: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId"); // or grab from auth context if used
      const response = await axios.post("http://localhost:5000/api/profile", {
        userId,
        profile_data: form,
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed", error);
      setMessage("Error updating profile.");
    }
  };

  return (
    <div className="volunteer-app-container">
      <h2>Complete Your Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address1"
          placeholder="Address Line 1"
          value={form.address1}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address2"
          placeholder="Address Line 2"
          value={form.address2}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State (e.g. TX)"
          value={form.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={form.zipCode}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          onChange={handleSkillChange}
        />
        <textarea
          name="preferences"
          placeholder="Preferences"
          value={form.preferences}
          onChange={handleChange}
        ></textarea>

        <label>Availability:</label>
        <div className="availability-options">
          {weekdays.map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                value={day}
                checked={form.availability.includes(day)}
                onChange={handleAvailabilityChange}
              />
              {day}
            </label>
          ))}
        </div>

        <button type="submit" className="match-action-button accept">
          Submit Profile
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
