// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db"); // Centralized connection
const VolunteerHistory = require("../models/VolunteerHistory"); // Use the new model

async function seedData() {
  try {
    // Connect using centralized DB connection
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing volunteer history data if needed
    await VolunteerHistory.deleteMany({});

    const volunteerHistoryData = [
      {
        eventName: "Charity Run",
        eventDescription: "A running event for charity.",
        location: "Central Park",
        requiredSkills: ["Running", "First Aid"],
        urgency: "High",
        eventDate: new Date("2025-03-10"),
        participationStatus: "Confirmed",
      },
      {
        eventName: "Food Drive",
        eventDescription: "Collecting food for the needy.",
        location: "Community Center",
        requiredSkills: ["Organization", "Cooking"],
        urgency: "Medium",
        eventDate: new Date("2025-04-15"),
        participationStatus: "Pending",
      },
    ];

    await VolunteerHistory.insertMany(volunteerHistoryData);
    console.log("Data seeded successfully");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedData();
