import React, { useState } from "react";
import "./VolunteerMatching.css";

const VolunteerMatching = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState("");

  const handleVolunteerChange = (event) => {
    setSelectedVolunteer(event.target.value);
  };

  return (
    <div className="volunteer-app-container">
      <header className="app-header">
        <h1 className="app-title"></h1>
      </header>

      {/* main container: two panels side by side */}
      <div className="forms-container">
        {/* Right panel: Volunteer Matching Form */}
        <div className="form-section">
          <h2>Volunteer Matching Form</h2>
          <form>
            <div className="input-field">
              <label htmlFor="volunteerSelect">Select a Volunteer</label>
              <select
                id="volunteerSelect"
                value={selectedVolunteer}
                onChange={handleVolunteerChange}
              >
                <option value="">Choose one</option>
                <option value="Volunteer A">Volunteer A</option>
                <option value="Volunteer B">Volunteer B</option>
                <option value="Volunteer C">Volunteer C</option>
              </select>
            </div>

            <div className="volunteer-info">
              {/* displays the selected volunteer name, or default text if none */}
              <h3 className="volunteer-name">
                {selectedVolunteer || "Volunteer Name"}
              </h3>
              <p>
                <strong>Skills:</strong> Packing
              </p>
              <p>
                <strong>Preferences:</strong> Night
              </p>
              <p>
                <strong>Events:</strong>
              </p>
              <div className="input-field">
                <select id="eventChoices">
                  <option value="">Select Events</option>
                  <option value="blood-drive">
                    Food Drive – Skills: packing, assisting
                  </option>
                  <option value="donation">Donation – Skills: assisting</option>
                  <option value="Fundraisers">
                    Fundraisers – Skills: assisting
                  </option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-submit">
              Match
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerMatching;
