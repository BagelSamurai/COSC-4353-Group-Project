// models/VolunteerHistory.js
const mongoose = require("mongoose");

const volunteerHistorySchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  location: { type: String, required: true },
  requiredSkills: [{ type: String }],
  urgency: { type: String, required: true },
  eventDate: { type: Date, required: true },
  participationStatus: { type: String, required: true },
});

module.exports = mongoose.model("VolunteerHistory", volunteerHistorySchema);
