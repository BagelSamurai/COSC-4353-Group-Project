import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  skills: { type: [String], required: true },
  urgency: { type: String, required: true },
  date: { type: String, required: true }
}, { strict: true });  // <-- Ensure no extra fields are allowed

const Event = mongoose.model("Event", eventSchema);

export default Event;
