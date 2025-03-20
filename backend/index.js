/*import express from "express";
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
});*/

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
  try {
    const { eventName, description, location, skills, urgency, date } = req.body;
    const newEvent = new Event({ eventName, description, location, skills, urgency, date });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "There was an error creating the event.", error });
  }
});

// Route to get all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events.", error });
  }
});

// Route to update an event
app.put("/api/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    console.log("Received update request for event ID:", eventId);

    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("Event updated successfully:", updatedEvent);
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event.", error });
  }
});




// Route to delete an event
app.delete("/api/events/:id", async (req, res) => {
  try {
    console.log(`Deleting event with ID: ${req.params.id}`);
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event.", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

