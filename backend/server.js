// server.js
require("dotenv").config(); // Load environment variables at the very top
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Set up CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB using the centralized connection
connectDB();

// Import routes
const volunteerRoutes = require("./routes/volunteerRoutes"); // For volunteer management (e.g., sign-up, profile)
const notificationRoutes = require("./routes/notificationRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/authRoutes");
const volunteerMatchingRoutes = require("./routes/volunteerMatchingRoutes");
const volunteerHistoryRoutes = require("./routes/volunteerHistoryRoutes"); // For volunteer history
const reportRoutes = require("./routes/reportRoutes");
const Event = require("./models/Events");

// Set up API routes with unique base paths
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/volunteer-history", volunteerHistoryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/volunteer-matching", volunteerMatchingRoutes);
app.use("/api/reports", reportRoutes);

app.post("/api/events", async (req, res) => {
  try {
    const { eventName, description, location, skills, urgency, date } =
      req.body;
    const newEvent = new Event({
      eventName,
      description,
      location,
      skills,
      urgency,
      date,
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error creating the event.", error });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events.", error });
  }
});

app.put("/api/events/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event.", error });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event.", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
