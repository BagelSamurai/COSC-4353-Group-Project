import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Event from "./models/Events.js"; // Import the Event model

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB connection
mongoose
  .connect("mongodb+srv://zkagdi04:thunder14@cluster0.4vpnz.mongodb.net/4354websiteDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Route to create an event
app.post("/api/events", async (req, res) => {
  console.log("Received data:", req.body);

  try {
    const { eventName, description, location, skills, urgency, date } = req.body;
    console.log("Parsed Data:", { eventName, description, location, skills, urgency, date });

    const newEvent = new Event({ eventName, description, location, skills, urgency, date });
    console.log("New Event Object Before Save:", newEvent);  // <-- Add this to debug

    const savedEvent = await newEvent.save();
    console.log("Event Saved Successfully:", savedEvent);  // <-- Check if it's saving properly

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "There was an error creating the event.", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
